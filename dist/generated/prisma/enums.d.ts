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
export declare const FlwConditionSourceType: {
    readonly Trigger: "Trigger";
    readonly StepOutput: "StepOutput";
};
export type FlwConditionSourceType = (typeof FlwConditionSourceType)[keyof typeof FlwConditionSourceType];
export declare const FlwConditionOperator: {
    readonly Equals: "Equals";
    readonly NotEquals: "NotEquals";
    readonly Contains: "Contains";
    readonly NotContains: "NotContains";
    readonly GreaterThan: "GreaterThan";
    readonly LessThan: "LessThan";
    readonly Exists: "Exists";
    readonly NotExists: "NotExists";
};
export type FlwConditionOperator = (typeof FlwConditionOperator)[keyof typeof FlwConditionOperator];
export declare const FlwConditionLogicGate: {
    readonly And: "And";
    readonly Or: "Or";
};
export type FlwConditionLogicGate = (typeof FlwConditionLogicGate)[keyof typeof FlwConditionLogicGate];
//# sourceMappingURL=enums.d.ts.map