import { z } from "zod";

const flowStatusSchema = z.enum(["Draft", "Active", "Paused", "Archived"]);
const conditionSourceTypeSchema = z.enum(["Trigger", "StepOutput"]);
const conditionOperatorSchema = z.enum([
  "Equals",
  "NotEquals",
  "Contains",
  "NotContains",
  "GreaterThan",
  "LessThan",
  "Exists",
  "NotExists",
]);
const conditionLogicGateSchema = z.enum(["And", "Or"]);

export const flowConditionSchema = z
  .object({
    sourceType: conditionSourceTypeSchema,
    sourceStepPosition: z.number().int().positive().optional(),
    fieldPath: z.string().min(1),
    operator: conditionOperatorSchema,
    comparisonValue: z.unknown().optional(),
    logicGate: conditionLogicGateSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.sourceType === "StepOutput" && value.sourceStepPosition === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "sourceStepPosition is required when sourceType is StepOutput",
      });
    }
  });

export const flowStepSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.enum(["Trigger", "Action"]),
  integrationKey: z.string().min(1),
  operationKey: z.string().min(1).optional(),
  configPayload: z.unknown().optional(),
  inputMapping: z.unknown().optional(),
  conditions: z.array(flowConditionSchema).optional(),
  branches: z
    .array(
      z.object({
        conditions: z.array(flowConditionSchema).optional(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        steps: z.array(z.lazy((): z.ZodTypeAny => flowStepSchema as any)).min(1),
      }),
    )
    .optional(),
});

export const createFlowSchema = z
  .object({
    name: z.string().min(1),
    status: flowStatusSchema.optional(),
    eventKey: z.string().min(1).optional(),
    webhookKey: z.string().min(1).optional(),
    conditions: z.array(flowConditionSchema).optional(),
    steps: z.array(flowStepSchema).min(1).optional(),
    nodeType: z.enum(["Trigger", "Action"]).optional(),
    configPayload: z.unknown().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.steps && !value.nodeType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide either steps or nodeType/configPayload",
      });
    }
  });

export const updateFlowSchema = z
  .object({
    name: z.string().min(1).optional(),
    status: flowStatusSchema.optional(),
    eventKey: z.string().min(1).nullable().optional(),
    webhookKey: z.string().min(1).nullable().optional(),
    conditions: z.array(flowConditionSchema).optional(),
    steps: z.array(flowStepSchema).min(1).optional(),
  })
  .refine(
    (value) =>
      value.name !== undefined ||
      value.status !== undefined ||
      value.eventKey !== undefined ||
      value.webhookKey !== undefined ||
      value.conditions !== undefined ||
      value.steps !== undefined,
    {
      message: "At least one field must be provided for update",
    },
  );

export const triggerFlowSchema = z.object({
  triggerPayload: z.unknown().optional(),
  idempotencyKey: z.string().min(1).optional(),
});

export const emitEventSchema = z.object({
  payload: z.unknown().optional(),
  idempotencyKey: z.string().min(1).optional(),
});

/**
 * Query pagination for list endpoints. `limit` is capped server-side so a
 * client cannot ask for an unbounded result set from a table that grows with
 * every execution.
 */
export const MAX_PAGE_SIZE = 100;

export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(25),
  offset: z.coerce.number().int().min(0).default(0),
});
