import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
function toJsonValue(value) {
    if (value === undefined) {
        return Prisma.JsonNull;
    }
    return JSON.parse(JSON.stringify(value));
}
function normalizeSteps(steps, fallback) {
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
function buildCreateStepData(flwId, steps) {
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
export async function createFlowDefinition(input) {
    const normalizedSteps = normalizeSteps(input.steps, input.nodeType
        ? {
            type: input.nodeType,
            configPayload: input.configPayload,
        }
        : undefined);
    return prisma.$transaction(async (tx) => {
        const flw = await tx.flw.create({
            data: {
                name: input.name,
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
export async function getFlowDefinition(flwId) {
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
export async function updateFlowDefinition(flwId, input) {
    return prisma.$transaction(async (tx) => {
        const flowData = {};
        if (input.name !== undefined) {
            flowData.name = input.name;
        }
        if (input.isActive !== undefined) {
            flowData.isActive = input.isActive;
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
//# sourceMappingURL=flow-service.js.map