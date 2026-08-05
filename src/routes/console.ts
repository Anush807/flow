/**
 * The API the web console (`src/web/ui`) talks to, mounted at `/api`.
 *
 * It is a second face on the same services, not a second engine: every write
 * here goes through `flow-service` / `execution-service` exactly as `/flow`
 * does. What it adds is shaping – lowercase statuses, relative timestamps,
 * payloads as text – so the browser does not have to know the persistence
 * model. It sits behind the same management API key as `/flow`; the console
 * asks the operator for that key and sends it as `x-api-key`.
 */

import express from "express";
import { stepQueue } from "../async/redis-queue.js";
import { config, isProduction } from "../config.js";
import { listRegisteredOperations } from "../integrations/registry.js";
import {
  getConsoleExecution,
  getConsoleFlow,
  getConsoleStats,
  getExecutionForRerun,
  listConsoleExecutions,
  listConsoleFlows,
} from "../services/console-service.js";
import { toFlowStatus, toFlowStepInputs } from "../services/console-view.js";
import { createExecutionForFlow } from "../services/execution-service.js";
import {
  createFlowDefinition,
  deleteFlowDefinition,
  updateFlowDefinition,
} from "../services/flow-service.js";
import { testFlowExecution } from "../services/test-services.js";
import {
  consoleCreateFlowSchema,
  consoleExecutionQuerySchema,
  consoleFlowQuerySchema,
  consolePayloadSchema,
  consoleUpdateFlowSchema,
} from "../validations/index.js";
import { errorResponse } from "../utils/error-response.js";
import { createLogger } from "../utils/logger.js";

const log = createLogger("console-api");
const router = express.Router();

/** Console form fields arrive as "" when cleared; the columns are nullable. */
function optionalText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * On update, a cleared field is an instruction to clear the column – which is
 * different from "not submitted". `null` is what `updateFlowDefinition` takes
 * for that, and only `undefined` is treated as absent.
 */
function nullableText(value: string | undefined): string | null | undefined {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function parseJsonBody(raw: string | undefined, field: string): unknown {
  if (raw === undefined) return undefined;

  const trimmed = raw.trim();
  if (trimmed === "") return undefined;

  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error(`${field} must be valid JSON`);
  }
}

/**
 * Queue depth is a nice-to-have on a settings screen, and ioredis retries a
 * dead connection forever – so an unreachable Redis must not hold the response
 * open. It degrades to `null`, which the console renders as "unavailable".
 */
