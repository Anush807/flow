import express from "express";
import {
  createFlowSchema,
  emitEventSchema,
  paginationSchema,
  triggerFlowSchema,
  updateFlowSchema,
} from "./validations/index.js";
import { eventTriggerQueue, stepQueue } from "./async/redis-queue.js";
import {
  createExecutionForFlow,
  getExecutionById,
  getExecutionHistoryForFlow,
  getExecutionSummary,
} from "./services/execution-service.js";
import {
  countFlowDefinitions,
  createFlowDefinition,
  deleteFlowDefinition,
  getFlowDefinition,
  listFlowDefinitions,
  updateFlowDefinition,
} from "./services/flow-service.js";
import { testFlowExecution } from "./services/test-services.js";
import { webhookTriggerHandler } from "./triggers/webhook.js";
import { ingressRateLimit } from "./middleware/rate-limit.js";
import { errorResponse } from "./utils/error-response.js";
import { createLogger } from "./utils/logger.js";

const log = createLogger("api");
const router = express.Router();

router.post("/:id/test", async (req, res) => {
  const flwId = String(req.params.id);
  try {
    const triggerPayload = req.body?.triggerPayload ?? req.body ?? {};
    const result = await testFlowExecution(flwId, triggerPayload);
    return res.json({
      message: "Test execution completed",
      data: result,
    });
  } catch (error) {
    return errorResponse(res, "Test execution failed", error);
  }
});

async function createFlowHandler(req: express.Request, res: express.Response) {
  try {
    const payload = createFlowSchema.parse(req.body);
    const flow = await createFlowDefinition({
      name: payload.name,
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.eventKey ? { eventKey: payload.eventKey } : {}),
      ...(payload.webhookKey ? { webhookKey: payload.webhookKey } : {}),
      ...(payload.conditions ? { conditions: payload.conditions } : {}),
      ...(payload.steps ? { steps: payload.steps as any } : {}),
      ...(payload.nodeType ? { nodeType: payload.nodeType } : {}),
      ...(payload.configPayload !== undefined
        ? { configPayload: payload.configPayload }
        : {}),
    });

    log.info("Flow created", { flwId: flow.id, name: flow.name, status: flow.status });

    return res.status(201).json({
      message: "Flow created successfully",
      data: flow,
    });
  } catch (error) {
    return errorResponse(res, "Failed to create flow", error);
  }
}

router.post("/", createFlowHandler);
router.post("/create", createFlowHandler);

router.get("/", async (req, res) => {
  try {
    const pagination = paginationSchema.parse(req.query);
    const [flows, total] = await Promise.all([
      listFlowDefinitions(pagination),
      countFlowDefinitions(),
    ]);

    return res.json({
      message: "Flows fetched successfully",
      data: flows,
      pagination: { ...pagination, total },
    });
  } catch (error) {
    return errorResponse(res, "Failed to fetch flows", error);
  }
});

router.get("/:id", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const flow = await getFlowDefinition(flwId);

    if (!flow) {
      return res.status(404).json({
        message: "Flow not found",
      });
    }

    return res.json({
      message: "Flow fetched successfully",
      data: flow,
    });
  } catch (error) {
    return errorResponse(res, "Failed to fetch flow", error);
  }
});

router.patch("/:id", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const payload = updateFlowSchema.parse(req.body);
    const flow = await updateFlowDefinition(flwId, {
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.status !== undefined ? { status: payload.status } : {}),
      ...(payload.eventKey !== undefined ? { eventKey: payload.eventKey } : {}),
      ...(payload.webhookKey !== undefined ? { webhookKey: payload.webhookKey } : {}),
      ...(payload.conditions !== undefined ? { conditions: payload.conditions } : {}),
      ...(payload.steps ? { steps: payload.steps as any } : {}),
    });

    log.info("Flow updated", { flwId, replacedSteps: payload.steps !== undefined });

    return res.json({
      message: "Flow updated successfully",
      data: flow,
    });
  } catch (error) {
    return errorResponse(res, "Failed to update flow", error);
  }
});

