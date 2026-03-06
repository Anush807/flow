import express from "express";
import { prisma } from "../lib/prisma.js";
import { combinedSchema } from "./validations/index.js";
import { stepQueue } from "./redis-queue.js"

const router = express.Router(); 

router.post("/create", async (req, res) => {
  console.log("Received request to create flow with body:", req.body);
  try {
    const { name, nodeType, configPayload } = combinedSchema.parse(req.body);

     const flw = await prisma.flw.create({
      data: { name },
    });
    const step = await prisma.flwSteps.create({
      data: {
        flwId: flw.id,
        type: nodeType,
        configPayload,
        position: 1,
        integrationKey: "abcdefgh",
      },
    });
      return res.status(201).json({
      message: "Flow created successfully",
      data: { flw, step },
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