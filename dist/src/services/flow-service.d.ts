type FlowStepInput = {
    name?: string | undefined;
    type: "Trigger" | "Action";
    integrationKey: string;
    operationKey?: string | undefined;
    configPayload?: unknown;
    inputMapping?: unknown;
};
export declare function createFlowDefinition(input: {
    name: string;
    steps?: FlowStepInput[] | undefined;
    nodeType?: "Trigger" | "Action" | undefined;
    configPayload?: unknown;
}): Promise<{
    FlwSteps: {
        type: import("../../generated/prisma/enums.js").FlwStepType;
        name: string | null;
        integrationKey: string;
        operationKey: string | null;
        configPayload: import("@prisma/client/runtime/client").JsonValue | null;
        inputMapping: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        flwId: string;
        position: number;
    }[];
} & {
    name: string;
    isActive: boolean;
    id: string;
    createdAt: Date;
}>;
export declare function getFlowDefinition(flwId: string): Promise<({
    FlwExecutions: {
        triggerPayload: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        lockedBy: string | null;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        lockedAt: Date | null;
        triggeredAt: Date;
        startedAt: Date | null;
        finishedAt: Date | null;
        flwId: string;
    }[];
    FlwSteps: {
        type: import("../../generated/prisma/enums.js").FlwStepType;
        name: string | null;
        integrationKey: string;
        operationKey: string | null;
        configPayload: import("@prisma/client/runtime/client").JsonValue | null;
        inputMapping: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        flwId: string;
        position: number;
    }[];
} & {
    name: string;
    isActive: boolean;
    id: string;
    createdAt: Date;
}) | null>;
export declare function updateFlowDefinition(flwId: string, input: {
    name?: string | undefined;
    isActive?: boolean | undefined;
    steps?: FlowStepInput[] | undefined;
}): Promise<{
    FlwSteps: {
        type: import("../../generated/prisma/enums.js").FlwStepType;
        name: string | null;
        integrationKey: string;
        operationKey: string | null;
        configPayload: import("@prisma/client/runtime/client").JsonValue | null;
        inputMapping: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        flwId: string;
        position: number;
    }[];
} & {
    name: string;
    isActive: boolean;
    id: string;
    createdAt: Date;
}>;
export {};
//# sourceMappingURL=flow-service.d.ts.map