async function queueDepth(timeoutMs = 2_000): Promise<Record<string, number> | null> {
  let timer: NodeJS.Timeout | undefined;

  try {
    return await Promise.race([
      stepQueue.getJobCounts("waiting", "active", "delayed", "failed"),
      new Promise<null>((resolve) => {
        timer = setTimeout(() => resolve(null), timeoutMs);
      }),
    ]);
  } catch (error) {
    log.warn("Queue depth unavailable", { error: error instanceof Error ? error.message : error });
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

router.get("/stats", async (_req, res) => {
  try {
    return res.json({ data: await getConsoleStats() });
  } catch (error) {
    return errorResponse(res, "Failed to fetch stats", error);
  }
});

/**
 * Non-secret runtime facts plus live queue depth. The console's settings screen
 * used to render invented values; these are the ones the processes actually
 * booted with. The API key itself is never echoed back.
 */
router.get("/settings", async (_req, res) => {
  try {
    const queue = await queueDepth();

    return res.json({
      data: {
        environment: config.NODE_ENV,
        authRequired: Boolean(config.API_KEY) || isProduction,
        worker: {
          concurrency: config.WORKER_CONCURRENCY,
          stepMaxRetries: config.STEP_MAX_RETRIES,
          stepRetryBaseDelayMs: config.STEP_RETRY_BASE_DELAY_MS,
        },
        recovery: {
          intervalMs: config.RECOVERY_INTERVAL_MS,
          batchSize: config.RECOVERY_BATCH_SIZE,
        },
        rateLimits: {
          windowMs: config.RATE_LIMIT_WINDOW_MS,
          managementMax: config.RATE_LIMIT_MANAGEMENT_MAX,
          ingressMax: config.RATE_LIMIT_INGRESS_MAX,
        },
        logLevel: config.LOG_LEVEL,
        emailConfigured: Boolean(config.SMTP_HOST),
        queue,
      },
    });
  } catch (error) {
    return errorResponse(res, "Failed to fetch settings", error);
  }
});

router.get("/integrations", (_req, res) => {
  return res.json({ data: listRegisteredOperations() });
});

// ---------------------------------------------------------------------------
// Flows
// ---------------------------------------------------------------------------

router.get("/flows", async (req, res) => {
  try {
    const query = consoleFlowQuerySchema.parse(req.query);
    const { flows, total } = await listConsoleFlows(query);

    return res.json({
      data: flows,
      pagination: { limit: query.limit, offset: query.offset, total },
    });
  } catch (error) {
    return errorResponse(res, "Failed to fetch flows", error);
  }
});

router.get("/flows/:id", async (req, res) => {
  try {
    const flow = await getConsoleFlow(String(req.params.id));

    if (!flow) {
      return res.status(404).json({ message: "Flow not found" });
    }

    return res.json({ data: flow });
  } catch (error) {
    return errorResponse(res, "Failed to fetch flow", error);
  }
});

router.post("/flows", async (req, res) => {
  try {
    const payload = consoleCreateFlowSchema.parse(req.body);

    const created = await createFlowDefinition({
      name: payload.name,
      ...(payload.description !== undefined ? { description: nullableText(payload.description) } : {}),
      ...(payload.status ? { status: toFlowStatus(payload.status) } : {}),
      ...(optionalText(payload.eventKey) ? { eventKey: optionalText(payload.eventKey) } : {}),
      ...(optionalText(payload.webhookKey) ? { webhookKey: optionalText(payload.webhookKey) } : {}),
      steps: toFlowStepInputs(payload.steps),
    });

    log.info("Flow created from console", { flwId: created.id, name: created.name });

    const flow = await getConsoleFlow(created.id);
    return res.status(201).json({ data: flow });
  } catch (error) {
    return errorResponse(res, "Failed to create flow", error);
  }
});

/**
 * PUT, not PATCH, because the console always submits the whole form. Steps are
 * still replaced through `updateFlowDefinition`, so the previous definition is
 * superseded rather than deleted and in-flight executions finish on the steps
 * they started with.
 */
router.put("/flows/:id", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const payload = consoleUpdateFlowSchema.parse(req.body);

    await updateFlowDefinition(flwId, {
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.description !== undefined ? { description: nullableText(payload.description) } : {}),
      ...(payload.status !== undefined ? { status: toFlowStatus(payload.status) } : {}),
      ...(payload.eventKey !== undefined ? { eventKey: nullableText(payload.eventKey) } : {}),
      ...(payload.webhookKey !== undefined ? { webhookKey: nullableText(payload.webhookKey) } : {}),
      ...(payload.steps !== undefined ? { steps: toFlowStepInputs(payload.steps) } : {}),
    });

    log.info("Flow updated from console", { flwId, replacedSteps: payload.steps !== undefined });

    return res.json({ data: await getConsoleFlow(flwId) });
  } catch (error) {
    return errorResponse(res, "Failed to update flow", error);
  }
});

router.delete("/flows/:id", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const flow = await deleteFlowDefinition(flwId);

    log.warn("Flow deleted from console", { flwId, name: flow.name });

    return res.json({ data: { id: flow.id, name: flow.name } });
  } catch (error) {
    return errorResponse(res, "Failed to delete flow", error);
  }
});

// ---------------------------------------------------------------------------
// Running a flow
// ---------------------------------------------------------------------------

