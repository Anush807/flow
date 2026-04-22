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
function buildConditionCreateData(input) {
    const stepIdByPosition = new Map(input.stepRecords.map((step) => [step.position, step.id]));
    const conditionRows = [];
    const pushConditions = (conditions, flwStepId) => {
        if (!conditions || conditions.length === 0) {
            return;
        }
        conditions.forEach((condition, index) => {
            const sourceStepId = condition.sourceStepPosition !== undefined
                ? stepIdByPosition.get(condition.sourceStepPosition) ?? null
                : null;
            if (condition.sourceType === "StepOutput" && !sourceStepId) {
                throw new Error(`Condition references missing sourceStepPosition ${condition.sourceStepPosition ?? "unknown"}`);
            }
            conditionRows.push({
                flwId: input.flwId,
                flwStepId,
                sourceType: condition.sourceType,
                sourceStepId,
                fieldPath: condition.sourceType === "Trigger" ? condition.fieldPath : condition.fieldPath,
                operator: condition.operator,
                comparisonValue: toJsonValue(condition.comparisonValue),
                logicGate: condition.logicGate ?? "And",
                position: index + 1,
            });
        });
    };
    pushConditions(input.flowConditions, null);
    input.steps.forEach((step, index) => {
        pushConditions(step.conditions, stepIdByPosition.get(index + 1) ?? null);
    });
    return conditionRows;
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
                ...(input.status !== undefined ? { status: input.status } : {}),
                ...(input.eventKey !== undefined ? { eventKey: input.eventKey } : {}),
                ...(input.webhookKey !== undefined ? { webhookKey: input.webhookKey } : {}),
            },
        });
        await tx.flwSteps.createMany({
            data: buildCreateStepData(flw.id, normalizedSteps),
        });
        const createdSteps = await tx.flwSteps.findMany({
            where: { flwId: flw.id },
            select: { id: true, position: true },
            orderBy: { position: "asc" },
        });
        const conditionRows = buildConditionCreateData({
            flwId: flw.id,
            steps: normalizedSteps,
            flowConditions: input.conditions,
            stepRecords: createdSteps,
        });
        if (conditionRows.length > 0) {
            await tx.flwConditions.createMany({
                data: conditionRows,
            });
        }
        return tx.flw.findUniqueOrThrow({
            where: { id: flw.id },
            include: {
                FlwSteps: {
                    orderBy: {
                        position: "asc",
                    },
                    include: {
                        FlwConditions: {
                            orderBy: {
                                position: "asc",
                            },
                        },
                    },
                },
                FlwConditions: {
                    where: {
                        flwStepId: null,
                    },
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
            FlwConditions: {
                where: {
                    flwStepId: null,
                },
                orderBy: {
                    position: "asc",
                },
            },
            FlwSteps: {
                orderBy: {
                    position: "asc",
                },
                include: {
                    FlwConditions: {
                        orderBy: {
                            position: "asc",
                        },
                    },
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
            FlwConditions: {
                where: {
                    flwStepId: null,
                },
                orderBy: {
                    position: "asc",
                },
            },
            FlwSteps: {
                orderBy: {
                    position: "asc",
                },
                include: {
                    FlwConditions: {
                        orderBy: {
                            position: "asc",
                        },
                    },
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
export async function updateFlowDefinition(flwId, input) {
    return prisma.$transaction(async (tx) => {
        const flowData = {};
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
            await tx.flwConditions.deleteMany({
                where: { flwId },
            });
            const normalizedSteps = normalizeSteps(input.steps);
            await tx.flwSteps.createMany({
                data: buildCreateStepData(flwId, normalizedSteps),
            });
            const currentSteps = await tx.flwSteps.findMany({
                where: { flwId },
                select: { id: true, position: true },
                orderBy: { position: "asc" },
            });
            const conditionRows = buildConditionCreateData({
                flwId,
                steps: normalizedSteps,
                flowConditions: input.conditions,
                stepRecords: currentSteps,
            });
            if (conditionRows.length > 0) {
                await tx.flwConditions.createMany({
                    data: conditionRows,
                });
            }
        }
        else if (input.conditions !== undefined) {
            await tx.flwConditions.deleteMany({
                where: {
                    flwId,
                    flwStepId: null,
                },
            });
            const currentSteps = await tx.flwSteps.findMany({
                where: { flwId },
                select: { id: true, position: true },
                orderBy: { position: "asc" },
            });
            const conditionRows = buildConditionCreateData({
                flwId,
                steps: [],
                flowConditions: input.conditions,
                stepRecords: currentSteps,
            });
            if (conditionRows.length > 0) {
                await tx.flwConditions.createMany({
                    data: conditionRows,
                });
            }
        }
        return tx.flw.findUniqueOrThrow({
            where: { id: flwId },
            include: {
                FlwConditions: {
                    where: {
                        flwStepId: null,
                    },
                    orderBy: {
                        position: "asc",
                    },
                },
                FlwSteps: {
                    orderBy: {
                        position: "asc",
                    },
                    include: {
                        FlwConditions: {
                            orderBy: {
                                position: "asc",
                            },
                        },
                    },
                },
            },
        });
    });
}
//# sourceMappingURL=flow-service.js.map