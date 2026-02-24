import express from "express";
import { prisma } from "../lib/prisma.js";
import { combinedSchema } from "./validations/index.js";
import { stepQueue } from "./redis-queue.js"

const router = express.Router(); 

router.post("/create", async (req, res) => {
  console.log("Received request to create flow with body:", req.body);
  try {
    console.log("Validating request body against schema...");
    const { name, nodeType, configPayload } = combinedSchema.parse(req.body);
    console.log("Received request to create flow with data:", { name, nodeType, configPayload }); 
    const result = await prisma.$transaction(async (tx) => {
      const flw = await tx.flw.create({
        data: {
          name,
        },
      });
      console.log("Flow created with ID:", flw.id);
      const step = await tx.flwSteps.create({
        data: {
          flwId: flw.id,
          type: nodeType,
          configPayload,
          position: 1,
          integrationKey: "abcdefgh",
        },
      });

      return { flw, step };
    },{
      timeout: 5000, // Set a timeout of 5 seconds for the transaction
    });

    return res.status(201).json({
      message: "Flow created successfully",
      data: result,
    });

  } catch (error) {
    return res.status(400).json({
      message: "Failed to create flow",
      error: String(error),
    });
  }
});

router.post("/flows/:id/trigger", async (req, res) => {
  const flwId = String(req.params.id);
  if (!flwId) return res.json({ message: "flwId not provided" })

  try {
    const flow = await prisma.flw.findUnique({ where: { id: flwId } });
    if (!flow || !flow.isActive) {
      return res.json({ message: "Flow not active" });
    }

    const executionId = await prisma.flwExecutions.create({
      data: {
        flwId,
        status: "Pending"
      }
    });

    const firstStep = await prisma.flwSteps.findFirst({
      where: {
        flwId,
        position: 1
      }
    });

    if (!firstStep) {
      return res.json({ message: "Flow has no steps" });
    }

    const executionStep = await prisma.flwExecutionSteps.create({
      data: {
        flwExecutionId: executionId.id,
        status: "Pending",
        retryCount: 0,
        flwStepId: firstStep.id,
      }
    });

    await stepQueue.add("execute-step", {
      stepExecutionId: executionStep.id
    });

    res.json({ message: "jobs added successfully" });

  } catch (error) {
    return res.json({
      message: "Error while creating execution id",
      error
    });
  }
});
export default router;