/**
 * Dry run: executes the flow's root steps in-process, writes nothing, queues
 * nothing. Branches are not walked (see `test-services`), so the response says
 * how many steps of the definition were actually covered.
 */
router.post("/flows/:id/test", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const { payload } = consolePayloadSchema.parse(req.body ?? {});
    const triggerPayload = parseJsonBody(payload, "payload") ?? {};
    const result = await testFlowExecution(flwId, triggerPayload);

    return res.json({
      data: {
        ...result,
        steps: result.steps.map((step) => ({
          ...step,
          duration: `${step.durationMs}ms`,
          outputPayload:
            step.outputPayload === null || step.outputPayload === undefined
              ? undefined
              : JSON.stringify(step.outputPayload, null, 2),
        })),
        duration: `${result.durationMs}ms`,
      },
    });
  } catch (error) {
    return errorResponse(res, "Test execution failed", error);
  }
});

/**
 * The real thing: creates a persisted execution and hands the first step to the
 * worker. Identical to `POST /flow/:id/trigger` – the console just calls it
 * "emit" because that is the button the operator pressed.
 */
router.post("/flows/:id/emit", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const { payload, idempotencyKey } = consolePayloadSchema.parse(req.body ?? {});
    const triggerPayload = parseJsonBody(payload, "payload") ?? {};

    const { execution, executionStep, isDuplicate } = await createExecutionForFlow({
      flwId,
      triggerPayload,
      ...(idempotencyKey !== undefined ? { idempotencyKey } : {}),
    });

    if (!isDuplicate && executionStep) {
      await stepQueue.add("execute-step", { stepExecutionId: executionStep.id });
    }

    log.info(isDuplicate ? "Duplicate console trigger ignored" : "Execution created from console", {
      flwId,
      executionId: execution.id,
      duplicate: isDuplicate,
    });

    return res.status(isDuplicate ? 200 : 202).json({
      data: {
        duplicate: isDuplicate,
        execution: await getConsoleExecution(execution.id),
      },
    });
  } catch (error) {
    return errorResponse(res, "Failed to trigger flow", error);
  }
});

// ---------------------------------------------------------------------------
// Executions
// ---------------------------------------------------------------------------

router.get("/executions", async (req, res) => {
  try {
    const query = consoleExecutionQuerySchema.parse(req.query);
    const { executions, total } = await listConsoleExecutions(query);

    return res.json({
      data: executions,
      pagination: { limit: query.limit, offset: query.offset, total },
    });
  } catch (error) {
    return errorResponse(res, "Failed to fetch executions", error);
  }
});

router.get("/executions/:id", async (req, res) => {
  try {
    const execution = await getConsoleExecution(String(req.params.id));

    if (!execution) {
      return res.status(404).json({ message: "Execution not found" });
    }

    return res.json({ data: execution });
  } catch (error) {
    return errorResponse(res, "Failed to fetch execution", error);
  }
});

/**
 * Re-run replays the original trigger payload as a *new* execution against the
 * flow's current definition. It deliberately does not resurrect the old row:
 * steps that already succeeded are not re-claimable, and the failed run stays
 * on record as what happened.
 */
router.post("/executions/:id/rerun", async (req, res) => {
  const executionId = String(req.params.id);

  try {
    const source = await getExecutionForRerun(executionId);

    const { execution, executionStep, isDuplicate } = await createExecutionForFlow({
      flwId: source.flwId,
      triggerPayload: source.triggerPayload,
    });

    if (!isDuplicate && executionStep) {
      await stepQueue.add("execute-step", { stepExecutionId: executionStep.id });
    }

    log.info("Execution re-run from console", {
      flwId: source.flwId,
      executionId: execution.id,
      sourceExecutionId: executionId,
    });

    return res.status(202).json({
      data: { execution: await getConsoleExecution(execution.id) },
    });
  } catch (error) {
    return errorResponse(res, "Failed to re-run execution", error);
  }
});

export default router;
