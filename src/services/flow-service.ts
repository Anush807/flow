import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

type BranchInput = {
  conditions?: FlowConditionInput[] | undefined;
  steps: FlowStepInput[];
};

type FlowStepInput = {
  name?: string | undefined;
  type: "Trigger" | "Action";
  integrationKey: string;
  operationKey?: string | undefined;
  configPayload?: unknown;
  inputMapping?: unknown;
  conditions?: FlowConditionInput[] | undefined;
  branches?: BranchInput[] | undefined;
};

type FlowConditionInput = {
  sourceType: "Trigger" | "StepOutput";
  sourceStepPosition?: number | undefined;
  fieldPath: string;
  operator:
    | "Equals"
    | "NotEquals"
    | "Contains"
    | "NotContains"
    | "GreaterThan"
    | "LessThan"
    | "Exists"
    | "NotExists";
  comparisonValue?: unknown;
  logicGate?: "And" | "Or" | undefined;
};

function toJsonValue(value: unknown) {
  if (value === undefined) {
    return Prisma.JsonNull;
  }

  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function normalizeSteps(
  steps?: FlowStepInput[],
  fallback?: { type: "Trigger" | "Action"; configPayload?: unknown },
): FlowStepInput[] {
  if (steps && steps.length > 0) {
    return steps.map((step) => ({ ...step }));
  }

  if (!fallback) {
    throw new Error("Flow must contain at least one step");
  }

  return [
    {
      type: fallback.type,
      integrationKey: "custom",
      operationKey: "default",
      configPayload: fallback.configPayload,
    },
  ];
}

// ----------------------------------------------------------------
// Condition source resolution
// ----------------------------------------------------------------

type StepIdsByPosition = Map<number, string>;

/**
 * Turns the caller-facing `sourceStepPosition` into the `sourceStepId` the
 * worker actually reads. Without this every StepOutput-sourced condition was
 * persisted with a null sourceStepId and silently evaluated against undefined.
 *
 * A position is resolved against the step's own level first (siblings sharing a
 * parentStepId + branchIndex), then against the root level – which is how a
 * branch condition refers back to the main-line step it hangs off.
 */
function resolveConditionSourceStepId(
  condition: FlowConditionInput,
  siblings: StepIdsByPosition,
  rootSteps: StepIdsByPosition,
): string | null {
  if (condition.sourceType !== "StepOutput") {
    return null;
  }

  const position = condition.sourceStepPosition;
  if (position === undefined) {
    throw new Error(
      `Condition on field "${condition.fieldPath}" uses sourceType "StepOutput" but has no sourceStepPosition`,
    );
  }

  const sourceStepId = siblings.get(position) ?? rootSteps.get(position);
  if (!sourceStepId) {
    throw new Error(
      `Condition on field "${condition.fieldPath}" references sourceStepPosition ${position}, which matches no step in this flow`,
    );
  }

  return sourceStepId;
}

function buildConditionRows(
  flwId: string,
  flwStepId: string | null,
  conditions: FlowConditionInput[],
  siblings: StepIdsByPosition,
  rootSteps: StepIdsByPosition,
) {
  return conditions.map((condition, index) => ({
    flwId,
    flwStepId,
    sourceType: condition.sourceType,
    sourceStepId: resolveConditionSourceStepId(condition, siblings, rootSteps),
    fieldPath: condition.fieldPath,
    operator: condition.operator,
    comparisonValue: toJsonValue(condition.comparisonValue),
    logicGate: (condition.logicGate ?? "And") as "And" | "Or",
    position: index + 1,
  }));
}

function rootStepIdsByPosition(
  createdSteps: Array<{ id: string; position: number; parentStepId: string | null }>,
): StepIdsByPosition {
  return new Map(
    createdSteps
      .filter((step) => step.parentStepId === null)
      .map((step) => [step.position, step.id]),
  );
}

// Step/condition writes fan out into many statements; the 5s Prisma default is
// not enough headroom for a flow with a deep branch tree.
const FLOW_WRITE_TRANSACTION_OPTIONS = { maxWait: 10_000, timeout: 30_000 };

// ----------------------------------------------------------------
// Recursive step + condition creation (supports branches)
// ----------------------------------------------------------------

async function createStepsRecursive(
  tx: Prisma.TransactionClient,
  flwId: string,
  steps: FlowStepInput[],
  parentStepId: string | null,
  branchIndex: number,
  rootStepIdsByPosition?: StepIdsByPosition,
): Promise<Array<{ id: string; position: number; parentStepId: string | null; branchIndex: number }>> {
  // 1. Create step records at this level
  const stepData = steps.map((step, index) => ({
    flwId,
    name: step.name ?? null,
    type: step.type,
    position: index + 1,
    integrationKey: step.integrationKey,
    operationKey: step.operationKey ?? null,
    configPayload: toJsonValue(step.configPayload),
    inputMapping: toJsonValue(step.inputMapping),
    parentStepId,
    branchIndex,
  }));

  await tx.flwSteps.createMany({ data: stepData });

  // 2. Fetch created steps to get IDs.
  // `deletedAt: null` is load-bearing: superseded generations share the same
  // (flwId, parentStepId, branchIndex) and would otherwise come back here and
  // misalign this level against `steps`.
  const createdSteps = await tx.flwSteps.findMany({
    where: { flwId, parentStepId, branchIndex, deletedAt: null },
    select: { id: true, position: true, parentStepId: true, branchIndex: true },
    orderBy: { position: "asc" },
  });

  const allCreated = [...createdSteps];

  // Positions are only unique within a level, so conditions resolve against
  // this level's siblings and fall back to the root level.
  const siblingIdsByPosition: StepIdsByPosition = new Map(
    createdSteps.map((created) => [created.position, created.id]),
  );
  const rootSteps = rootStepIdsByPosition ?? siblingIdsByPosition;

  // 3. Create conditions for each step + recurse into branches
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const created = createdSteps[i];
    if (!step || !created) continue;

    // Create step-level conditions
    if (step.conditions && step.conditions.length > 0) {
      await tx.flwConditions.createMany({
        data: buildConditionRows(
          flwId,
          created.id,
          step.conditions,
          siblingIdsByPosition,
          rootSteps,
        ),
      });
    }

    // Recurse into branches
    if (step.branches && step.branches.length > 0) {
      for (let bi = 0; bi < step.branches.length; bi++) {
        const branch = step.branches[bi];
        if (!branch?.steps || branch.steps.length === 0) continue;

        // Merge branch-level conditions into the first step of the branch
        const branchSteps = [...branch.steps];
        if (branch.conditions && branch.conditions.length > 0) {
          const firstStep = branchSteps[0]!;
          branchSteps[0] = {
            ...firstStep,
            conditions: [
              ...branch.conditions,
              ...(firstStep.conditions ?? []),
            ],
          };
        }

        const branchCreated = await createStepsRecursive(
          tx,
          flwId,
          branchSteps,
          created.id,
          bi,
          rootSteps,
        );
        allCreated.push(...branchCreated);
      }
    }
  }

  return allCreated;
}

