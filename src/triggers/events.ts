import { Worker } from "bullmq";
import { createExecutionForFlow } from "../services/execution-service.js";
import { prisma } from "../../lib/prisma.js";
import { stepQueue, redisConnection } from "../async/redis-queue.js";

export type ExternalEventJob = {
  eventKey: string;
  payload: unknown;
  idempotencyKey?: string;
};

export const eventTriggerWorker = new Worker<ExternalEventJob>(
  "external-event-trigger",
  async (job) => {
    const { eventKey, payload, idempotencyKey } = job.data;

    if (!eventKey) {
      throw new Error("external-event-trigger job is missing 'eventKey'");
    }

    const workflow = await prisma.flw.findFirst({
      where: {  
        eventKey,
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
      // Not an error – the event key may belong to an inactive or
      // deleted workflow. Log and discard.
      console.warn(`external-event-trigger: no active workflow for eventKey "${eventKey}"`);
      return;
    }

    const firstStep = workflow.FlwSteps[0];
    if (!firstStep) {
      throw new Error(
        `Workflow ${workflow.id} matched eventKey "${eventKey}" but has no steps configured`,
      );
    }

    const triggerPayload = {
      eventKey,
      payload: JSON.parse(JSON.stringify(payload ?? null)),
      receivedAt: new Date().toISOString(),
    };

    const { execution, executionStep, isDuplicate } = await createExecutionForFlow({
      flwId: workflow.id,
      triggerPayload: triggerPayload,
      ...(idempotencyKey !== undefined
        ? { sourceEventKey: `event:${eventKey}:${idempotencyKey}` }
        : {}),
    });

    if (!isDuplicate && executionStep) {
      await stepQueue.add("execute-step", { stepExecutionId: executionStep.id });
    }

    console.log(
      isDuplicate
        ? `external-event-trigger: duplicate ignored for eventKey "${eventKey}" – executionId: ${execution.id}`
        : `external-event-trigger: started execution for eventKey "${eventKey}" – stepExecutionId: ${executionStep?.id ?? "none"}`,
    );
  },
  {
    connection: redisConnection,
    concurrency: 20,
  },
);

eventTriggerWorker.on("failed", (job, err) => {
  console.error(`external-event-trigger job ${job?.id} failed:`, err);
});

eventTriggerWorker.on("error", (err) => {
  console.error("external-event-trigger worker error:", err);
});
