type FlowStepInput = {
    name?: string | undefined;
    type: "Trigger" | "Action";
    integrationKey: string;
    operationKey?: string | undefined;
    configPayload?: unknown;
    inputMapping?: unknown;
    conditions?: FlowConditionInput[] | undefined;
};
type FlowConditionInput = {
    sourceType: "Trigger" | "StepOutput";
    sourceStepPosition?: number | undefined;
    fieldPath: string;
    operator: "Equals" | "NotEquals" | "Contains" | "NotContains" | "GreaterThan" | "LessThan" | "Exists" | "NotExists";
    comparisonValue?: unknown;
    logicGate?: "And" | "Or" | undefined;
};
export declare function createFlowDefinition(input: {
    name: string;
    steps?: FlowStepInput[] | undefined;
    nodeType?: "Trigger" | "Action" | undefined;
    status?: "Draft" | "Active" | "Paused" | "Archived" | undefined;
    eventKey?: string | undefined;
    webhookKey?: string | undefined;
    conditions?: FlowConditionInput[] | undefined;
    configPayload?: unknown;
}): Promise<{
    FlwSteps: ({
        FlwConditions: {
            id: string;
            position: number;
            flwId: string;
            sourceType: import("../../generated/prisma/enums.js").FlwConditionSourceType;
            operator: import("../../generated/prisma/enums.js").FlwConditionOperator;
            fieldPath: string;
            comparisonValue: import("@prisma/client/runtime/client").JsonValue | null;
            logicGate: import("../../generated/prisma/enums.js").FlwConditionLogicGate;
            flwStepId: string | null;
            sourceStepId: string | null;
        }[];
    } & {
        id: string;
        name: string | null;
        position: number;
        type: import("../../generated/prisma/enums.js").FlwStepType;
        integrationKey: string;
        operationKey: string | null;
        configPayload: import("@prisma/client/runtime/client").JsonValue | null;
        inputMapping: import("@prisma/client/runtime/client").JsonValue | null;
        flwId: string;
    })[];
    FlwConditions: {
        id: string;
        position: number;
        flwId: string;
        sourceType: import("../../generated/prisma/enums.js").FlwConditionSourceType;
        operator: import("../../generated/prisma/enums.js").FlwConditionOperator;
        fieldPath: string;
        comparisonValue: import("@prisma/client/runtime/client").JsonValue | null;
        logicGate: import("../../generated/prisma/enums.js").FlwConditionLogicGate;
        flwStepId: string | null;
        sourceStepId: string | null;
    }[];
} & {
    id: string;
    name: string;
    eventKey: string | null;
    webhookKey: string | null;
    status: import("../../generated/prisma/enums.js").FlwStatus;
    createdAt: Date;
}>;
export declare function getFlowDefinition(flwId: string): Promise<({
    FlwSteps: ({
        FlwConditions: {
            id: string;
            position: number;
            flwId: string;
            sourceType: import("../../generated/prisma/enums.js").FlwConditionSourceType;
            operator: import("../../generated/prisma/enums.js").FlwConditionOperator;
            fieldPath: string;
            comparisonValue: import("@prisma/client/runtime/client").JsonValue | null;
            logicGate: import("../../generated/prisma/enums.js").FlwConditionLogicGate;
            flwStepId: string | null;
            sourceStepId: string | null;
        }[];
    } & {
        id: string;
        name: string | null;
        position: number;
        type: import("../../generated/prisma/enums.js").FlwStepType;
        integrationKey: string;
        operationKey: string | null;
        configPayload: import("@prisma/client/runtime/client").JsonValue | null;
        inputMapping: import("@prisma/client/runtime/client").JsonValue | null;
        flwId: string;
    })[];
    FlwConditions: {
        id: string;
        position: number;
        flwId: string;
        sourceType: import("../../generated/prisma/enums.js").FlwConditionSourceType;
        operator: import("../../generated/prisma/enums.js").FlwConditionOperator;
        fieldPath: string;
        comparisonValue: import("@prisma/client/runtime/client").JsonValue | null;
        logicGate: import("../../generated/prisma/enums.js").FlwConditionLogicGate;
        flwStepId: string | null;
        sourceStepId: string | null;
    }[];
    FlwExecutions: {
        id: string;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        flwId: string;
        triggerPayload: import("@prisma/client/runtime/client").JsonValue | null;
        idempotencyKey: string | null;
        lockedBy: string | null;
        lockedAt: Date | null;
        triggeredAt: Date;
        startedAt: Date | null;
        finishedAt: Date | null;
    }[];
} & {
    id: string;
    name: string;
    eventKey: string | null;
    webhookKey: string | null;
    status: import("../../generated/prisma/enums.js").FlwStatus;
    createdAt: Date;
}) | null>;
export declare function listFlowDefinitions(): Promise<({
    FlwSteps: ({
        FlwConditions: {
            id: string;
            position: number;
            flwId: string;
            sourceType: import("../../generated/prisma/enums.js").FlwConditionSourceType;
            operator: import("../../generated/prisma/enums.js").FlwConditionOperator;
            fieldPath: string;
            comparisonValue: import("@prisma/client/runtime/client").JsonValue | null;
            logicGate: import("../../generated/prisma/enums.js").FlwConditionLogicGate;
            flwStepId: string | null;
            sourceStepId: string | null;
        }[];
    } & {
        id: string;
        name: string | null;
        position: number;
        type: import("../../generated/prisma/enums.js").FlwStepType;
        integrationKey: string;
        operationKey: string | null;
        configPayload: import("@prisma/client/runtime/client").JsonValue | null;
        inputMapping: import("@prisma/client/runtime/client").JsonValue | null;
        flwId: string;
    })[];
    FlwConditions: {
        id: string;
        position: number;
        flwId: string;
        sourceType: import("../../generated/prisma/enums.js").FlwConditionSourceType;
        operator: import("../../generated/prisma/enums.js").FlwConditionOperator;
        fieldPath: string;
        comparisonValue: import("@prisma/client/runtime/client").JsonValue | null;
        logicGate: import("../../generated/prisma/enums.js").FlwConditionLogicGate;
        flwStepId: string | null;
        sourceStepId: string | null;
    }[];
    _count: {
        FlwExecutions: number;
    };
} & {
    id: string;
    name: string;
    eventKey: string | null;
    webhookKey: string | null;
    status: import("../../generated/prisma/enums.js").FlwStatus;
    createdAt: Date;
})[]>;
export declare function updateFlowDefinition(flwId: string, input: {
    name?: string | undefined;
    status?: "Draft" | "Active" | "Paused" | "Archived" | undefined;
    eventKey?: string | null | undefined;
    webhookKey?: string | null | undefined;
    conditions?: FlowConditionInput[] | undefined;
    steps?: FlowStepInput[] | undefined;
}): Promise<{
    FlwSteps: ({
        FlwConditions: {
            id: string;
            position: number;
            flwId: string;
            sourceType: import("../../generated/prisma/enums.js").FlwConditionSourceType;
            operator: import("../../generated/prisma/enums.js").FlwConditionOperator;
            fieldPath: string;
            comparisonValue: import("@prisma/client/runtime/client").JsonValue | null;
            logicGate: import("../../generated/prisma/enums.js").FlwConditionLogicGate;
            flwStepId: string | null;
            sourceStepId: string | null;
        }[];
    } & {
        id: string;
        name: string | null;
        position: number;
        type: import("../../generated/prisma/enums.js").FlwStepType;
        integrationKey: string;
        operationKey: string | null;
        configPayload: import("@prisma/client/runtime/client").JsonValue | null;
        inputMapping: import("@prisma/client/runtime/client").JsonValue | null;
        flwId: string;
    })[];
    FlwConditions: {
        id: string;
        position: number;
        flwId: string;
        sourceType: import("../../generated/prisma/enums.js").FlwConditionSourceType;
        operator: import("../../generated/prisma/enums.js").FlwConditionOperator;
        fieldPath: string;
        comparisonValue: import("@prisma/client/runtime/client").JsonValue | null;
        logicGate: import("../../generated/prisma/enums.js").FlwConditionLogicGate;
        flwStepId: string | null;
        sourceStepId: string | null;
    }[];
} & {
    id: string;
    name: string;
    eventKey: string | null;
    webhookKey: string | null;
    status: import("../../generated/prisma/enums.js").FlwStatus;
    createdAt: Date;
}>;
export {};
//# sourceMappingURL=flow-service.d.ts.map