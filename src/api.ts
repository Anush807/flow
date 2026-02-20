import express from "express";
import { prisma } from "../lib/prisma.js";
import { combinedSchema } from "./validations/index.js";
import { stepQueue } from "./redis-queue.js"

const router = express.Router(); 

router.post("/createflw", async (req, res) => {
  try {
    const { name, nodeType, configPayload } = combinedSchema.parse(req.body);

    const result = await prisma.$transaction(async (tx) => {
      const flw = await tx.flw.create({
        data: {
          name,
        },
      });
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

        const result = await prisma.$transaction(async (tx) => {
            const flow = await tx.flw.findUnique({ where: { id: flwId } });
            if (!flow || !flow.isActive) {
                throw new Error("Flow not active");
            }
            const executionId = await tx.flwExecutions.create({
                data: {
                    flwId,
                    status: "Pending"
                }
            })
            const firstStep = await tx.flwSteps.findFirst({
                where: {
                    flwId,
                    position: 1
                }
            });
            if (!firstStep) {
                throw new Error("Flow has no steps");
            }
            const executionStep = await tx.flwExecutionSteps.create({
                data: {
                    flwExecutionId: executionId.id,
                    status: "Pending",
                    retryCount: 0,
                    flwStepId: firstStep.id,
                }
            })
            return { executionStep }
        })

        await stepQueue.add("execute-step", {
            stepExecutionId: result.executionStep.id
        })
        res.json({
            message: "jobs added successfully"
        })

    } catch (error) {
        return res.json({
            message: "Error while creating executiom id",
            error
        })
    }
})
export default router;