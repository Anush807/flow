import { prisma } from "../lib/prisma.js";
import { Queue } from "bullmq";

const stepQueue = new Queue("step-execution-worker", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
});

async function recoveryLoop() {
  console.log("Running recovery scan...");

  const pendingSteps = await prisma.flwExecutionSteps.findMany({
    where: {
      status: "Pending" ,
    },
    take: 50
  });

  if (pendingSteps.length === 0) {
    console.log("No stuck steps found");
    return;
  }

  console.log(`Found ${pendingSteps.length} pending steps`);

  for (const step of pendingSteps) {
    try {
      await stepQueue.add("execute-step", {
        stepExecutionId: step.id
      });

      console.log(`Requeued step ${step.id}`);

    } catch (err) {
      console.error("Failed to requeue step", step.id, err);
    }
  }
}

async function startRecovery() {
  console.log("Recovery service started");

  setInterval(async () => {
    try {
      await recoveryLoop();
    } catch (err) {
      console.error("Recovery error", err);
    }
  }, 15000); // every 15 seconds
}

startRecovery();