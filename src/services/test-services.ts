import { prisma } from "../../lib/prisma.js";
import { executeIntegration } from "../integrations/registry.js";

type StepContext = {
  triggerPayload: unknown;
  previousSteps: Array<{
    stepId: string;
    outputPayload: unknown;
  }>;
};

function resolvePath(source: unknown, path: string[]): unknown {
  let current: unknown = source;
  for (const segment of path) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

function resolveTemplate(template: string, context: StepContext): string {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, rawToken: string) => {
    const token = rawToken.trim();
    if (token === "trigger") return JSON.stringify(context.triggerPayload ?? null);
    if (token.startsWith("trigger.")) {
      const value = resolvePath(
        context.triggerPayload,
        token.slice("trigger.".length).split("."),
      );
      return value === undefined ? "" : String(value);
    }
    if (token.startsWith("steps.")) {
      const [, stepId, ...path] = token.split(".");
      const matched = context.previousSteps.find((e) => e.stepId === stepId);
      const value = resolvePath(matched?.outputPayload, path);
      return value === undefined ? "" : String(value);
    }
    return "";
  });
}

function resolveInputMapping(value: unknown, context: StepContext): unknown {
  if (typeof value === "string") return resolveTemplate(value, context);
  if (Array.isArray(value)) return value.map((item) => resolveInputMapping(item, context));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        resolveInputMapping(v, context),
      ]),
    );
  }
  return value;
}

type StepResult = {
  stepId: string;
  name: string | null;
  type: string;
  integrationKey: string;
  operationKey: string | null;
  status: "skipped" | "success" | "failed";
  outputPayload: unknown;
  error: string | null;
  durationMs: number;
};

export async function testFlowExecution(
  flwId: string,
  triggerPayload: unknown,
): Promise<{
  flowId: string;
  flowName: string;
  totalSteps: number;
  executedSteps: number;
  status: "success" | "failed" | "partial";
  steps: StepResult[];
  durationMs: number;
}> {
  const flow = await prisma.flw.findUnique({
    where: { id: flwId },
    include: {
      FlwSteps: {
        orderBy: { position: "asc" },
        where: { parentStepId: null },
      },
    },
  });

  if (!flow) {
    throw new Error(`Flow not found: ${flwId}`);
  }

  const context: StepContext = {
    triggerPayload,
    previousSteps: [],
  };

  const stepResults: StepResult[] = [];
  const startTime = Date.now();
  let overallStatus: "success" | "failed" | "partial" = "success";

  for (const step of flow.FlwSteps) {
    const stepStart = Date.now();

    // skip trigger steps
    if (step.type === "Trigger") {
      stepResults.push({
        stepId: step.id,
        name: step.name,
        type: step.type,
        integrationKey: step.integrationKey,
        operationKey: step.operationKey,
        status: "skipped",
        outputPayload: { skipped: true, reason: "trigger_step" },
        error: null,
        durationMs: 0,
      });
      continue;
    }

    if (!step.operationKey) {
      stepResults.push({
        stepId: step.id,
        name: step.name,
        type: step.type,
        integrationKey: step.integrationKey,
        operationKey: step.operationKey,
        status: "failed",
        outputPayload: null,
        error: `Step is missing operationKey`,
        durationMs: Date.now() - stepStart,
      });
      overallStatus = "failed";
      break;
    }

    const rawInput = step.inputMapping ?? step.configPayload ?? {};
    const resolvedInput = resolveInputMapping(rawInput, context) as Record<string, unknown>;

    try {
      const result = await executeIntegration(
        step.integrationKey,
        step.operationKey,
        resolvedInput,
      );

      context.previousSteps.push({
        stepId: step.id,
        outputPayload: result.outputPayload,
      });

      stepResults.push({
        stepId: step.id,
        name: step.name,
        type: step.type,
        integrationKey: step.integrationKey,
        operationKey: step.operationKey,
        status: "success",
        outputPayload: result.outputPayload,
        error: null,
        durationMs: Date.now() - stepStart,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);

      stepResults.push({
        stepId: step.id,
        name: step.name,
        type: step.type,
        integrationKey: step.integrationKey,
        operationKey: step.operationKey,
        status: "failed",
        outputPayload: null,
        error: errorMessage,
        durationMs: Date.now() - stepStart,
      });

      overallStatus = stepResults.some((s) => s.status === "success") ? "partial" : "failed";
      break;
    }
  }

  return {
    flowId: flow.id,
    flowName: flow.name,
    totalSteps: flow.FlwSteps.length,
    executedSteps: stepResults.filter((s) => s.status !== "skipped").length,
    status: overallStatus,
    steps: stepResults,
    durationMs: Date.now() - startTime,
  };
}