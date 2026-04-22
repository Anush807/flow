export declare function createExecutionForFlow(input: {
    flwId: string;
    triggerPayload?: unknown;
    idempotencyKey?: string;
    sourceEventKey?: string;
}): Promise<{
    execution: {
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
    };
    executionStep: {
        error: string | null;
        id: string;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        idempotencyKey: string | null;
        flwExecutionId: string;
        startedAt: Date | null;
        finishedAt: Date | null;
        flwStepId: string;
        retryCount: number;
        outputPayload: import("@prisma/client/runtime/client").JsonValue | null;
        errorPayload: import("@prisma/client/runtime/client").JsonValue | null;
        nextRetryAt: Date | null;
    } | null;
    isDuplicate: boolean;
}>;
export declare function getExecutionHistoryForFlow(flwId: string): Promise<({
    FlwExecutionSteps: {
        error: string | null;
        id: string;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        idempotencyKey: string | null;
        flwExecutionId: string;
        startedAt: Date | null;
        finishedAt: Date | null;
        flwStepId: string;
        retryCount: number;
        outputPayload: import("@prisma/client/runtime/client").JsonValue | null;
        errorPayload: import("@prisma/client/runtime/client").JsonValue | null;
        nextRetryAt: Date | null;
    }[];
} & {
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
})[]>;
export declare function getExecutionById(executionId: string): Promise<({
    FlwExecutionSteps: {
        error: string | null;
        id: string;
        status: import("../../generated/prisma/enums.js").FlwExecutionStatus;
        idempotencyKey: string | null;
        flwExecutionId: string;
        startedAt: Date | null;
        finishedAt: Date | null;
        flwStepId: string;
        retryCount: number;
        outputPayload: import("@prisma/client/runtime/client").JsonValue | null;
        errorPayload: import("@prisma/client/runtime/client").JsonValue | null;
        nextRetryAt: Date | null;
    }[];
    Flw: {
        id: string;
        name: string;
        eventKey: string | null;
        webhookKey: string | null;
        status: import("../../generated/prisma/enums.js").FlwStatus;
        createdAt: Date;
    };
} & {
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
}) | null>;
export declare function getExecutionSummary(): Promise<{
    totalExecutions: number;
    runningExecutions: number;
    failedExecutions: number;
    successfulExecutions: number;
}>;
//# sourceMappingURL=execution-service.d.ts.map