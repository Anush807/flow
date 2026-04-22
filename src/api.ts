import express from "express";
import {
  createFlowSchema,
  emitEventSchema,
  triggerFlowSchema,
  updateFlowSchema,
} from "./validations/index.js";
import { eventTriggerQueue, stepQueue } from "./redis-queue.js";
import {
  createExecutionForFlow,
  getExecutionById,
  getExecutionHistoryForFlow,
  getExecutionSummary,
} from "./services/execution-service.js";
import {
  createFlowDefinition,
  getFlowDefinition,
  listFlowDefinitions,
  updateFlowDefinition,
} from "./services/flow-service.js";

const router = express.Router();

async function createFlowHandler(req: express.Request, res: express.Response) {
  try {
    const payload = createFlowSchema.parse(req.body);
    const flow = await createFlowDefinition({
      name: payload.name,
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.eventKey ? { eventKey: payload.eventKey } : {}),
      ...(payload.webhookKey ? { webhookKey: payload.webhookKey } : {}),
      ...(payload.conditions ? { conditions: payload.conditions } : {}),
      ...(payload.steps ? { steps: payload.steps } : {}),
      ...(payload.nodeType ? { nodeType: payload.nodeType } : {}),
      ...(payload.configPayload !== undefined
        ? { configPayload: payload.configPayload }
        : {}),
    });

    return res.status(201).json({
      message: "Flow created successfully",
      data: flow,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create flow",
      error: String(error),
    });
  }
}

router.post("/", createFlowHandler);
router.post("/create", createFlowHandler);

router.get("/", async (_req, res) => {
  try {
    const flows = await listFlowDefinitions();

    return res.json({
      message: "Flows fetched successfully",
      data: flows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch flows",
      error: String(error),
    });
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
    return res.status(500).json({
      message: "Failed to fetch flow",
      error: String(error),
    });
  }
});

router.patch("/:id", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const payload = updateFlowSchema.parse(req.body);
    const flow = await updateFlowDefinition(flwId, {
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.status !== undefined ? { status: payload.status } : {}),
      ...(payload.eventKey !== undefined ? { eventKey: payload.eventKey } : {}),
      ...(payload.webhookKey !== undefined ? { webhookKey: payload.webhookKey } : {}),
      ...(payload.conditions !== undefined ? { conditions: payload.conditions } : {}),
      ...(payload.steps ? { steps: payload.steps } : {}),
    });

    return res.json({
      message: "Flow updated successfully",
      data: flow,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update flow",
      error: String(error),
    });
  }
});

router.get("/:id/executions", async (req, res) => {
  const flwId = String(req.params.id);

  try {
    const executions = await getExecutionHistoryForFlow(flwId);

    return res.json({
      message: "Executions fetched successfully",
      data: executions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch executions",
      error: String(error),
    });
  }
});

router.get("/dashboard/summary", async (_req, res) => {
  try {
    const [summary, flows] = await Promise.all([
      getExecutionSummary(),
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
    return res.status(500).json({
      message: "Failed to fetch dashboard summary",
      error: String(error),
    });
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
    return res.status(500).json({
      message: "Failed to fetch execution",
      error: String(error),
    });
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

    return res.status(202).json({
      message: "Event queued successfully",
      data: {
        eventKey,
        jobId: job.id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to queue event",
      error: String(error),
    });
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

    return res.json({
      message: isDuplicate ? "Duplicate trigger ignored" : "Execution created successfully",
      data: {
        executionId: execution.id,
        firstStepExecutionId: executionStep?.id ?? null,
        duplicate: isDuplicate,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while triggering flow",
      error: String(error),
    });
  }
}

router.post("/:id/trigger", triggerFlowHandler);
router.post("/flows/:id/trigger", triggerFlowHandler);

export default router;