// ----------------------------------------------------------------
// Include pattern for full flow queries (with branch nesting)
// ----------------------------------------------------------------

// Only the flow's current definition is rendered; superseded generations stay
// in the table for historical executions but are not part of the flow's shape.
function flowStepsInclude(): Prisma.FlwStepsInclude {
  return {
    FlwConditions: {
      orderBy: { position: "asc" },
    },
    childSteps: {
      where: { deletedAt: null },
      orderBy: [{ branchIndex: "asc" }, { position: "asc" }],
      include: {
        FlwConditions: {
          orderBy: { position: "asc" },
        },
        childSteps: {
          where: { deletedAt: null },
          orderBy: [{ branchIndex: "asc" }, { position: "asc" }],
          include: {
            FlwConditions: {
              orderBy: { position: "asc" },
            },
            // 3 levels of nesting should be sufficient
            childSteps: {
              where: { deletedAt: null },
              orderBy: [{ branchIndex: "asc" }, { position: "asc" }],
              include: {
                FlwConditions: {
                  orderBy: { position: "asc" },
                },
              },
            },
          },
        },
      },
    },
  };
}

/** Root steps of the flow's current (non-superseded) definition. */
const LIVE_ROOT_STEPS = {
  where: { parentStepId: null, deletedAt: null },
  orderBy: { position: "asc" },
} as const;

