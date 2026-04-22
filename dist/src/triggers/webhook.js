import { createExecutionForFlow } from "../services/execution-service.js";
import { prisma } from "../../lib/prisma.js";
import { stepQueue } from "../redis-queue.js";
// ----------------------------------------------------------------
// POST /webhooks/:webhookKey
//
// Each workflow that uses an "incoming webhook" trigger has a unique
// webhookKey stored on the FlwTrigger record (or directly on Flw).
// This handler:
//   1. Looks up the active workflow by webhookKey
//   2. Creates a FlwExecution with the raw request body as triggerPayload
//   3. Creates the first FlwExecutionStep for position=1
//   4. Enqueues the step job and returns 202 immediately
//
// If you want synchronous webhook responses (i.e. the workflow runs
// a http:respond step and the caller waits), swap the 202 for a
// promise that resolves when the execution finishes – but that
// requires SSE or polling and is out of scope here.
// ----------------------------------------------------------------
export async function webhookTriggerHandler(req, res) {
    const { webhookKey } = req.params;
    // Look up the workflow by its webhook key.
    // Assumes your Flw (workflow) table has a unique `webhookKey` column
    // and a `status` column so inactive workflows are ignored.
    const workflow = await prisma.flw.findFirst({
        where: {
            webhookKey,
            status: "Active",
        },
        include: {
            // Grab the first step so we can create the initial execution step
            FlwSteps: {
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
    const requestIdempotencyKey = (typeof req.header("x-idempotency-key") === "string" && req.header("x-idempotency-key")) ||
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
//# sourceMappingURL=webhook.js.map