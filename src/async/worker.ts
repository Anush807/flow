// The event-trigger worker has no process of its own – importing it here is
// what starts it. Bound by name (rather than a bare side-effect import) so
// shutdown can close it too.
import { eventTriggerWorker } from "../triggers/events.js";
import { randomUUID } from "node:crypto";
import { Worker } from "bullmq";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { FlwConditions, FlwExecutionSteps, FlwSteps } from "../../generated/prisma/client.js";
import { stepQueue, redisConnection } from "./redis-queue.js";
import { executeIntegration } from "../integrations/registry.js";
import { resolveInputMapping } from "../utils/template.js";
import type { StepContext } from "../utils/template.js";
import { evaluateConditions } from "../utils/conditions.js";
import { findNextStep } from "../services/step-traversal.js";
import type { StepReader } from "../services/step-traversal.js";
import { config } from "../config.js";
import { planRetry } from "../utils/retry.js";
import { createLogger } from "../utils/logger.js";

const log = createLogger("worker");

type LoadedStepDefinition = FlwSteps & {
  FlwConditions: FlwConditions[];
};

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------

/**
 * Prisma's 5s default is tight against a remote database. These transactions
 * are deliberately small, but each statement still costs a round trip.
 */
const STEP_WRITE_TRANSACTION_OPTIONS = { maxWait: 10_000, timeout: 20_000 };

