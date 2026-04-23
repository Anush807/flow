import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

function toJsonValue(value: unknown) {
  if (value === undefined) {
    return Prisma.JsonNull;
  }

  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

async function getDuplicateExecution(
  tx: Prisma.TransactionClient,
  processedEventKey: string,
) {
  const existingProcessedEvent = await tx.processedEvents.findUnique({
    where: {
      eventKey: processedEventKey,
    },
    include: {
      FlwExecutions: true,
    },
  });

  if (!existingProcessedEvent?.FlwExecutions) {
    throw new Error(`Duplicate event key ${processedEventKey} exists without an execution`);
  }

  const existingFirstStep = await tx.flwExecutionSteps.findFirst({
    where: {
      flwExecutionId: existingProcessedEvent.FlwExecutions.id,
    },
    orderBy: {
      startedAt: "asc",
    },
  });

  return {
    execution: existingProcessedEvent.FlwExecutions,
    executionStep: existingFirstStep,
    isDuplicate: true,
  };
}

export async function createExecutionForFlow(input: {
  flwId: string;
  triggerPayload?: unknown;
  idempotencyKey?: string;
  sourceEventKey?: string;
}) {
  const processedEventKey =
    input.sourceEventKey !== undefined
      ? `${input.flwId}:${input.sourceEventKey}`
      : input.idempotencyKey !== undefined
        ? `${input.flwId}:manual:${input.idempotencyKey}`
        : null;

  try {
    return await prisma.$transaction(async (tx) => {
      const flow = await tx.flw.findUnique({
        where: { id: input.flwId },
      });

      if (!flow || flow.status !== "Active") {
        throw new Error("Flow not active");
      }

      const firstStep = await tx.flwSteps.findFirst({
        where: {
          flwId: input.flwId,
          parentStepId: null,
        },
        orderBy: {
          position: "asc",
        },
      });

      if (!firstStep) {
        throw new Error("Flow has no steps");
      }

      if (processedEventKey) {
        const existingExecution = await getDuplicateExecution(tx, processedEventKey).catch(
          () => null,
        );

        if (existingExecution) {
          return existingExecution;
        }
      }

      const execution = await tx.flwExecutions.create({
        data: {
          flwId: input.flwId,
          status: "Pending",
          triggerPayload: toJsonValue(input.triggerPayload),
          ...(input.idempotencyKey !== undefined
            ? { idempotencyKey: input.idempotencyKey }
            : {}),
        },
      });

      const executionStep = await tx.flwExecutionSteps.create({
        data: {
          flwExecutionId: execution.id,
          status: "Pending",
          retryCount: 0,
          flwStepId: firstStep.id,
          idempotencyKey: randomUUID(),
          nextRetryAt: new Date(),
        },
      });

      if (processedEventKey) {
        await tx.processedEvents.create({
          data: {
            eventKey: processedEventKey,
            flwId: input.flwId,
            flwExecutionId: execution.id,
          },
        });
      }

      return { execution, executionStep, isDuplicate: false };
    });
  } catch (error) {
    if (
      processedEventKey &&
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      (error.meta?.target as string[] | undefined)?.includes("eventKey")
    ) {
      return prisma.$transaction(async (tx) => getDuplicateExecution(tx, processedEventKey));
    }

    throw error;
  }
}

export async function getExecutionHistoryForFlow(flwId: string) {
  return prisma.flwExecutions.findMany({
    where: {
      flwId,
    },
    orderBy: {
      triggeredAt: "desc",
    },
    include: {
      FlwExecutionSteps: {
        orderBy: {
          startedAt: "asc",
        },
      },
    },
  });
}

export async function getExecutionById(executionId: string) {
  return prisma.flwExecutions.findUnique({
    where: {
      id: executionId,
    },
    include: {
      FlwExecutionSteps: {
        orderBy: {
          startedAt: "asc",
        },
      },
      Flw: true,
    },
  });
}

export async function getExecutionSummary() {
  const [totalExecutions, runningExecutions, failedExecutions, successfulExecutions] =
    await Promise.all([
      prisma.flwExecutions.count(),
      prisma.flwExecutions.count({ where: { status: "Running" } }),
      prisma.flwExecutions.count({ where: { status: "Failed" } }),
      prisma.flwExecutions.count({ where: { status: "Success" } }),
    ]);

  return {
    totalExecutions,
    runningExecutions,
    failedExecutions,
    successfulExecutions,
  };
}
