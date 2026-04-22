import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

type FlowStepInput = {
  name?: string | undefined;
  type: "Trigger" | "Action";
  integrationKey: string;
  operationKey?: string | undefined;
  configPayload?: unknown;
  inputMapping?: unknown;
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

function buildCreateStepData(flwId: string, steps: FlowStepInput[]) {
  return steps.map((step, index) => ({
    flwId,
    name: step.name ?? null,
    type: step.type,
    position: index + 1,
    integrationKey: step.integrationKey,
    operationKey: step.operationKey ?? null,
    configPayload: toJsonValue(step.configPayload),
    inputMapping: toJsonValue(step.inputMapping),
  }));
}

export async function createFlowDefinition(input: {
  name: string;
  steps?: FlowStepInput[] | undefined;
  nodeType?: "Trigger" | "Action" | undefined;
  status?: "Draft" | "Active" | "Paused" | "Archived" | undefined;
  eventKey?: string | undefined;
  webhookKey?: string | undefined;
  configPayload?: unknown;
}) {
  const normalizedSteps = normalizeSteps(
    input.steps,
    input.nodeType
      ? {
          type: input.nodeType,
          configPayload: input.configPayload,
        }
      : undefined,
  );

  return prisma.$transaction(async (tx) => {
    const flw = await tx.flw.create({
      data: {
        name: input.name,
        ...(input.status !== undefined ? { status: input.status } : {}),
        ...(input.eventKey !== undefined ? { eventKey: input.eventKey } : {}),
        ...(input.webhookKey !== undefined ? { webhookKey: input.webhookKey } : {}),
      },
    });

    await tx.flwSteps.createMany({
      data: buildCreateStepData(flw.id, normalizedSteps),
    });

    return tx.flw.findUniqueOrThrow({
      where: { id: flw.id },
      include: {
        FlwSteps: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
  });
}

export async function getFlowDefinition(flwId: string) {
  return prisma.flw.findUnique({
    where: { id: flwId },
    include: {
      FlwSteps: {
        orderBy: {
          position: "asc",
        },
      },
      FlwExecutions: {
        orderBy: {
          triggeredAt: "desc",
        },
        take: 10,
      },
    },
  });
}

export async function listFlowDefinitions() {
  return prisma.flw.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      FlwSteps: {
        orderBy: {
          position: "asc",
        },
      },
      _count: {
        select: {
          FlwExecutions: true,
        },
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
    steps?: FlowStepInput[] | undefined;
  },
) {
  return prisma.$transaction(async (tx) => {
    const flowData: Prisma.FlwUpdateInput = {};

    if (input.name !== undefined) {
      flowData.name = input.name;
    }

    if (input.status !== undefined) {
      flowData.status = input.status;
    }

    if (input.eventKey !== undefined) {
      flowData.eventKey = input.eventKey;
    }

    if (input.webhookKey !== undefined) {
      flowData.webhookKey = input.webhookKey;
    }

    await tx.flw.update({
      where: { id: flwId },
      data: flowData,
    });

    if (input.steps) {
      await tx.flwSteps.deleteMany({
        where: { flwId },
      });

      await tx.flwSteps.createMany({
        data: buildCreateStepData(flwId, normalizeSteps(input.steps)),
      });
    }

    return tx.flw.findUniqueOrThrow({
      where: { id: flwId },
      include: {
        FlwSteps: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
  });
}
