import { randomUUID } from "node:crypto";
import { Worker } from "bullmq";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { stepQueue } from "./redis-queue.js";
function toJsonValue(value) {
    if (value === undefined) {
        return Prisma.JsonNull;
    }
    return JSON.parse(JSON.stringify(value));
}
console.log("Worker process started");
const worker = new Worker("step-execution-worker", async (job) => {
    console.log("worker is running");
    const { stepExecutionId } = job.data;
    if (!stepExecutionId)
        return;
    await processStep(stepExecutionId);
}, {
    connection: {
        host: "127.0.0.1",
        port: 6379,
    },
});
async function processStep(stepExecutionId) {
    const step = await claimStep(stepExecutionId);
    if (!step) {
        return;
    }
    let outputPayload;
    try {
        const result = await integrationFunction(step);
        outputPayload = result.outputPayload;
    }
    catch (err) {
        await failureHandler(step, err);
        return;
    }
    await onSuccessFunction(step, outputPayload);
}
async function claimStep(stepExecutionId) {
    const now = new Date();
    const claimed = await prisma.flwExecutionSteps.updateMany({
        where: {
            id: stepExecutionId,
            status: "Pending",
        },
        data: {
            status: "Running",
            startedAt: now,
            nextRetryAt: null,
        },
    });
    if (claimed.count === 0) {
        return null;
    }
    const step = await prisma.flwExecutionSteps.findUnique({
        where: {
            id: stepExecutionId,
        },
    });
    if (!step) {
        return null;
    }
    await prisma.flwExecutions.updateMany({
        where: {
            id: step.flwExecutionId,
            status: "Pending",
        },
        data: {
            status: "Running",
            startedAt: now,
        },
    });
    return step;
}
async function buildStepContext(step) {
    const execution = await prisma.flwExecutions.findUnique({
        where: {
            id: step.flwExecutionId,
        },
        select: {
            triggerPayload: true,
        },
    });
    const previousSteps = await prisma.flwExecutionSteps.findMany({
        where: {
            flwExecutionId: step.flwExecutionId,
            id: {
                not: step.id,
            },
            status: "Success",
        },
        orderBy: {
            startedAt: "asc",
        },
        select: {
            flwStepId: true,
            outputPayload: true,
        },
    });
    return {
        triggerPayload: execution?.triggerPayload ?? null,
        previousSteps: previousSteps.map((entry) => ({
            stepId: entry.flwStepId,
            outputPayload: entry.outputPayload,
        })),
    };
}
function resolvePath(source, path) {
    let current = source;
    for (const segment of path) {
        if (current === null || current === undefined || typeof current !== "object") {
            return undefined;
        }
        current = current[segment];
    }
    return current;
}
function resolveTemplate(template, context) {
    return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, rawToken) => {
        const token = rawToken.trim();
        if (token === "trigger") {
            return JSON.stringify(context.triggerPayload ?? null);
        }
        if (token.startsWith("trigger.")) {
            const value = resolvePath(context.triggerPayload, token.slice("trigger.".length).split("."));
            return value === undefined ? "" : String(value);
        }
        if (token.startsWith("steps.")) {
            const [, stepId, ...path] = token.split(".");
            const matched = context.previousSteps.find((entry) => entry.stepId === stepId);
            const value = resolvePath(matched?.outputPayload, path);
            return value === undefined ? "" : String(value);
        }
        return "";
    });
}
function resolveInputMapping(value, context) {
    if (typeof value === "string") {
        return resolveTemplate(value, context);
    }
    if (Array.isArray(value)) {
        return value.map((item) => resolveInputMapping(item, context));
    }
    if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([key, nestedValue]) => [
            key,
            resolveInputMapping(nestedValue, context),
        ]));
    }
    return value;
}
async function integrationFunction(step) {
    const definition = await prisma.flwSteps.findUnique({
        where: {
            id: step.flwStepId,
        },
    });
    if (!definition) {
        throw new Error("Definition step not found");
    }
    const context = await buildStepContext(step);
    const resolvedInput = resolveInputMapping(definition.inputMapping, context);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        outputPayload: {
            integrationKey: definition.integrationKey,
            operationKey: definition.operationKey,
            configPayload: definition.configPayload,
            input: resolvedInput,
            triggerPayload: context.triggerPayload,
            processedAt: new Date().toISOString(),
        },
    };
}
async function onSuccessFunction(step, outputPayload) {
    const result = await prisma.$transaction(async (tx) => {
        const current = await tx.flwSteps.findUnique({
            where: { id: step.flwStepId },
        });
        if (!current) {
            throw new Error("Definition step not found");
        }
        const nextDefinition = await tx.flwSteps.findUnique({
            where: {
                flwId_position: {
                    flwId: current.flwId,
                    position: current.position + 1,
                },
            },
        });
        await tx.flwExecutionSteps.update({
            where: { id: step.id },
            data: {
                status: "Success",
                outputPayload: toJsonValue(outputPayload),
                error: null,
                errorPayload: Prisma.JsonNull,
                finishedAt: new Date(),
            },
        });
        if (nextDefinition) {
            const nextStepExecution = await tx.flwExecutionSteps.create({
                data: {
                    flwExecutionId: step.flwExecutionId,
                    flwStepId: nextDefinition.id,
                    status: "Pending",
                    retryCount: 0,
                    idempotencyKey: randomUUID(),
                    nextRetryAt: new Date(),
                },
            });
            return {
                nextStepExecutionId: nextStepExecution.id,
            };
        }
        await tx.flwExecutions.update({
            where: { id: step.flwExecutionId },
            data: {
                status: "Success",
                finishedAt: new Date(),
            },
        });
        return {
            nextStepExecutionId: null,
        };
    });
    if (result.nextStepExecutionId) {
        await stepQueue.add("execute-step", {
            stepExecutionId: result.nextStepExecutionId,
        });
        console.log(`Next job added to queue - StepExecutionId: ${result.nextStepExecutionId}`);
        return;
    }
    console.log(`FlwExecution ${step.flwExecutionId} marked as Success`);
}
async function failureHandler(step, err) {
    const maxRetries = 5;
    const baseDelay = 5000;
    const retryCount = step.retryCount + 1;
    const errorMessage = err instanceof Error ? err.message : String(err);
    if (retryCount > maxRetries) {
        await prisma.flwExecutionSteps.update({
            where: { id: step.id },
            data: {
                status: "Failed",
                error: errorMessage,
                errorPayload: {
                    message: errorMessage,
                },
                finishedAt: new Date(),
            },
        });
        await prisma.flwExecutions.update({
            where: { id: step.flwExecutionId },
            data: {
                status: "Failed",
                finishedAt: new Date(),
            },
        });
        return;
    }
    const delay = baseDelay * Math.pow(2, step.retryCount);
    const nextRetryAt = new Date(Date.now() + delay);
    await prisma.flwExecutionSteps.update({
        where: { id: step.id },
        data: {
            status: "Pending",
            retryCount,
            nextRetryAt,
            error: errorMessage,
            errorPayload: {
                message: errorMessage,
                retryCount,
                nextRetryAt: nextRetryAt.toISOString(),
            },
        },
    });
    console.log(`Retry scheduled in ${delay / 1000}s`);
}
void worker;
//# sourceMappingURL=worker.js.map