// ----------------------------------------------------------------
// CRUD
// ----------------------------------------------------------------

export async function createFlowDefinition(input: {
  name: string;
  description?: string | null | undefined;
  steps?: FlowStepInput[] | undefined;
  nodeType?: "Trigger" | "Action" | undefined;
  status?: "Draft" | "Active" | "Paused" | "Archived" | undefined;
  eventKey?: string | undefined;
  webhookKey?: string | undefined;
  conditions?: FlowConditionInput[] | undefined;
  configPayload?: unknown;
}) {
  const normalizedSteps = normalizeSteps(
    input.steps,
    input.nodeType ? { type: input.nodeType, configPayload: input.configPayload } : undefined,
  );

  // One transaction: a failure part-way through used to leave behind a flow
  // with half its steps and no conditions.
  const flw = await prisma.$transaction(
    async (tx) => {
      const created = await tx.flw.create({
        data: {
          name: input.name,
          ...(input.description !== undefined ? { description: input.description } : {}),
          ...(input.status !== undefined ? { status: input.status } : {}),
          ...(input.eventKey !== undefined ? { eventKey: input.eventKey } : {}),
          ...(input.webhookKey !== undefined ? { webhookKey: input.webhookKey } : {}),
        },
      });

      const createdSteps = await createStepsRecursive(tx, created.id, normalizedSteps, null, 0);

      if (input.conditions && input.conditions.length > 0) {
        await tx.flwConditions.createMany({
          data: buildConditionRows(
            created.id,
            null,
            input.conditions,
            rootStepIdsByPosition(createdSteps),
            rootStepIdsByPosition(createdSteps),
          ),
        });
      }

      return created;
    },
    FLOW_WRITE_TRANSACTION_OPTIONS,
  );

  return prisma.flw.findUniqueOrThrow({
    where: { id: flw.id },
    include: {
      FlwSteps: {
        ...LIVE_ROOT_STEPS,
        include: flowStepsInclude(),
      },
      FlwConditions: {
        where: { flwStepId: null },
        orderBy: { position: "asc" },
      },
    },
  });
}

export async function getFlowDefinition(flwId: string) {
  return prisma.flw.findUnique({
    where: { id: flwId },
    include: {
      FlwConditions: {
        where: { flwStepId: null },
        orderBy: { position: "asc" },
      },
      FlwSteps: {
        ...LIVE_ROOT_STEPS,
        include: flowStepsInclude(),
      },
      FlwExecutions: {
        orderBy: { triggeredAt: "desc" },
        take: 10,
      },
    },
  });
}

export async function listFlowDefinitions(pagination?: { limit: number; offset: number }) {
  return prisma.flw.findMany({
    orderBy: { createdAt: "desc" },
    ...(pagination ? { skip: pagination.offset, take: pagination.limit } : {}),
    include: {
      FlwConditions: {
        where: { flwStepId: null },
        orderBy: { position: "asc" },
      },
      FlwSteps: {
        ...LIVE_ROOT_STEPS,
        include: flowStepsInclude(),
      },
      _count: {
        select: { FlwExecutions: true },
      },
    },
  });
}

export async function countFlowDefinitions() {
  return prisma.flw.count();
}

/**
 * Hard-deletes a flow and everything that hangs off it.
 *
 * Every other write in this file is non-destructive on purpose, so this one is
 * deliberately narrow: a flow with an execution still Pending or Running is
 * refused, because the step worker holds job references to rows that would
 * vanish underneath it. Finished history is removed with the flow – it is
 * meaningless once the definition it describes is gone, and `Flw` is the parent
 * of every FK involved.
 *
 * Archiving (`PATCH { status: "Archived" }`) is the non-destructive option and
 * is what the console offers alongside this.
 */
