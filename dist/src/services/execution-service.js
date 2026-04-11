import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
function toJsonValue(value) {
    if (value === undefined) {
        return Prisma.JsonNull;
    }
    return JSON.parse(JSON.stringify(value));
}
export async function createExecutionForFlow(input) {
    return prisma.$transaction(async (tx) => {
        const flow = await tx.flw.findUnique({
            where: { id: input.flwId },
        });
        if (!flow || !flow.isActive) {
            throw new Error("Flow not active");
        }
        const firstStep = await tx.flwSteps.findFirst({
            where: {
                flwId: input.flwId,
            },
            orderBy: {
                position: "asc",
            },
        });
        if (!firstStep) {
            throw new Error("Flow has no steps");
        }
        const execution = await tx.flwExecutions.create({
            data: {
                flwId: input.flwId,
                status: "Pending",
                triggerPayload: toJsonValue(input.triggerPayload),
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
        return { execution, executionStep };
    });
}
export async function getExecutionHistoryForFlow(flwId) {
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
export async function getExecutionById(executionId) {
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
//# sourceMappingURL=execution-service.js.map