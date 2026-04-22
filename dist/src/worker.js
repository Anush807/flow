import { randomUUID } from "node:crypto";
import { Worker } from "bullmq";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { stepQueue, redisConnection } from "./redis-queue.js";
import { executeIntegration } from "./integrations/registy.js";
// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
function toJsonValue(value) {
    if (value === undefined) {
        return Prisma.JsonNull;
    }
    return JSON.parse(JSON.stringify(value));
}
// ----------------------------------------------------------------
// Worker
// ----------------------------------------------------------------
console.log("Step execution worker starting…");
const worker = new Worker("step-execution-worker", async (job) => {
    const { stepExecutionId } = job.data;
    if (!stepExecutionId) {
        console.warn(`Job ${job.id} is missing stepExecutionId – skipping`);
        return;
    }
    await processStep(stepExecutionId);
}, {
    connection: redisConnection,
    concurrency: parseInt(process.env["WORKER_CONCURRENCY"] ?? "10", 10),
});
worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed – stepExecutionId: ${job.data.stepExecutionId}`);
});
worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed – stepExecutionId: ${job?.data?.stepExecutionId}`, err);
});
worker.on("error", (err) => {
    console.error("Worker error:", err);
});
// ----------------------------------------------------------------
// Graceful shutdown
// ----------------------------------------------------------------
async function shutdown(signal) {
    console.log(`Received ${signal} – shutting down worker gracefully…`);
    try {
        await worker.close();
        await prisma.$disconnect();
        console.log("Worker shut down cleanly");
        process.exit(0);
    }
    catch (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
    }
}
process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
// ----------------------------------------------------------------
// Core step processor
// ----------------------------------------------------------------
async function processStep(stepExecutionId) {
    const step = await claimStep(stepExecutionId);
    if (!step) {
        // Already claimed by another worker instance or not in Pending state.
        console.log(`Step ${stepExecutionId} already claimed or not found – skipping`);
        return;
    }
    const definition = await getStepDefinition(step.flwStepId);
    const context = await buildStepContext(step);
    const flowConditionsResult = definition.position === 1
        ? await evaluateFlowConditions(definition.flwId, context)
        : { matched: true, evaluated: 0 };
    if (!flowConditionsResult.matched) {
        await stopExecutionByCondition(step, {
            scope: "flow",
            evaluated: flowConditionsResult.evaluated,
        });
        return;
    }
    const stepConditionsResult = evaluateConditions(definition.FlwConditions, context);
    if (!stepConditionsResult.matched) {
        await onSuccessFunction(step, {
            skipped: true,
            reason: "step_conditions_not_met",
            evaluatedConditions: stepConditionsResult.evaluated,
        });
        return;
    }
    let outputPayload;
    try {
        outputPayload = await runIntegration(definition, context);
    }
    catch (err) {
        await failureHandler(step, err);
        return;
    }
    await onSuccessFunction(step, outputPayload);
}
// ----------------------------------------------------------------
// Claim step (optimistic lock via status guard)
// ----------------------------------------------------------------
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
    if (claimed.count === 0)
        return null;
    const step = await prisma.flwExecutionSteps.findUnique({
        where: { id: stepExecutionId },
    });
    if (!step)
        return null;
    // Promote the parent execution to Running only if it is still Pending.
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
async function getStepDefinition(flwStepId) {
    const definition = await prisma.flwSteps.findUnique({
        where: { id: flwStepId },
        include: {
            FlwConditions: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });
    if (!definition) {
        throw new Error(`Step definition not found for flwStepId: ${flwStepId}`);
    }
    return definition;
}
// ----------------------------------------------------------------
// Context builder
// ----------------------------------------------------------------
async function buildStepContext(step) {
    const execution = await prisma.flwExecutions.findUnique({
        where: { id: step.flwExecutionId },
        select: { triggerPayload: true },
    });
    const previousSteps = await prisma.flwExecutionSteps.findMany({
        where: {
            flwExecutionId: step.flwExecutionId,
            id: { not: step.id },
            status: "Success",
        },
        orderBy: { startedAt: "asc" },
        select: { flwStepId: true, outputPayload: true },
    });
    return {
        triggerPayload: execution?.triggerPayload ?? null,
        previousSteps: previousSteps.map((entry) => ({
            stepId: entry.flwStepId,
            outputPayload: entry.outputPayload,
        })),
    };
}
// ----------------------------------------------------------------
// Template resolution  {{ trigger.x }}  {{ steps.<id>.x }}
// ----------------------------------------------------------------
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
    if (typeof value === "string")
        return resolveTemplate(value, context);
    if (Array.isArray(value))
        return value.map((item) => resolveInputMapping(item, context));
    if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([k, v]) => [
            k,
            resolveInputMapping(v, context),
        ]));
    }
    return value;
}
function evaluateSingleCondition(condition, context) {
    const sourcePayload = condition.sourceType === "Trigger"
        ? context.triggerPayload
        : context.previousSteps.find((entry) => entry.stepId === condition.sourceStepId)?.outputPayload;
    const actualValue = resolvePath(sourcePayload, condition.fieldPath.split("."));
    const expectedValue = condition.comparisonValue === null || condition.comparisonValue === undefined
        ? undefined
        : condition.comparisonValue;
    switch (condition.operator) {
        case "Equals":
            return actualValue === expectedValue;
        case "NotEquals":
            return actualValue !== expectedValue;
        case "Contains":
            if (typeof actualValue === "string" && typeof expectedValue === "string") {
                return actualValue.includes(expectedValue);
            }
            if (Array.isArray(actualValue)) {
                return actualValue.includes(expectedValue);
            }
            return false;
        case "NotContains":
            if (typeof actualValue === "string" && typeof expectedValue === "string") {
                return !actualValue.includes(expectedValue);
            }
            if (Array.isArray(actualValue)) {
                return !actualValue.includes(expectedValue);
            }
            return true;
        case "GreaterThan":
            return Number(actualValue) > Number(expectedValue);
        case "LessThan":
            return Number(actualValue) < Number(expectedValue);
        case "Exists":
            return actualValue !== undefined && actualValue !== null;
        case "NotExists":
            return actualValue === undefined || actualValue === null;
        default: {
            const operator = condition.operator;
            throw new Error(`Unsupported condition operator: ${operator}`);
        }
    }
}
function combineConditionResults(accumulator, nextResult, logicGate) {
    if (logicGate === "Or") {
        return accumulator || nextResult;
    }
    return accumulator && nextResult;
}
function evaluateConditions(conditions, context) {
    if (conditions.length === 0) {
        return { matched: true, evaluated: 0 };
    }
    const [firstCondition, ...restConditions] = conditions;
    if (!firstCondition) {
        return { matched: true, evaluated: 0 };
    }
    let matched = evaluateSingleCondition(firstCondition, context);
    for (const condition of restConditions) {
        matched = combineConditionResults(matched, evaluateSingleCondition(condition, context), condition.logicGate);
    }
    return {
        matched,
        evaluated: conditions.length,
    };
}
async function evaluateFlowConditions(flwId, context) {
    const flowConditions = await prisma.flwConditions.findMany({
        where: {
            flwId,
            flwStepId: null,
        },
        orderBy: {
            position: "asc",
        },
    });
    return evaluateConditions(flowConditions, context);
}
// ----------------------------------------------------------------
// Integration runner  (replaces the stub integrationFunction)
// ----------------------------------------------------------------
async function runIntegration(definition, context) {
    if (!definition.operationKey) {
        throw new Error(`Step operation not found for flwStepId: ${definition.id}`);
    }
    const resolvedInput = resolveInputMapping(definition.inputMapping, context);
    const result = await executeIntegration(definition.integrationKey, definition.operationKey, resolvedInput);
    return result.outputPayload;
}
async function stopExecutionByCondition(step, details) {
    await prisma.$transaction(async (tx) => {
        await tx.flwExecutionSteps.update({
            where: { id: step.id },
            data: {
                status: "Success",
                outputPayload: toJsonValue({
                    skipped: true,
                    reason: `${details.scope}_conditions_not_met`,
                    evaluatedConditions: details.evaluated,
                }),
                error: null,
                errorPayload: Prisma.JsonNull,
                finishedAt: new Date(),
            },
        });
        await tx.flwExecutions.update({
            where: { id: step.flwExecutionId },
            data: {
                status: "Success",
                finishedAt: new Date(),
            },
        });
    });
    console.log(`Execution ${step.flwExecutionId} stopped because ${details.scope} conditions were not met`);
}
// ----------------------------------------------------------------
// Success handler – marks step done, chains next step or closes execution
// ----------------------------------------------------------------
async function onSuccessFunction(step, outputPayload) {
    const result = await prisma.$transaction(async (tx) => {
        const current = await tx.flwSteps.findUnique({ where: { id: step.flwStepId } });
        if (!current)
            throw new Error(`Step definition not found for flwStepId: ${step.flwStepId}`);
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
            return { nextStepExecutionId: nextStepExecution.id };
        }
        await tx.flwExecutions.update({
            where: { id: step.flwExecutionId },
            data: { status: "Success", finishedAt: new Date() },
        });
        return { nextStepExecutionId: null };
    });
    if (result.nextStepExecutionId) {
        await stepQueue.add("execute-step", { stepExecutionId: result.nextStepExecutionId });
        console.log(`Next step enqueued – stepExecutionId: ${result.nextStepExecutionId}`);
        return;
    }
    console.log(`Execution ${step.flwExecutionId} completed successfully`);
}
// ----------------------------------------------------------------
// Failure handler – exponential backoff retry or terminal failure
// ----------------------------------------------------------------
async function failureHandler(step, err) {
    const maxRetries = 5;
    const baseDelay = 5_000;
    const retryCount = step.retryCount + 1;
    const errorMessage = err instanceof Error ? err.message : String(err);
    if (retryCount > maxRetries) {
        console.error(`Step ${step.id} exceeded max retries (${maxRetries}) – marking failed. Error: ${errorMessage}`);
        await prisma.flwExecutionSteps.update({
            where: { id: step.id },
            data: {
                status: "Failed",
                error: errorMessage,
                errorPayload: toJsonValue({ message: errorMessage, retryCount }),
                finishedAt: new Date(),
            },
        });
        await prisma.flwExecutions.update({
            where: { id: step.flwExecutionId },
            data: { status: "Failed", finishedAt: new Date() },
        });
        return;
    }
    // Use the incremented retryCount for the exponent so delay grows correctly:
    // retry 1 → 10s, retry 2 → 20s, retry 3 → 40s, retry 4 → 80s, retry 5 → 160s
    const delay = baseDelay * Math.pow(2, retryCount);
    const nextRetryAt = new Date(Date.now() + delay);
    await prisma.flwExecutionSteps.update({
        where: { id: step.id },
        data: {
            status: "Pending",
            retryCount,
            nextRetryAt,
            error: errorMessage,
            errorPayload: toJsonValue({
                message: errorMessage,
                retryCount,
                nextRetryAt: nextRetryAt.toISOString(),
            }),
        },
    });
    // Re-enqueue with BullMQ delay so the step is picked up after backoff elapses.
    await stepQueue.add("execute-step", { stepExecutionId: step.id }, { delay });
    console.log(`Step ${step.id} retry ${retryCount}/${maxRetries} scheduled in ${delay / 1000}s`);
}
//# sourceMappingURL=worker.js.map