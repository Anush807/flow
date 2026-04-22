import { z } from "zod";
export declare const flowStepSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        Trigger: "Trigger";
        Action: "Action";
    }>;
    integrationKey: z.ZodString;
    operationKey: z.ZodOptional<z.ZodString>;
    configPayload: z.ZodOptional<z.ZodUnknown>;
    inputMapping: z.ZodOptional<z.ZodUnknown>;
}, z.core.$strip>;
export declare const createFlowSchema: z.ZodObject<{
    name: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        Draft: "Draft";
        Active: "Active";
        Paused: "Paused";
        Archived: "Archived";
    }>>;
    eventKey: z.ZodOptional<z.ZodString>;
    webhookKey: z.ZodOptional<z.ZodString>;
    steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodEnum<{
            Trigger: "Trigger";
            Action: "Action";
        }>;
        integrationKey: z.ZodString;
        operationKey: z.ZodOptional<z.ZodString>;
        configPayload: z.ZodOptional<z.ZodUnknown>;
        inputMapping: z.ZodOptional<z.ZodUnknown>;
    }, z.core.$strip>>>;
    nodeType: z.ZodOptional<z.ZodEnum<{
        Trigger: "Trigger";
        Action: "Action";
    }>>;
    configPayload: z.ZodOptional<z.ZodUnknown>;
}, z.core.$strip>;
export declare const updateFlowSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        Draft: "Draft";
        Active: "Active";
        Paused: "Paused";
        Archived: "Archived";
    }>>;
    eventKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    webhookKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodEnum<{
            Trigger: "Trigger";
            Action: "Action";
        }>;
        integrationKey: z.ZodString;
        operationKey: z.ZodOptional<z.ZodString>;
        configPayload: z.ZodOptional<z.ZodUnknown>;
        inputMapping: z.ZodOptional<z.ZodUnknown>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const triggerFlowSchema: z.ZodObject<{
    triggerPayload: z.ZodOptional<z.ZodUnknown>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const emitEventSchema: z.ZodObject<{
    payload: z.ZodOptional<z.ZodUnknown>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=index.d.ts.map