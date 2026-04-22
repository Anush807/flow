export declare const FlwStepType: {
    readonly Trigger: "Trigger";
    readonly Action: "Action";
};
export type FlwStepType = (typeof FlwStepType)[keyof typeof FlwStepType];
export declare const FlwStatus: {
    readonly Draft: "Draft";
    readonly Active: "Active";
    readonly Paused: "Paused";
    readonly Archived: "Archived";
};
export type FlwStatus = (typeof FlwStatus)[keyof typeof FlwStatus];
export declare const FlwExecutionStatus: {
    readonly Pending: "Pending";
    readonly Success: "Success";
    readonly Failed: "Failed";
    readonly Running: "Running";
};
export type FlwExecutionStatus = (typeof FlwExecutionStatus)[keyof typeof FlwExecutionStatus];
//# sourceMappingURL=enums.d.ts.map