import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

function toJsonValue(value: unknown) {
  if (value === undefined) {
    return Prisma.JsonNull;
  }

  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

/**
 * Prisma's default interactive-transaction timeout is 5s, which is generous on
 * a co-located database and tight on a remote one. These writes are few but
 * latency-bound, so the budget is set explicitly rather than inherited.
 */
const EXECUTION_WRITE_TRANSACTION_OPTIONS = { maxWait: 10_000, timeout: 20_000 };

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

  // Reads happen outside the transaction. They are definition lookups, not
  // part of the invariant being protected, and holding a transaction open
  // across six sequential round trips blew past Prisma's 5s default on a
  // latent database – turning every trigger into a 500.
  const flow = await prisma.flw.findUnique({
    where: { id: input.flwId },
  });

  if (!flow || flow.status !== "Active") {
    throw new Error("Flow not active");
  }

  const firstStep = await prisma.flwSteps.findFirst({
    where: {
      flwId: input.flwId,
      parentStepId: null,
      deletedAt: null,
    },
    orderBy: {
      position: "asc",
    },
  });

  if (!firstStep) {
    throw new Error("Flow has no steps");
  }

  if (processedEventKey) {
    const existingExecution = await getDuplicateExecution(prisma, processedEventKey).catch(
      () => null,
    );

    if (existingExecution) {
      return existingExecution;
    }
  }

  try {
    // What actually needs to be atomic: an execution is never created without
    // its first step, and never without its dedupe record.
    return await prisma.$transaction(async (tx) => {
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
    }, EXECUTION_WRITE_TRANSACTION_OPTIONS);
  } catch (error) {
    if (
      processedEventKey &&
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      (error.meta?.target as string[] | undefined)?.includes("eventKey")
    ) {
      // Lost the race to a concurrent delivery of the same event – the winner
      // has committed, so its execution is readable.
      return getDuplicateExecution(prisma, processedEventKey);
    }

    throw error;
  }
}

export async function getExecutionHistoryForFlow(
  flwId: string,
  pagination: { limit: number; offset: number },
) {
  // Executions grow without bound, so the caller always gets a page plus the
  // total needed to drive a pager.
  const [total, executions] = await Promise.all([
    prisma.flwExecutions.count({ where: { flwId } }),
    prisma.flwExecutions.findMany({
      where: {
        flwId,
      },
      orderBy: {
        triggeredAt: "desc",
      },
      skip: pagination.offset,
      take: pagination.limit,
      include: {
        FlwExecutionSteps: {
          orderBy: {
            startedAt: "asc",
          },
        },
      },
    }),
  ]);

  return { executions, total, ...pagination };
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