function toJsonValue(value: unknown): Prisma.InputJsonValue  | typeof Prisma.JsonNull {
  if (value === undefined) {
    return Prisma.JsonNull;
  }
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

// ----------------------------------------------------------------
// Worker
// ----------------------------------------------------------------

log.info("Step execution worker starting", { concurrency: config.WORKER_CONCURRENCY });

const worker = new Worker<{ stepExecutionId: string }>(
  "step-execution-worker",
  async (job) => {
    const { stepExecutionId } = job.data;
    if (!stepExecutionId) {
      log.warn("Job is missing stepExecutionId – skipping", { jobId: job.id });
      return;
    }
    await processStep(stepExecutionId);
  },
  {
    connection: redisConnection,
    concurrency: config.WORKER_CONCURRENCY,
  },
);

worker.on("completed", (job) => {
  log.debug("Job completed", { jobId: job.id, stepExecutionId: job.data.stepExecutionId });
});

worker.on("failed", (job, err) => {
  log.error("Job failed", err, { jobId: job?.id, stepExecutionId: job?.data?.stepExecutionId });
});

worker.on("error", (err) => {
  log.error("Worker error", err);
});

// ----------------------------------------------------------------
// Graceful shutdown
// ----------------------------------------------------------------

async function shutdown(signal: string) {
  log.info("Shutting down worker", { signal });
  try {
    await worker.close();
    await eventTriggerWorker.close();
    await stepQueue.close();
    await prisma.$disconnect();
    log.info("Worker shut down cleanly");
    process.exit(0);
  } catch (err) {
    log.error("Error during worker shutdown", err);
    process.exit(1);
  }
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

// ----------------------------------------------------------------
// Core step processor
// ----------------------------------------------------------------

async function processStep(stepExecutionId: string): Promise<void> {
  const step = await claimStep(stepExecutionId);
  if (!step) {
    // Already claimed by another worker instance or not in Pending state.
    log.debug("Step already claimed or not found – skipping", { stepExecutionId });
    return;
  }

  // Everything past the claim must be guarded: the step is now `Running`, and
  // recovery deliberately ignores executions that still have a `Running` step.
  // An unguarded throw (missing definition, DB blip, bad condition operator)
  // would strand the execution forever.
  try {
    const definition = await getStepDefinition(step.flwStepId);
    const context = await buildStepContext(step);

    // Flow-level conditions gate the whole run and are evaluated on the very
    // first root step. This has to happen *before* the Trigger short-circuit –
    // the first root step is normally a Trigger, so checking afterwards meant
    // flow-level conditions were never evaluated at all.
    const isFirstRootStep = definition.position === 1 && definition.parentStepId === null;
    if (isFirstRootStep) {
      const flowConditionsResult = await evaluateFlowConditions(definition.flwId, context);

      if (!flowConditionsResult.matched) {
        await stopExecutionByCondition(step, {
          scope: "flow",
          evaluated: flowConditionsResult.evaluated,
        });
        return;
      }
    }

    if (definition.type === "Trigger") {
      await onSuccessFunction(step, { skipped: true, reason: "trigger_step" }, context);
      return;
    }

    const stepConditionsResult = evaluateConditions(definition.FlwConditions, context);
    if (!stepConditionsResult.matched) {
      await onSuccessFunction(step, {
        skipped: true,
        reason: "step_conditions_not_met",
        evaluatedConditions: stepConditionsResult.evaluated,
      }, context);
      return;
    }

    const outputPayload = await runIntegration(definition, context);
    await onSuccessFunction(step, outputPayload, context);
  } catch (err) {
    await failureHandler(step, err);
  }
}

// ----------------------------------------------------------------
// Claim step (optimistic lock via status guard)
// ----------------------------------------------------------------

async function claimStep(stepExecutionId: string): Promise<FlwExecutionSteps | null> {
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

  if (claimed.count === 0) return null;

  const step = await prisma.flwExecutionSteps.findUnique({
    where: { id: stepExecutionId },
  });
  if (!step) return null;

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

async function getStepDefinition(flwStepId: string): Promise<LoadedStepDefinition> {
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

async function buildStepContext(step: FlwExecutionSteps): Promise<StepContext> {
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

async function evaluateFlowConditions(flwId: string, context: StepContext) {
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

async function runIntegration(
  definition: LoadedStepDefinition,
  context: StepContext,
): Promise<unknown> {
  if (definition.type === "Trigger") {
    return { skipped: true, reason: "trigger_step" };
  }

  if (!definition.integrationKey || !definition.operationKey) {
    throw new Error(`Step ${definition.id} is missing integrationKey or operationKey`);
  }

  // use inputMapping if present, otherwise fall back to configPayload
  const rawInput = definition.inputMapping ?? definition.configPayload ?? {};

  const resolvedInput = resolveInputMapping(rawInput, context) as Record<string, unknown>;

  const result = await executeIntegration(
    definition.integrationKey,
    definition.operationKey,
    resolvedInput,
  );

  return result.outputPayload;
}

async function stopExecutionByCondition(
  step: FlwExecutionSteps,
  details: { scope: "flow" | "step"; evaluated: number },
): Promise<void> {
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
  }, STEP_WRITE_TRANSACTION_OPTIONS);

  log.info("Execution stopped by conditions", {
    executionId: step.flwExecutionId,
    stepExecutionId: step.id,
    scope: details.scope,
    evaluatedConditions: details.evaluated,
  });
}

// ----------------------------------------------------------------
// Branch evaluation – Prisma-backed reader for the traversal rules
// ----------------------------------------------------------------

/**
 * Every query here is scoped to the current step's generation via `deletedAt`:
 * null for the live definition, or the exact timestamp shared by all steps
 * retired in one PATCH. An execution that started before a step replacement
 * therefore runs to completion on the definition it began with, instead of
 * falling off the end of a chain that no longer exists.
 */
function prismaStepReader(tx: Prisma.TransactionClient): StepReader {
  return {
    async findChildren(parent) {
      const children = await tx.flwSteps.findMany({
        where: { parentStepId: parent.id, deletedAt: parent.deletedAt },
        orderBy: [{ branchIndex: "asc" }, { position: "asc" }],
        include: {
          FlwConditions: { orderBy: { position: "asc" } },
        },
      });

      return children;
    },

    async findNextSibling(step) {
      return tx.flwSteps.findFirst({
        where: {
          flwId: step.flwId,
          parentStepId: step.parentStepId,
          branchIndex: step.branchIndex,
          position: { gt: step.position },
          deletedAt: step.deletedAt,
        },
        orderBy: { position: "asc" },
      });
    },

    async findStepById(stepId) {
      return tx.flwSteps.findUnique({ where: { id: stepId } });
    },
  };
}

async function onSuccessFunction(step: FlwExecutionSteps, outputPayload: unknown, context: StepContext): Promise<void> {
  // `context` was built before this step ran, so it does not contain this
  // step's own output. Branch conditions almost always key off the step
  // immediately preceding the branch point, so resolve the next step against a
  // context that includes it – otherwise those conditions always see undefined.
  // This mirrors what buildStepContext will load from the DB on the next step.
  const contextWithOutput: StepContext = {
    triggerPayload: context.triggerPayload,
    previousSteps: [
      ...context.previousSteps,
      { stepId: step.flwStepId, outputPayload },
    ],
  };

  // Resolving the next step reads only immutable definition rows, so it runs
  // outside the transaction. Traversal can take several round trips, and
  // holding a transaction open across them risks blowing the timeout on a
  // remote database for no gain in safety.
  const current = await prisma.flwSteps.findUnique({ where: { id: step.flwStepId } });
  if (!current) throw new Error(`Step definition not found for flwStepId: ${step.flwStepId}`);

  const nextDefinition = await findNextStep(
    prismaStepReader(prisma),
    current,
    contextWithOutput,
  );

  // What must be atomic: this step is never marked Success without its
  // successor existing to carry the execution forward.
  const result = await prisma.$transaction(async (tx) => {
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
  }, STEP_WRITE_TRANSACTION_OPTIONS);

  if (result.nextStepExecutionId) {
    await stepQueue.add("execute-step", { stepExecutionId: result.nextStepExecutionId });
    log.debug("Next step enqueued", {
      executionId: step.flwExecutionId,
      stepExecutionId: result.nextStepExecutionId,
    });
    return;
  }

  log.info("Execution completed successfully", { executionId: step.flwExecutionId });
}

// ----------------------------------------------------------------
// Failure handler – exponential backoff retry or terminal failure
// ----------------------------------------------------------------

async function failureHandler(step: FlwExecutionSteps, err: unknown): Promise<void> {
  const maxRetries = config.STEP_MAX_RETRIES;
  const errorMessage = err instanceof Error ? err.message : String(err);
  const plan = planRetry(step.retryCount, {
    maxRetries,
    baseDelayMs: config.STEP_RETRY_BASE_DELAY_MS,
  });
  const retryCount = plan.retryCount;

  log.warn("Step failed", {
    stepExecutionId: step.id,
    executionId: step.flwExecutionId,
    error: errorMessage,
    retryCount,
  });

  if (plan.kind === "exhausted") {
    log.error("Step exceeded max retries – marking failed", err, {
      stepExecutionId: step.id,
      executionId: step.flwExecutionId,
      maxRetries,
    });

    // Guard on `Running`: processStep now routes *any* post-claim throw here,
    // including one raised after the success transaction committed (e.g. the
    // enqueue of the next step). Without the guard we would resurrect a step
    // that already succeeded and re-run its side effects.
    const marked = await prisma.flwExecutionSteps.updateMany({
      where: { id: step.id, status: "Running" },
      data: {
        status: "Failed",
        error: errorMessage,
        errorPayload: toJsonValue({ message: errorMessage, retryCount }),
        finishedAt: new Date(),
      },
    });

    if (marked.count === 0) {
      log.warn("Step is no longer Running – not marking failed", {
        stepExecutionId: step.id,
        error: errorMessage,
      });
      return;
    }

    await prisma.flwExecutions.updateMany({
      where: { id: step.flwExecutionId, status: { in: ["Pending", "Running"] } },
      data: { status: "Failed", finishedAt: new Date() },
    });

    return;
  }

  const { delayMs: delay, nextRetryAt } = plan;

  const rescheduled = await prisma.flwExecutionSteps.updateMany({
    where: { id: step.id, status: "Running" },
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

  if (rescheduled.count === 0) {
    log.warn("Step is no longer Running – not scheduling a retry", {
      stepExecutionId: step.id,
      error: errorMessage,
    });
    return;
  }

  // Re-enqueue with BullMQ delay so the step is picked up after backoff elapses.
  await stepQueue.add(
    "execute-step",
    { stepExecutionId: step.id },
    { delay },
  );

  log.info("Step retry scheduled", {
    stepExecutionId: step.id,
    executionId: step.flwExecutionId,
    retryCount,
    maxRetries,
    delayMs: delay,
  });
}
