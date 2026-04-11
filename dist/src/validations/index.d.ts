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
    isActive: z.ZodOptional<z.ZodBoolean>;
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
}, z.core.$strip>;
//# sourceMappingURL=index.d.ts.map