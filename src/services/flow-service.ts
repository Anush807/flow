import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

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

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------

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
// Recursive step + condition creation (supports branches)
// ----------------------------------------------------------------

async function createStepsRecursive(
  tx: Prisma.TransactionClient,
  flwId: string,
  steps: FlowStepInput[],
  parentStepId: string | null,
  branchIndex: number,
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

  // 2. Fetch created steps to get IDs
  const createdSteps = await tx.flwSteps.findMany({
    where: { flwId, parentStepId, branchIndex },
    select: { id: true, position: true, parentStepId: true, branchIndex: true },
    orderBy: { position: "asc" },
  });

  const allCreated = [...createdSteps];

  // 3. Create conditions for each step + recurse into branches
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const created = createdSteps[i];
    if (!step || !created) continue;

    // Create step-level conditions
    if (step.conditions && step.conditions.length > 0) {
      const conditionRows = step.conditions.map((condition, ci) => ({
        flwId,
        flwStepId: created.id,
        sourceType: condition.sourceType,
        sourceStepId: null as string | null,
        fieldPath: condition.fieldPath,
        operator: condition.operator,
        comparisonValue: toJsonValue(condition.comparisonValue),
        logicGate: (condition.logicGate ?? "And") as "And" | "Or",
        position: ci + 1,
      }));

      await tx.flwConditions.createMany({ data: conditionRows });
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

function flowStepsInclude(): Prisma.FlwStepsInclude {
  return {
    FlwConditions: {
      orderBy: { position: "asc" },
    },
    childSteps: {
      orderBy: [{ branchIndex: "asc" }, { position: "asc" }],
      include: {
        FlwConditions: {
          orderBy: { position: "asc" },
        },
        childSteps: {
          orderBy: [{ branchIndex: "asc" }, { position: "asc" }],
          include: {
            FlwConditions: {
              orderBy: { position: "asc" },
            },
            // 3 levels of nesting should be sufficient
            childSteps: {
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

// ----------------------------------------------------------------
// CRUD
// ----------------------------------------------------------------

export async function createFlowDefinition(input: {
  name: string;
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

  const flw = await prisma.flw.create({
    data: {
      name: input.name,
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.eventKey !== undefined ? { eventKey: input.eventKey } : {}),
      ...(input.webhookKey !== undefined ? { webhookKey: input.webhookKey } : {}),
    },
  });

  await createStepsRecursive(prisma, flw.id, normalizedSteps, null, 0);

  if (input.conditions && input.conditions.length > 0) {
    const flowConditionRows = input.conditions.map((condition, index) => ({
      flwId: flw.id,
      flwStepId: null as string | null,
      sourceType: condition.sourceType,
      sourceStepId: null as string | null,
      fieldPath: condition.fieldPath,
      operator: condition.operator,
      comparisonValue: toJsonValue(condition.comparisonValue),
      logicGate: (condition.logicGate ?? "And") as "And" | "Or",
      position: index + 1,
    }));
    await prisma.flwConditions.createMany({ data: flowConditionRows });
  }

  return prisma.flw.findUniqueOrThrow({
    where: { id: flw.id },
    include: {
      FlwSteps: {
        where: { parentStepId: null },
        orderBy: { position: "asc" },
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
        where: { parentStepId: null },
        orderBy: { position: "asc" },
        include: flowStepsInclude(),
      },
      FlwExecutions: {
        orderBy: { triggeredAt: "desc" },
        take: 10,
      },
    },
  });
}

export async function listFlowDefinitions() {
  return prisma.flw.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      FlwConditions: {
        where: { flwStepId: null },
        orderBy: { position: "asc" },
      },
      FlwSteps: {
        where: { parentStepId: null },
        orderBy: { position: "asc" },
        include: flowStepsInclude(),
      },
      _count: {
        select: { FlwExecutions: true },
      },
    },
  });
}

export async function updateFlowDefinition(
  flwId: string,
  input: {
    name?: string | undefined;
    status?: "Draft" | "Active" | "Paused" | "Archived" | undefined;
    eventKey?: string | null | undefined;
    webhookKey?: string | null | undefined;
    conditions?: FlowConditionInput[] | undefined;
    steps?: FlowStepInput[] | undefined;
  },
) {
  const flowData: Prisma.FlwUpdateInput = {};
  if (input.name !== undefined) flowData.name = input.name;
  if (input.status !== undefined) flowData.status = input.status;
  if (input.eventKey !== undefined) flowData.eventKey = input.eventKey;
  if (input.webhookKey !== undefined) flowData.webhookKey = input.webhookKey;

  await prisma.flw.update({ where: { id: flwId }, data: flowData });

  if (input.steps) {
  await prisma.flwExecutionSteps.deleteMany({
    where: { FlwSteps: { flwId } },
  });
  await prisma.processedEvents.deleteMany({ where: { flwId } });
  await prisma.flwExecutions.deleteMany({ where: { flwId } });
  await prisma.flwConditions.deleteMany({ where: { flwId } });
  await prisma.flwSteps.deleteMany({ where: { flwId, parentStepId: { not: null } } });
  await prisma.flwSteps.deleteMany({ where: { flwId } });

    const normalizedSteps = normalizeSteps(input.steps);
    await createStepsRecursive(prisma, flwId, normalizedSteps, null, 0);

    if (input.conditions && input.conditions.length > 0) {
      const flowConditionRows = input.conditions.map((condition, index) => ({
        flwId,
        flwStepId: null as string | null,
        sourceType: condition.sourceType,
        sourceStepId: null as string | null,
        fieldPath: condition.fieldPath,
        operator: condition.operator,
        comparisonValue: toJsonValue(condition.comparisonValue),
        logicGate: (condition.logicGate ?? "And") as "And" | "Or",
        position: index + 1,
      }));
      await prisma.flwConditions.createMany({ data: flowConditionRows });
    }
  } else if (input.conditions !== undefined) {
    await prisma.flwConditions.deleteMany({ where: { flwId, flwStepId: null } });
    if (input.conditions.length > 0) {
      const flowConditionRows = input.conditions.map((condition, index) => ({
        flwId,
        flwStepId: null as string | null,
        sourceType: condition.sourceType,
        sourceStepId: null as string | null,
        fieldPath: condition.fieldPath,
        operator: condition.operator,
        comparisonValue: toJsonValue(condition.comparisonValue),
        logicGate: (condition.logicGate ?? "And") as "And" | "Or",
        position: index + 1,
      }));
      await prisma.flwConditions.createMany({ data: flowConditionRows });
    }
  }

  return prisma.flw.findUniqueOrThrow({
    where: { id: flwId },
    include: {
      FlwConditions: {
        where: { flwStepId: null },
        orderBy: { position: "asc" },
      },
      FlwSteps: {
        where: { parentStepId: null },
        orderBy: { position: "asc" },
        include: flowStepsInclude(),
      },
    },
  });
}