router.delete("/:id", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const flow = await deleteFlowDefinition(flwId);

    log.warn("Flow deleted", { flwId, name: flow.name });

    return res.json({
      message: "Flow deleted successfully",
      data: { id: flow.id, name: flow.name },
    });
  } catch (error) {
    return errorResponse(res, "Failed to delete flow", error);
  }
});

router.get("/:id/executions", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const pagination = paginationSchema.parse(req.query);
    const { executions, total } = await getExecutionHistoryForFlow(flwId, pagination);

    return res.json({
      message: "Executions fetched successfully",
      data: executions,
      pagination: { ...pagination, total },
    });
  } catch (error) {
    return errorResponse(res, "Failed to fetch executions", error);
  }
});

router.get("/dashboard/summary", async (_req, res) => {
  try {
    const [summary, flows] = await Promise.all([
      getExecutionSummary(),
      // Status breakdown is over every flow, so this one is intentionally
      // unpaginated – it returns counts, not rows.
      listFlowDefinitions(),
    ]);

    const flowStatusBreakdown = flows.reduce<Record<string, number>>((acc, flow) => {
      acc[flow.status] = (acc[flow.status] ?? 0) + 1;
      return acc;
    }, {});

    return res.json({
      message: "Dashboard summary fetched successfully",
      data: {
        ...summary,
        totalFlows: flows.length,
        flowStatusBreakdown,
      },
    });
  } catch (error) {
    return errorResponse(res, "Failed to fetch dashboard summary", error);
  }
});

router.get("/executions/:executionId", async (req, res) => {
  const executionId = String(req.params.executionId);

  try {
    const execution = await getExecutionById(executionId);

    if (!execution) {
      return res.status(404).json({
        message: "Execution not found",
      });
    }

    return res.json({
      message: "Execution fetched successfully",
      data: execution,
    });
  } catch (error) {
    return errorResponse(res, "Failed to fetch execution", error);
  }
});

router.post("/events/:eventKey/emit", async (req, res) => {
  const eventKey = String(req.params.eventKey);

  try {
    const { payload, idempotencyKey } = emitEventSchema.parse(req.body ?? {});

    const job = await eventTriggerQueue.add("external-event", {
      eventKey,
      payload,
      ...(idempotencyKey !== undefined ? { idempotencyKey } : {}),
    });

    log.info("External event queued", { eventKey, jobId: job.id });

    return res.status(202).json({
      message: "Event queued successfully",
      data: {
        eventKey,
        jobId: job.id,
      },
    });
  } catch (error) {
    return errorResponse(res, "Failed to queue event", error);
  }
});

async function triggerFlowHandler(req: express.Request, res: express.Response) {
  const flwId = String(req.params.id);

  try {
    const { triggerPayload, idempotencyKey } = triggerFlowSchema.parse(req.body ?? {});
    const payload = triggerPayload === undefined ? req.body : triggerPayload;
    const { execution, executionStep, isDuplicate } = await createExecutionForFlow({
      flwId,
      triggerPayload: payload,
      ...(idempotencyKey !== undefined ? { idempotencyKey } : {}),
    });

    if (!isDuplicate && executionStep) {
      await stepQueue.add("execute-step", {
        stepExecutionId: executionStep.id,
      });
    }

    log.info(isDuplicate ? "Duplicate trigger ignored" : "Execution created", {
      flwId,
      executionId: execution.id,
      stepExecutionId: executionStep?.id ?? null,
      duplicate: isDuplicate,
    });

    return res.json({
      message: isDuplicate ? "Duplicate trigger ignored" : "Execution created successfully",
      data: {
        executionId: execution.id,
        firstStepExecutionId: executionStep?.id ?? null,
        duplicate: isDuplicate,
      },
    });
  } catch (error) {
    return errorResponse(res, "Error while triggering flow", error);
  }
}

router.post("/:id/trigger", triggerFlowHandler);
router.post("/flows/:id/trigger", triggerFlowHandler);
// Ingress alias – rate limited per webhook key like the top-level /webhooks route.
router.post("/webhook/:webhookKey", ingressRateLimit, webhookTriggerHandler);

export default router;
