import { z } from "zod";

const flowStatusSchema = z.enum(["Draft", "Active", "Paused", "Archived"]);

export const flowStepSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.enum(["Trigger", "Action"]),
  integrationKey: z.string().min(1),
  operationKey: z.string().min(1).optional(),
  configPayload: z.unknown().optional(),
  inputMapping: z.unknown().optional(),
});

export const createFlowSchema = z
  .object({
    name: z.string().min(1),
    status: flowStatusSchema.optional(),
    eventKey: z.string().min(1).optional(),
    webhookKey: z.string().min(1).optional(),
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
    steps: z.array(flowStepSchema).min(1).optional(),
  })
  .refine(
    (value) =>
      value.name !== undefined ||
      value.status !== undefined ||
      value.eventKey !== undefined ||
      value.webhookKey !== undefined ||
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
