export declare function createExecutionForFlow(input: {
    flwId: string;
    triggerPayload?: unknown;
}): Promise<{
    execution: {
        triggerPayload: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        lockedBy: string | null;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        lockedAt: Date | null;
        triggeredAt: Date;
        startedAt: Date | null;
        finishedAt: Date | null;
        flwId: string;
    };
    executionStep: {
        error: string | null;
        id: string;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        startedAt: Date | null;
        finishedAt: Date | null;
        retryCount: number;
        outputPayload: import("@prisma/client/runtime/client").JsonValue | null;
        errorPayload: import("@prisma/client/runtime/client").JsonValue | null;
        idempotencyKey: string | null;
        nextRetryAt: Date | null;
        flwExecutionId: string;
        flwStepId: string;
    };
}>;
export declare function getExecutionHistoryForFlow(flwId: string): Promise<({
    FlwExecutionSteps: {
        error: string | null;
        id: string;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        startedAt: Date | null;
        finishedAt: Date | null;
        retryCount: number;
        outputPayload: import("@prisma/client/runtime/client").JsonValue | null;
        errorPayload: import("@prisma/client/runtime/client").JsonValue | null;
        idempotencyKey: string | null;
        nextRetryAt: Date | null;
        flwExecutionId: string;
        flwStepId: string;
    }[];
} & {
    triggerPayload: import("@prisma/client/runtime/client").JsonValue | null;
    id: string;
    lockedBy: string | null;
    status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
    lockedAt: Date | null;
    triggeredAt: Date;
    startedAt: Date | null;
    finishedAt: Date | null;
    flwId: string;
})[]>;
export declare function getExecutionById(executionId: string): Promise<({
    Flw: {
        name: string;
        isActive: boolean;
        id: string;
        createdAt: Date;
    };
    FlwExecutionSteps: {
        error: string | null;
        id: string;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        startedAt: Date | null;
        finishedAt: Date | null;
        retryCount: number;
        outputPayload: import("@prisma/client/runtime/client").JsonValue | null;
        errorPayload: import("@prisma/client/runtime/client").JsonValue | null;
        idempotencyKey: string | null;
        nextRetryAt: Date | null;
        flwExecutionId: string;
        flwStepId: string;
    }[];
} & {
    triggerPayload: import("@prisma/client/runtime/client").JsonValue | null;
    id: string;
    lockedBy: string | null;
    status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
    lockedAt: Date | null;
    triggeredAt: Date;
    startedAt: Date | null;
    finishedAt: Date | null;
    flwId: string;
}) | null>;
//# sourceMappingURL=execution-service.d.ts.map