import type { Request, Response } from "express";
import { createExecutionForFlow } from "../services/execution-service.js";
import { prisma } from "../../lib/prisma.js";
import { stepQueue } from "../redis-queue.js";

export async function webhookTriggerHandler(req: Request, res: Response): Promise<void> {
  const { webhookKey } = req.params as { webhookKey: string };

  const workflow = await prisma.flw.findFirst({
    where: {
      webhookKey,
      status: "Active",
    },
    include: {
      FlwSteps: {
        where: { parentStepId: null },
        orderBy: { position: "asc" },
        take: 1,
      },
    },
  });

  if (!workflow) {
    res.status(404).json({ error: "No active workflow found for this webhook key" });
    return;
  }

  const firstStep = workflow.FlwSteps[0];
  if (!firstStep) {
    res.status(422).json({ error: "Workflow has no steps configured" });
    return;
  }

  const triggerPayload = {
    headers: req.headers,
    query: req.query,
    body: req.body,
    method: req.method,
    receivedAt: new Date().toISOString(),
  };
  const requestIdempotencyKey =
    (typeof req.header("x-idempotency-key") === "string" && req.header("x-idempotency-key")) ||
    (typeof req.header("x-flow-event-key") === "string" && req.header("x-flow-event-key")) ||
    (typeof req.body?.idempotencyKey === "string" && req.body.idempotencyKey) ||
    undefined;

  const { execution, executionStep, isDuplicate } = await createExecutionForFlow({
    flwId: workflow.id,
    triggerPayload,
    ...(requestIdempotencyKey !== undefined
      ? { sourceEventKey: `webhook:${requestIdempotencyKey}` }
      : {}),
  });

  if (!isDuplicate && executionStep) {
    await stepQueue.add("execute-step", { stepExecutionId: executionStep.id });
  }

  res.status(isDuplicate ? 200 : 202).json({
    message: isDuplicate ? "Duplicate webhook ignored" : "Workflow execution started",
    executionId: execution.id,
    stepExecutionId: executionStep?.id ?? null,
    duplicate: isDuplicate,
  });
}