export async function deleteFlowDefinition(flwId: string) {
  const flow = await prisma.flw.findUnique({ where: { id: flwId }, select: { id: true, name: true } });

  if (!flow) {
    throw new Error(`Flow not found: ${flwId}`);
  }

  const inFlight = await prisma.flwExecutions.count({
    where: { flwId, status: { in: ["Pending", "Running"] } },
  });

  if (inFlight > 0) {
    throw new Error(
      `Flow has ${inFlight} execution(s) still in flight – wait for them to settle before deleting`,
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.processedEvents.deleteMany({ where: { flwId } });
    await tx.flwExecutionSteps.deleteMany({ where: { FlwExecutions: { flwId } } });
    await tx.flwExecutions.deleteMany({ where: { flwId } });
    await tx.flwConditions.deleteMany({ where: { flwId } });

    // Steps are a self-relation: children reference their parent, so the FK has
    // to be broken before the rows can go in one statement.
    await tx.flwSteps.updateMany({ where: { flwId }, data: { parentStepId: null } });
    await tx.flwSteps.deleteMany({ where: { flwId } });

    await tx.flw.delete({ where: { id: flwId } });
  }, FLOW_WRITE_TRANSACTION_OPTIONS);

  return flow;
}

export async function updateFlowDefinition(
  flwId: string,
  input: {
    name?: string | undefined;
    description?: string | null | undefined;
    status?: "Draft" | "Active" | "Paused" | "Archived" | undefined;
    eventKey?: string | null | undefined;
    webhookKey?: string | null | undefined;
    conditions?: FlowConditionInput[] | undefined;
    steps?: FlowStepInput[] | undefined;
  },
) {
  const flowData: Prisma.FlwUpdateInput = {};
  if (input.name !== undefined) flowData.name = input.name;
  if (input.description !== undefined) flowData.description = input.description;
  if (input.status !== undefined) flowData.status = input.status;
  if (input.eventKey !== undefined) flowData.eventKey = input.eventKey;
  if (input.webhookKey !== undefined) flowData.webhookKey = input.webhookKey;

  // One transaction, and step replacement is non-destructive: the previous
  // definition is superseded (soft-deleted) rather than deleted, so every past
  // execution still resolves the steps it actually ran. All steps retired by
  // one call share a single `deletedAt`, and that timestamp is what identifies
  // the generation an in-flight execution keeps traversing.
  await prisma.$transaction(
    async (tx) => {
      await tx.flw.update({ where: { id: flwId }, data: flowData });

      if (input.steps) {
        await tx.flwSteps.updateMany({
          where: { flwId, deletedAt: null },
          data: { deletedAt: new Date() },
        });

        // Flow-level conditions belong to the flow, not to a step generation,
        // so they are replaced. Step-level conditions stay attached to the
        // superseded steps so historical runs remain explicable.
        await tx.flwConditions.deleteMany({ where: { flwId, flwStepId: null } });

        const normalizedSteps = normalizeSteps(input.steps);
        const createdSteps = await createStepsRecursive(tx, flwId, normalizedSteps, null, 0);

        if (input.conditions && input.conditions.length > 0) {
          const rootSteps = rootStepIdsByPosition(createdSteps);
          await tx.flwConditions.createMany({
            data: buildConditionRows(flwId, null, input.conditions, rootSteps, rootSteps),
          });
        }

        return;
      }

      if (input.conditions !== undefined) {
        await tx.flwConditions.deleteMany({ where: { flwId, flwStepId: null } });

        if (input.conditions.length > 0) {
          // Steps are untouched here, so positions resolve against the steps
          // already on record.
          const existingRootSteps = await tx.flwSteps.findMany({
            where: { flwId, parentStepId: null, deletedAt: null },
            select: { id: true, position: true, parentStepId: true },
          });
          const rootSteps = rootStepIdsByPosition(existingRootSteps);

          await tx.flwConditions.createMany({
            data: buildConditionRows(flwId, null, input.conditions, rootSteps, rootSteps),
          });
        }
      }
    },
    FLOW_WRITE_TRANSACTION_OPTIONS,
  );

  return prisma.flw.findUniqueOrThrow({
    where: { id: flwId },
    include: {
      FlwConditions: {
        where: { flwStepId: null },
        orderBy: { position: "asc" },
      },
      FlwSteps: {
        ...LIVE_ROOT_STEPS,
        include: flowStepsInclude(),
      },
    },
  });
}
