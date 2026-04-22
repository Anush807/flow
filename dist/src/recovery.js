import { Queue } from "bullmq";
import { prisma } from "../lib/prisma.js";
import { eventTriggerQueue, redisConnection, stepQueue } from "./redis-queue.js";
const recoveryQueue = new Queue("recovery-observer", {
    connection: redisConnection,
});
const recoveryIntervalMs = parseInt(process.env["RECOVERY_INTERVAL_MS"] ?? "15000", 10);
const recoveryBatchSize = parseInt(process.env["RECOVERY_BATCH_SIZE"] ?? "50", 10);
async function requeuePendingSteps() {
    const pendingSteps = await prisma.flwExecutionSteps.findMany({
        where: {
            status: "Pending",
            nextRetryAt: {
                lte: new Date(),
            },
        },
        take: recoveryBatchSize,
        orderBy: {
            nextRetryAt: "asc",
        },
    });
    if (pendingSteps.length === 0) {
        console.log("Recovery: no pending steps ready for requeue");
        return;
    }
    for (const step of pendingSteps) {
        try {
            await stepQueue.add("execute-step", {
                stepExecutionId: step.id,
            });
            console.log(`Recovery: requeued step ${step.id}`);
        }
        catch (error) {
            console.error(`Recovery: failed to requeue step ${step.id}`, error);
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
            console.log(`Recovery: requeued stale execution ${execution.id} via step ${nextPendingStep.id}`);
        }
        catch (error) {
            console.error(`Recovery: failed to requeue stale execution ${execution.id} via step ${nextPendingStep.id}`, error);
        }
    }
}
async function recoveryLoop() {
    await Promise.all([requeuePendingSteps(), recoverStuckExecutions()]);
}
let intervalHandle;
async function startRecovery() {
    console.log(`Recovery service started (interval ${recoveryIntervalMs}ms)`);
    await recoveryLoop();
    intervalHandle = setInterval(() => {
        void recoveryLoop().catch((error) => {
            console.error("Recovery loop failed:", error);
        });
    }, recoveryIntervalMs);
}
async function shutdown(signal) {
    console.log(`Received ${signal} - shutting down recovery service gracefully`);
    if (intervalHandle) {
        clearInterval(intervalHandle);
    }
    try {
        await recoveryQueue.close();
        await eventTriggerQueue.close();
        await stepQueue.close();
        await prisma.$disconnect();
        console.log("Recovery service shut down cleanly");
        process.exit(0);
    }
    catch (error) {
        console.error("Recovery service shutdown failed:", error);
        process.exit(1);
    }
}
process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
void startRecovery();
//# sourceMappingURL=recovery.js.map