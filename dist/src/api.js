import express from "express";
import { createFlowSchema, triggerFlowSchema, updateFlowSchema, } from "./validations/index.js";
import { stepQueue } from "./redis-queue.js";
import { createExecutionForFlow, getExecutionById, getExecutionHistoryForFlow, } from "./services/execution-service.js";
import { createFlowDefinition, getFlowDefinition, updateFlowDefinition, } from "./services/flow-service.js";
const router = express.Router();
async function createFlowHandler(req, res) {
    try {
        const payload = createFlowSchema.parse(req.body);
        const flow = await createFlowDefinition({
            name: payload.name,
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
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to create flow",
            error: String(error),
        });
    }
}
router.post("/", createFlowHandler);
router.post("/create", createFlowHandler);
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
    }
    catch (error) {
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
            ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
            ...(payload.steps ? { steps: payload.steps } : {}),
        });
        return res.json({
            message: "Flow updated successfully",
            data: flow,
        });
    }
    catch (error) {
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch executions",
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch execution",
            error: String(error),
        });
    }
});
async function triggerFlowHandler(req, res) {
    const flwId = String(req.params.id);
    try {
        const { triggerPayload } = triggerFlowSchema.parse(req.body ?? {});
        const payload = triggerPayload === undefined ? req.body : triggerPayload;
        const { execution, executionStep } = await createExecutionForFlow({
            flwId,
            triggerPayload: payload,
        });
        await stepQueue.add("execute-step", {
            stepExecutionId: executionStep.id,
        });
        return res.json({
            message: "Execution created successfully",
            data: {
                executionId: execution.id,
                firstStepExecutionId: executionStep.id,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error while triggering flow",
            error: String(error),
        });
    }
}
router.post("/:id/trigger", triggerFlowHandler);
router.post("/flows/:id/trigger", triggerFlowHandler);
export default router;
//# sourceMappingURL=api.js.map