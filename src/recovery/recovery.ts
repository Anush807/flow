import { prisma } from "../../lib/prisma.js";
import { eventTriggerQueue, stepQueue } from "../async/redis-queue.js";
import { config } from "../config.js";
import { createLogger } from "../utils/logger.js";

const log = createLogger("recovery");

const recoveryIntervalMs = config.RECOVERY_INTERVAL_MS;
const recoveryBatchSize = config.RECOVERY_BATCH_SIZE;

async function requeuePendingSteps() {
  const pendingSteps = await prisma.flwExecutionSteps.findMany({
    where: {
      status: "Pending",
      nextRetryAt: {
        lte: new Date(),
      },
      // A step whose execution already reached a terminal state must not be
      // resurrected – re-running it would revive a finished execution.
      FlwExecutions: {
        status: { in: ["Pending", "Running"] },
      },
    },
    take: recoveryBatchSize,
    orderBy: {
      nextRetryAt: "asc",
    },
  });

  if (pendingSteps.length === 0) {
    log.debug("No pending steps ready for requeue");
    return;
  }

  for (const step of pendingSteps) {
    try {
      await stepQueue.add("execute-step", {
        stepExecutionId: step.id,
      });

      log.info("Requeued pending step", { stepExecutionId: step.id, executionId: step.flwExecutionId });
    } catch (error) {
      log.error("Failed to requeue pending step", error, { stepExecutionId: step.id });
    }
  }
}

async function recoverStuckExecutions() {
  const staleRunningExecutions = await prisma.flwExecutions.findMany({
    where: {
      status: "Running",
      startedAt: {
        lte: new Date(Date.now() - 5 * 60 * 1000),
      },
      FlwExecutionSteps: {
        none: {
          status: "Running",
        },
      },
    },
    include: {
      FlwExecutionSteps: {
        where: {
          status: "Pending",
          nextRetryAt: {
            lte: new Date(),
          },
        },
        orderBy: {
          nextRetryAt: "asc",
        },
        take: 1,
      },
    },
    take: recoveryBatchSize,
  });

  for (const execution of staleRunningExecutions) {
    const [nextPendingStep] = execution.FlwExecutionSteps;

    if (!nextPendingStep) {
      continue;
    }

    try {
      await stepQueue.add("execute-step", {
        stepExecutionId: nextPendingStep.id,
      });

      log.info("Requeued stale execution", {
        executionId: execution.id,
        stepExecutionId: nextPendingStep.id,
      });
    } catch (error) {
      log.error("Failed to requeue stale execution", error, {
        executionId: execution.id,
        stepExecutionId: nextPendingStep.id,
      });
    }
  }
}

async function recoveryLoop() {
  await Promise.all([requeuePendingSteps(), recoverStuckExecutions()]);
}

let intervalHandle: NodeJS.Timeout | undefined;

async function startRecovery() {
  log.info("Recovery service started", { intervalMs: recoveryIntervalMs, batchSize: recoveryBatchSize });

  await recoveryLoop();

  intervalHandle = setInterval(() => {
    void recoveryLoop().catch((error) => {
      log.error("Recovery loop failed", error);
    });
  }, recoveryIntervalMs);
}

async function shutdown(signal: string) {
  log.info("Shutting down recovery service", { signal });

  if (intervalHandle) {
    clearInterval(intervalHandle);
  }

  try {
    await eventTriggerQueue.close();
    await stepQueue.close();
    await prisma.$disconnect();
    log.info("Recovery service shut down cleanly");
    process.exit(0);
  } catch (error) {
    log.error("Recovery service shutdown failed", error);
    process.exit(1);
  }
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

void startRecovery();
