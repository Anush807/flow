import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model FlwExecutionSteps
 *
 */
export type FlwExecutionStepsModel = runtime.Types.Result.DefaultSelection<Prisma.$FlwExecutionStepsPayload>;
export type AggregateFlwExecutionSteps = {
    _count: FlwExecutionStepsCountAggregateOutputType | null;
    _avg: FlwExecutionStepsAvgAggregateOutputType | null;
    _sum: FlwExecutionStepsSumAggregateOutputType | null;
    _min: FlwExecutionStepsMinAggregateOutputType | null;
    _max: FlwExecutionStepsMaxAggregateOutputType | null;
};
export type FlwExecutionStepsAvgAggregateOutputType = {
    retryCount: number | null;
};
export type FlwExecutionStepsSumAggregateOutputType = {
    retryCount: number | null;
};
export type FlwExecutionStepsMinAggregateOutputType = {
    id: string | null;
    flwExecutionId: string | null;
    flwStepId: string | null;
    status: $Enums.FlwExecutionStatus | null;
    retryCount: number | null;
    error: string | null;
    idempotencyKey: string | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    nextRetryAt: Date | null;
};
export type FlwExecutionStepsMaxAggregateOutputType = {
    id: string | null;
    flwExecutionId: string | null;
    flwStepId: string | null;
    status: $Enums.FlwExecutionStatus | null;
    retryCount: number | null;
    error: string | null;
    idempotencyKey: string | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    nextRetryAt: Date | null;
};
export type FlwExecutionStepsCountAggregateOutputType = {
    id: number;
    flwExecutionId: number;
    flwStepId: number;
    status: number;
    retryCount: number;
    error: number;
    outputPayload: number;
    errorPayload: number;
    idempotencyKey: number;
    startedAt: number;
    finishedAt: number;
    nextRetryAt: number;
    _all: number;
};
export type FlwExecutionStepsAvgAggregateInputType = {
    retryCount?: true;
};
export type FlwExecutionStepsSumAggregateInputType = {
    retryCount?: true;
};
export type FlwExecutionStepsMinAggregateInputType = {
    id?: true;
    flwExecutionId?: true;
    flwStepId?: true;
    status?: true;
    retryCount?: true;
    error?: true;
    idempotencyKey?: true;
    startedAt?: true;
    finishedAt?: true;
    nextRetryAt?: true;
};
export type FlwExecutionStepsMaxAggregateInputType = {
    id?: true;
    flwExecutionId?: true;
    flwStepId?: true;
    status?: true;
    retryCount?: true;
    error?: true;
    idempotencyKey?: true;
    startedAt?: true;
    finishedAt?: true;
    nextRetryAt?: true;
};
export type FlwExecutionStepsCountAggregateInputType = {
    id?: true;
    flwExecutionId?: true;
    flwStepId?: true;
    status?: true;
    retryCount?: true;
    error?: true;
    outputPayload?: true;
    errorPayload?: true;
    idempotencyKey?: true;
    startedAt?: true;
    finishedAt?: true;
    nextRetryAt?: true;
    _all?: true;
};
export type FlwExecutionStepsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FlwExecutionSteps to aggregate.
     */
    where?: Prisma.FlwExecutionStepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwExecutionSteps to fetch.
     */
    orderBy?: Prisma.FlwExecutionStepsOrderByWithRelationInput | Prisma.FlwExecutionStepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FlwExecutionStepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwExecutionSteps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwExecutionSteps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FlwExecutionSteps
    **/
    _count?: true | FlwExecutionStepsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FlwExecutionStepsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FlwExecutionStepsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FlwExecutionStepsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FlwExecutionStepsMaxAggregateInputType;
};
export type GetFlwExecutionStepsAggregateType<T extends FlwExecutionStepsAggregateArgs> = {
    [P in keyof T & keyof AggregateFlwExecutionSteps]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFlwExecutionSteps[P]> : Prisma.GetScalarType<T[P], AggregateFlwExecutionSteps[P]>;
};
export type FlwExecutionStepsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwExecutionStepsWhereInput;
    orderBy?: Prisma.FlwExecutionStepsOrderByWithAggregationInput | Prisma.FlwExecutionStepsOrderByWithAggregationInput[];
    by: Prisma.FlwExecutionStepsScalarFieldEnum[] | Prisma.FlwExecutionStepsScalarFieldEnum;
    having?: Prisma.FlwExecutionStepsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FlwExecutionStepsCountAggregateInputType | true;
    _avg?: FlwExecutionStepsAvgAggregateInputType;
    _sum?: FlwExecutionStepsSumAggregateInputType;
    _min?: FlwExecutionStepsMinAggregateInputType;
    _max?: FlwExecutionStepsMaxAggregateInputType;
};
export type FlwExecutionStepsGroupByOutputType = {
    id: string;
    flwExecutionId: string;
    flwStepId: string;
    status: $Enums.FlwExecutionStatus;
    retryCount: number;
    error: string | null;
    outputPayload: runtime.JsonValue | null;
    errorPayload: runtime.JsonValue | null;
    idempotencyKey: string | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    nextRetryAt: Date | null;
    _count: FlwExecutionStepsCountAggregateOutputType | null;
    _avg: FlwExecutionStepsAvgAggregateOutputType | null;
    _sum: FlwExecutionStepsSumAggregateOutputType | null;
    _min: FlwExecutionStepsMinAggregateOutputType | null;
    _max: FlwExecutionStepsMaxAggregateOutputType | null;
};
type GetFlwExecutionStepsGroupByPayload<T extends FlwExecutionStepsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FlwExecutionStepsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FlwExecutionStepsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FlwExecutionStepsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FlwExecutionStepsGroupByOutputType[P]>;
}>>;
export type FlwExecutionStepsWhereInput = {
    AND?: Prisma.FlwExecutionStepsWhereInput | Prisma.FlwExecutionStepsWhereInput[];
    OR?: Prisma.FlwExecutionStepsWhereInput[];
    NOT?: Prisma.FlwExecutionStepsWhereInput | Prisma.FlwExecutionStepsWhereInput[];
    id?: Prisma.StringFilter<"FlwExecutionSteps"> | string;
    flwExecutionId?: Prisma.StringFilter<"FlwExecutionSteps"> | string;
    flwStepId?: Prisma.StringFilter<"FlwExecutionSteps"> | string;
    status?: Prisma.EnumFlwExecutionStatusFilter<"FlwExecutionSteps"> | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFilter<"FlwExecutionSteps"> | number;
    error?: Prisma.StringNullableFilter<"FlwExecutionSteps"> | string | null;
    outputPayload?: Prisma.JsonNullableFilter<"FlwExecutionSteps">;
    errorPayload?: Prisma.JsonNullableFilter<"FlwExecutionSteps">;
    idempotencyKey?: Prisma.StringNullableFilter<"FlwExecutionSteps"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
    nextRetryAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
    FlwExecutions?: Prisma.XOR<Prisma.FlwExecutionsScalarRelationFilter, Prisma.FlwExecutionsWhereInput>;
    FlwSteps?: Prisma.XOR<Prisma.FlwStepsScalarRelationFilter, Prisma.FlwStepsWhereInput>;
};
export type FlwExecutionStepsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    flwExecutionId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    outputPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextRetryAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    FlwExecutions?: Prisma.FlwExecutionsOrderByWithRelationInput;
    FlwSteps?: Prisma.FlwStepsOrderByWithRelationInput;
};
export type FlwExecutionStepsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FlwExecutionStepsWhereInput | Prisma.FlwExecutionStepsWhereInput[];
    OR?: Prisma.FlwExecutionStepsWhereInput[];
    NOT?: Prisma.FlwExecutionStepsWhereInput | Prisma.FlwExecutionStepsWhereInput[];
    flwExecutionId?: Prisma.StringFilter<"FlwExecutionSteps"> | string;
    flwStepId?: Prisma.StringFilter<"FlwExecutionSteps"> | string;
    status?: Prisma.EnumFlwExecutionStatusFilter<"FlwExecutionSteps"> | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFilter<"FlwExecutionSteps"> | number;
    error?: Prisma.StringNullableFilter<"FlwExecutionSteps"> | string | null;
    outputPayload?: Prisma.JsonNullableFilter<"FlwExecutionSteps">;
    errorPayload?: Prisma.JsonNullableFilter<"FlwExecutionSteps">;
    idempotencyKey?: Prisma.StringNullableFilter<"FlwExecutionSteps"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
    nextRetryAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
    FlwExecutions?: Prisma.XOR<Prisma.FlwExecutionsScalarRelationFilter, Prisma.FlwExecutionsWhereInput>;
    FlwSteps?: Prisma.XOR<Prisma.FlwStepsScalarRelationFilter, Prisma.FlwStepsWhereInput>;
}, "id">;
export type FlwExecutionStepsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    flwExecutionId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    outputPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextRetryAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.FlwExecutionStepsCountOrderByAggregateInput;
    _avg?: Prisma.FlwExecutionStepsAvgOrderByAggregateInput;
    _max?: Prisma.FlwExecutionStepsMaxOrderByAggregateInput;
    _min?: Prisma.FlwExecutionStepsMinOrderByAggregateInput;
    _sum?: Prisma.FlwExecutionStepsSumOrderByAggregateInput;
};
export type FlwExecutionStepsScalarWhereWithAggregatesInput = {
    AND?: Prisma.FlwExecutionStepsScalarWhereWithAggregatesInput | Prisma.FlwExecutionStepsScalarWhereWithAggregatesInput[];
    OR?: Prisma.FlwExecutionStepsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FlwExecutionStepsScalarWhereWithAggregatesInput | Prisma.FlwExecutionStepsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FlwExecutionSteps"> | string;
    flwExecutionId?: Prisma.StringWithAggregatesFilter<"FlwExecutionSteps"> | string;
    flwStepId?: Prisma.StringWithAggregatesFilter<"FlwExecutionSteps"> | string;
    status?: Prisma.EnumFlwExecutionStatusWithAggregatesFilter<"FlwExecutionSteps"> | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntWithAggregatesFilter<"FlwExecutionSteps"> | number;
    error?: Prisma.StringNullableWithAggregatesFilter<"FlwExecutionSteps"> | string | null;
    outputPayload?: Prisma.JsonNullableWithAggregatesFilter<"FlwExecutionSteps">;
    errorPayload?: Prisma.JsonNullableWithAggregatesFilter<"FlwExecutionSteps">;
    idempotencyKey?: Prisma.StringNullableWithAggregatesFilter<"FlwExecutionSteps"> | string | null;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FlwExecutionSteps"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FlwExecutionSteps"> | Date | string | null;
    nextRetryAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FlwExecutionSteps"> | Date | string | null;
};
export type FlwExecutionStepsCreateInput = {
    id?: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
    FlwExecutions: Prisma.FlwExecutionsCreateNestedOneWithoutFlwExecutionStepsInput;
    FlwSteps: Prisma.FlwStepsCreateNestedOneWithoutFlwExecutionStepsInput;
};
export type FlwExecutionStepsUncheckedCreateInput = {
    id?: string;
    flwExecutionId: string;
    flwStepId: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
};
export type FlwExecutionStepsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    FlwExecutions?: Prisma.FlwExecutionsUpdateOneRequiredWithoutFlwExecutionStepsNestedInput;
    FlwSteps?: Prisma.FlwStepsUpdateOneRequiredWithoutFlwExecutionStepsNestedInput;
};
export type FlwExecutionStepsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwExecutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    flwStepId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionStepsCreateManyInput = {
    id?: string;
    flwExecutionId: string;
    flwStepId: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
};
export type FlwExecutionStepsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionStepsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwExecutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    flwStepId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionStepsListRelationFilter = {
    every?: Prisma.FlwExecutionStepsWhereInput;
    some?: Prisma.FlwExecutionStepsWhereInput;
    none?: Prisma.FlwExecutionStepsWhereInput;
};
export type FlwExecutionStepsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FlwExecutionStepsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwExecutionId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    outputPayload?: Prisma.SortOrder;
    errorPayload?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    nextRetryAt?: Prisma.SortOrder;
};
export type FlwExecutionStepsAvgOrderByAggregateInput = {
    retryCount?: Prisma.SortOrder;
};
export type FlwExecutionStepsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwExecutionId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    nextRetryAt?: Prisma.SortOrder;
};
export type FlwExecutionStepsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwExecutionId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    nextRetryAt?: Prisma.SortOrder;
};
export type FlwExecutionStepsSumOrderByAggregateInput = {
    retryCount?: Prisma.SortOrder;
};
export type FlwExecutionStepsCreateNestedManyWithoutFlwStepsInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput> | Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput[] | Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput[];
    connectOrCreate?: Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput | Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput[];
    createMany?: Prisma.FlwExecutionStepsCreateManyFlwStepsInputEnvelope;
    connect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
};
export type FlwExecutionStepsUncheckedCreateNestedManyWithoutFlwStepsInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput> | Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput[] | Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput[];
    connectOrCreate?: Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput | Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput[];
    createMany?: Prisma.FlwExecutionStepsCreateManyFlwStepsInputEnvelope;
    connect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
};
export type FlwExecutionStepsUpdateManyWithoutFlwStepsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput> | Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput[] | Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput[];
    connectOrCreate?: Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput | Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput[];
    upsert?: Prisma.FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwStepsInput | Prisma.FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwStepsInput[];
    createMany?: Prisma.FlwExecutionStepsCreateManyFlwStepsInputEnvelope;
    set?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    disconnect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    delete?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    connect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    update?: Prisma.FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwStepsInput | Prisma.FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwStepsInput[];
    updateMany?: Prisma.FlwExecutionStepsUpdateManyWithWhereWithoutFlwStepsInput | Prisma.FlwExecutionStepsUpdateManyWithWhereWithoutFlwStepsInput[];
    deleteMany?: Prisma.FlwExecutionStepsScalarWhereInput | Prisma.FlwExecutionStepsScalarWhereInput[];
};
export type FlwExecutionStepsUncheckedUpdateManyWithoutFlwStepsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput> | Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput[] | Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput[];
    connectOrCreate?: Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput | Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput[];
    upsert?: Prisma.FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwStepsInput | Prisma.FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwStepsInput[];
    createMany?: Prisma.FlwExecutionStepsCreateManyFlwStepsInputEnvelope;
    set?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    disconnect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    delete?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    connect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    update?: Prisma.FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwStepsInput | Prisma.FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwStepsInput[];
    updateMany?: Prisma.FlwExecutionStepsUpdateManyWithWhereWithoutFlwStepsInput | Prisma.FlwExecutionStepsUpdateManyWithWhereWithoutFlwStepsInput[];
    deleteMany?: Prisma.FlwExecutionStepsScalarWhereInput | Prisma.FlwExecutionStepsScalarWhereInput[];
};
export type FlwExecutionStepsCreateNestedManyWithoutFlwExecutionsInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput> | Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput[] | Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput[];
    connectOrCreate?: Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput[];
    createMany?: Prisma.FlwExecutionStepsCreateManyFlwExecutionsInputEnvelope;
    connect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
};
export type FlwExecutionStepsUncheckedCreateNestedManyWithoutFlwExecutionsInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput> | Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput[] | Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput[];
    connectOrCreate?: Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput[];
    createMany?: Prisma.FlwExecutionStepsCreateManyFlwExecutionsInputEnvelope;
    connect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
};
export type FlwExecutionStepsUpdateManyWithoutFlwExecutionsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput> | Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput[] | Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput[];
    connectOrCreate?: Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput[];
    upsert?: Prisma.FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwExecutionsInput[];
    createMany?: Prisma.FlwExecutionStepsCreateManyFlwExecutionsInputEnvelope;
    set?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    disconnect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    delete?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    connect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    update?: Prisma.FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwExecutionsInput[];
    updateMany?: Prisma.FlwExecutionStepsUpdateManyWithWhereWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsUpdateManyWithWhereWithoutFlwExecutionsInput[];
    deleteMany?: Prisma.FlwExecutionStepsScalarWhereInput | Prisma.FlwExecutionStepsScalarWhereInput[];
};
export type FlwExecutionStepsUncheckedUpdateManyWithoutFlwExecutionsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput> | Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput[] | Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput[];
    connectOrCreate?: Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput[];
    upsert?: Prisma.FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwExecutionsInput[];
    createMany?: Prisma.FlwExecutionStepsCreateManyFlwExecutionsInputEnvelope;
    set?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    disconnect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    delete?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    connect?: Prisma.FlwExecutionStepsWhereUniqueInput | Prisma.FlwExecutionStepsWhereUniqueInput[];
    update?: Prisma.FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwExecutionsInput[];
    updateMany?: Prisma.FlwExecutionStepsUpdateManyWithWhereWithoutFlwExecutionsInput | Prisma.FlwExecutionStepsUpdateManyWithWhereWithoutFlwExecutionsInput[];
    deleteMany?: Prisma.FlwExecutionStepsScalarWhereInput | Prisma.FlwExecutionStepsScalarWhereInput[];
};
export type FlwExecutionStepsCreateWithoutFlwStepsInput = {
    id?: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
    FlwExecutions: Prisma.FlwExecutionsCreateNestedOneWithoutFlwExecutionStepsInput;
};
export type FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput = {
    id?: string;
    flwExecutionId: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
};
export type FlwExecutionStepsCreateOrConnectWithoutFlwStepsInput = {
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput>;
};
export type FlwExecutionStepsCreateManyFlwStepsInputEnvelope = {
    data: Prisma.FlwExecutionStepsCreateManyFlwStepsInput | Prisma.FlwExecutionStepsCreateManyFlwStepsInput[];
    skipDuplicates?: boolean;
};
export type FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwStepsInput = {
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
    update: Prisma.XOR<Prisma.FlwExecutionStepsUpdateWithoutFlwStepsInput, Prisma.FlwExecutionStepsUncheckedUpdateWithoutFlwStepsInput>;
    create: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwStepsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwStepsInput>;
};
export type FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwStepsInput = {
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
    data: Prisma.XOR<Prisma.FlwExecutionStepsUpdateWithoutFlwStepsInput, Prisma.FlwExecutionStepsUncheckedUpdateWithoutFlwStepsInput>;
};
export type FlwExecutionStepsUpdateManyWithWhereWithoutFlwStepsInput = {
    where: Prisma.FlwExecutionStepsScalarWhereInput;
    data: Prisma.XOR<Prisma.FlwExecutionStepsUpdateManyMutationInput, Prisma.FlwExecutionStepsUncheckedUpdateManyWithoutFlwStepsInput>;
};
export type FlwExecutionStepsScalarWhereInput = {
    AND?: Prisma.FlwExecutionStepsScalarWhereInput | Prisma.FlwExecutionStepsScalarWhereInput[];
    OR?: Prisma.FlwExecutionStepsScalarWhereInput[];
    NOT?: Prisma.FlwExecutionStepsScalarWhereInput | Prisma.FlwExecutionStepsScalarWhereInput[];
    id?: Prisma.StringFilter<"FlwExecutionSteps"> | string;
    flwExecutionId?: Prisma.StringFilter<"FlwExecutionSteps"> | string;
    flwStepId?: Prisma.StringFilter<"FlwExecutionSteps"> | string;
    status?: Prisma.EnumFlwExecutionStatusFilter<"FlwExecutionSteps"> | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFilter<"FlwExecutionSteps"> | number;
    error?: Prisma.StringNullableFilter<"FlwExecutionSteps"> | string | null;
    outputPayload?: Prisma.JsonNullableFilter<"FlwExecutionSteps">;
    errorPayload?: Prisma.JsonNullableFilter<"FlwExecutionSteps">;
    idempotencyKey?: Prisma.StringNullableFilter<"FlwExecutionSteps"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
    nextRetryAt?: Prisma.DateTimeNullableFilter<"FlwExecutionSteps"> | Date | string | null;
};
export type FlwExecutionStepsCreateWithoutFlwExecutionsInput = {
    id?: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
    FlwSteps: Prisma.FlwStepsCreateNestedOneWithoutFlwExecutionStepsInput;
};
export type FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput = {
    id?: string;
    flwStepId: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
};
export type FlwExecutionStepsCreateOrConnectWithoutFlwExecutionsInput = {
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput>;
};
export type FlwExecutionStepsCreateManyFlwExecutionsInputEnvelope = {
    data: Prisma.FlwExecutionStepsCreateManyFlwExecutionsInput | Prisma.FlwExecutionStepsCreateManyFlwExecutionsInput[];
    skipDuplicates?: boolean;
};
export type FlwExecutionStepsUpsertWithWhereUniqueWithoutFlwExecutionsInput = {
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
    update: Prisma.XOR<Prisma.FlwExecutionStepsUpdateWithoutFlwExecutionsInput, Prisma.FlwExecutionStepsUncheckedUpdateWithoutFlwExecutionsInput>;
    create: Prisma.XOR<Prisma.FlwExecutionStepsCreateWithoutFlwExecutionsInput, Prisma.FlwExecutionStepsUncheckedCreateWithoutFlwExecutionsInput>;
};
export type FlwExecutionStepsUpdateWithWhereUniqueWithoutFlwExecutionsInput = {
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
    data: Prisma.XOR<Prisma.FlwExecutionStepsUpdateWithoutFlwExecutionsInput, Prisma.FlwExecutionStepsUncheckedUpdateWithoutFlwExecutionsInput>;
};
export type FlwExecutionStepsUpdateManyWithWhereWithoutFlwExecutionsInput = {
    where: Prisma.FlwExecutionStepsScalarWhereInput;
    data: Prisma.XOR<Prisma.FlwExecutionStepsUpdateManyMutationInput, Prisma.FlwExecutionStepsUncheckedUpdateManyWithoutFlwExecutionsInput>;
};
export type FlwExecutionStepsCreateManyFlwStepsInput = {
    id?: string;
    flwExecutionId: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
};
export type FlwExecutionStepsUpdateWithoutFlwStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    FlwExecutions?: Prisma.FlwExecutionsUpdateOneRequiredWithoutFlwExecutionStepsNestedInput;
};
export type FlwExecutionStepsUncheckedUpdateWithoutFlwStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwExecutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionStepsUncheckedUpdateManyWithoutFlwStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwExecutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionStepsCreateManyFlwExecutionsInput = {
    id?: string;
    flwStepId: string;
    status: $Enums.FlwExecutionStatus;
    retryCount?: number;
    error?: string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: string | null;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    nextRetryAt?: Date | string | null;
};
export type FlwExecutionStepsUpdateWithoutFlwExecutionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    FlwSteps?: Prisma.FlwStepsUpdateOneRequiredWithoutFlwExecutionStepsNestedInput;
};
export type FlwExecutionStepsUncheckedUpdateWithoutFlwExecutionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwStepId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionStepsUncheckedUpdateManyWithoutFlwExecutionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwStepId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextRetryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionStepsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwExecutionId?: boolean;
    flwStepId?: boolean;
    status?: boolean;
    retryCount?: boolean;
    error?: boolean;
    outputPayload?: boolean;
    errorPayload?: boolean;
    idempotencyKey?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    nextRetryAt?: boolean;
    FlwExecutions?: boolean | Prisma.FlwExecutionsDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwStepsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwExecutionSteps"]>;
export type FlwExecutionStepsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwExecutionId?: boolean;
    flwStepId?: boolean;
    status?: boolean;
    retryCount?: boolean;
    error?: boolean;
    outputPayload?: boolean;
    errorPayload?: boolean;
    idempotencyKey?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    nextRetryAt?: boolean;
    FlwExecutions?: boolean | Prisma.FlwExecutionsDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwStepsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwExecutionSteps"]>;
export type FlwExecutionStepsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwExecutionId?: boolean;
    flwStepId?: boolean;
    status?: boolean;
    retryCount?: boolean;
    error?: boolean;
    outputPayload?: boolean;
    errorPayload?: boolean;
    idempotencyKey?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    nextRetryAt?: boolean;
    FlwExecutions?: boolean | Prisma.FlwExecutionsDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwStepsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwExecutionSteps"]>;
export type FlwExecutionStepsSelectScalar = {
    id?: boolean;
    flwExecutionId?: boolean;
    flwStepId?: boolean;
    status?: boolean;
    retryCount?: boolean;
    error?: boolean;
    outputPayload?: boolean;
    errorPayload?: boolean;
    idempotencyKey?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    nextRetryAt?: boolean;
};
export type FlwExecutionStepsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "flwExecutionId" | "flwStepId" | "status" | "retryCount" | "error" | "outputPayload" | "errorPayload" | "idempotencyKey" | "startedAt" | "finishedAt" | "nextRetryAt", ExtArgs["result"]["flwExecutionSteps"]>;
export type FlwExecutionStepsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    FlwExecutions?: boolean | Prisma.FlwExecutionsDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwStepsDefaultArgs<ExtArgs>;
};
export type FlwExecutionStepsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    FlwExecutions?: boolean | Prisma.FlwExecutionsDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwStepsDefaultArgs<ExtArgs>;
};
export type FlwExecutionStepsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    FlwExecutions?: boolean | Prisma.FlwExecutionsDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwStepsDefaultArgs<ExtArgs>;
};
export type $FlwExecutionStepsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FlwExecutionSteps";
    objects: {
        FlwExecutions: Prisma.$FlwExecutionsPayload<ExtArgs>;
        FlwSteps: Prisma.$FlwStepsPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        flwExecutionId: string;
        flwStepId: string;
        status: $Enums.FlwExecutionStatus;
        retryCount: number;
        error: string | null;
        outputPayload: runtime.JsonValue | null;
        errorPayload: runtime.JsonValue | null;
        idempotencyKey: string | null;
        startedAt: Date | null;
        finishedAt: Date | null;
        nextRetryAt: Date | null;
    }, ExtArgs["result"]["flwExecutionSteps"]>;
    composites: {};
};
export type FlwExecutionStepsGetPayload<S extends boolean | null | undefined | FlwExecutionStepsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload, S>;
export type FlwExecutionStepsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FlwExecutionStepsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FlwExecutionStepsCountAggregateInputType | true;
};
export interface FlwExecutionStepsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FlwExecutionSteps'];
        meta: {
            name: 'FlwExecutionSteps';
        };
    };
    /**
     * Find zero or one FlwExecutionSteps that matches the filter.
     * @param {FlwExecutionStepsFindUniqueArgs} args - Arguments to find a FlwExecutionSteps
     * @example
     * // Get one FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlwExecutionStepsFindUniqueArgs>(args: Prisma.SelectSubset<T, FlwExecutionStepsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FlwExecutionSteps that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlwExecutionStepsFindUniqueOrThrowArgs} args - Arguments to find a FlwExecutionSteps
     * @example
     * // Get one FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlwExecutionStepsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FlwExecutionStepsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlwExecutionSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionStepsFindFirstArgs} args - Arguments to find a FlwExecutionSteps
     * @example
     * // Get one FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlwExecutionStepsFindFirstArgs>(args?: Prisma.SelectSubset<T, FlwExecutionStepsFindFirstArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlwExecutionSteps that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionStepsFindFirstOrThrowArgs} args - Arguments to find a FlwExecutionSteps
     * @example
     * // Get one FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlwExecutionStepsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FlwExecutionStepsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FlwExecutionSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionStepsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.findMany()
     *
     * // Get first 10 FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const flwExecutionStepsWithIdOnly = await prisma.flwExecutionSteps.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FlwExecutionStepsFindManyArgs>(args?: Prisma.SelectSubset<T, FlwExecutionStepsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FlwExecutionSteps.
     * @param {FlwExecutionStepsCreateArgs} args - Arguments to create a FlwExecutionSteps.
     * @example
     * // Create one FlwExecutionSteps
     * const FlwExecutionSteps = await prisma.flwExecutionSteps.create({
     *   data: {
     *     // ... data to create a FlwExecutionSteps
     *   }
     * })
     *
     */
    create<T extends FlwExecutionStepsCreateArgs>(args: Prisma.SelectSubset<T, FlwExecutionStepsCreateArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FlwExecutionSteps.
     * @param {FlwExecutionStepsCreateManyArgs} args - Arguments to create many FlwExecutionSteps.
     * @example
     * // Create many FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FlwExecutionStepsCreateManyArgs>(args?: Prisma.SelectSubset<T, FlwExecutionStepsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FlwExecutionSteps and returns the data saved in the database.
     * @param {FlwExecutionStepsCreateManyAndReturnArgs} args - Arguments to create many FlwExecutionSteps.
     * @example
     * // Create many FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FlwExecutionSteps and only return the `id`
     * const flwExecutionStepsWithIdOnly = await prisma.flwExecutionSteps.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FlwExecutionStepsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FlwExecutionStepsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FlwExecutionSteps.
     * @param {FlwExecutionStepsDeleteArgs} args - Arguments to delete one FlwExecutionSteps.
     * @example
     * // Delete one FlwExecutionSteps
     * const FlwExecutionSteps = await prisma.flwExecutionSteps.delete({
     *   where: {
     *     // ... filter to delete one FlwExecutionSteps
     *   }
     * })
     *
     */
    delete<T extends FlwExecutionStepsDeleteArgs>(args: Prisma.SelectSubset<T, FlwExecutionStepsDeleteArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FlwExecutionSteps.
     * @param {FlwExecutionStepsUpdateArgs} args - Arguments to update one FlwExecutionSteps.
     * @example
     * // Update one FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FlwExecutionStepsUpdateArgs>(args: Prisma.SelectSubset<T, FlwExecutionStepsUpdateArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FlwExecutionSteps.
     * @param {FlwExecutionStepsDeleteManyArgs} args - Arguments to filter FlwExecutionSteps to delete.
     * @example
     * // Delete a few FlwExecutionSteps
     * const { count } = await prisma.flwExecutionSteps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FlwExecutionStepsDeleteManyArgs>(args?: Prisma.SelectSubset<T, FlwExecutionStepsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlwExecutionSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionStepsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FlwExecutionStepsUpdateManyArgs>(args: Prisma.SelectSubset<T, FlwExecutionStepsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlwExecutionSteps and returns the data updated in the database.
     * @param {FlwExecutionStepsUpdateManyAndReturnArgs} args - Arguments to update many FlwExecutionSteps.
     * @example
     * // Update many FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FlwExecutionSteps and only return the `id`
     * const flwExecutionStepsWithIdOnly = await prisma.flwExecutionSteps.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends FlwExecutionStepsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FlwExecutionStepsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FlwExecutionSteps.
     * @param {FlwExecutionStepsUpsertArgs} args - Arguments to update or create a FlwExecutionSteps.
     * @example
     * // Update or create a FlwExecutionSteps
     * const flwExecutionSteps = await prisma.flwExecutionSteps.upsert({
     *   create: {
     *     // ... data to create a FlwExecutionSteps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FlwExecutionSteps we want to update
     *   }
     * })
     */
    upsert<T extends FlwExecutionStepsUpsertArgs>(args: Prisma.SelectSubset<T, FlwExecutionStepsUpsertArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FlwExecutionSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionStepsCountArgs} args - Arguments to filter FlwExecutionSteps to count.
     * @example
     * // Count the number of FlwExecutionSteps
     * const count = await prisma.flwExecutionSteps.count({
     *   where: {
     *     // ... the filter for the FlwExecutionSteps we want to count
     *   }
     * })
    **/
    count<T extends FlwExecutionStepsCountArgs>(args?: Prisma.Subset<T, FlwExecutionStepsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FlwExecutionStepsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FlwExecutionSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionStepsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FlwExecutionStepsAggregateArgs>(args: Prisma.Subset<T, FlwExecutionStepsAggregateArgs>): Prisma.PrismaPromise<GetFlwExecutionStepsAggregateType<T>>;
    /**
     * Group by FlwExecutionSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionStepsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends FlwExecutionStepsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FlwExecutionStepsGroupByArgs['orderBy'];
    } : {
        orderBy?: FlwExecutionStepsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FlwExecutionStepsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlwExecutionStepsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FlwExecutionSteps model
     */
    readonly fields: FlwExecutionStepsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FlwExecutionSteps.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FlwExecutionStepsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    FlwExecutions<T extends Prisma.FlwExecutionsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlwExecutionsDefaultArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    FlwSteps<T extends Prisma.FlwStepsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlwStepsDefaultArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the FlwExecutionSteps model
 */
export interface FlwExecutionStepsFieldRefs {
    readonly id: Prisma.FieldRef<"FlwExecutionSteps", 'String'>;
    readonly flwExecutionId: Prisma.FieldRef<"FlwExecutionSteps", 'String'>;
    readonly flwStepId: Prisma.FieldRef<"FlwExecutionSteps", 'String'>;
    readonly status: Prisma.FieldRef<"FlwExecutionSteps", 'FlwExecutionStatus'>;
    readonly retryCount: Prisma.FieldRef<"FlwExecutionSteps", 'Int'>;
    readonly error: Prisma.FieldRef<"FlwExecutionSteps", 'String'>;
    readonly outputPayload: Prisma.FieldRef<"FlwExecutionSteps", 'Json'>;
    readonly errorPayload: Prisma.FieldRef<"FlwExecutionSteps", 'Json'>;
    readonly idempotencyKey: Prisma.FieldRef<"FlwExecutionSteps", 'String'>;
    readonly startedAt: Prisma.FieldRef<"FlwExecutionSteps", 'DateTime'>;
    readonly finishedAt: Prisma.FieldRef<"FlwExecutionSteps", 'DateTime'>;
    readonly nextRetryAt: Prisma.FieldRef<"FlwExecutionSteps", 'DateTime'>;
}
/**
 * FlwExecutionSteps findUnique
 */
export type FlwExecutionStepsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutionSteps to fetch.
     */
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
};
/**
 * FlwExecutionSteps findUniqueOrThrow
 */
export type FlwExecutionStepsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutionSteps to fetch.
     */
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
};
/**
 * FlwExecutionSteps findFirst
 */
export type FlwExecutionStepsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutionSteps to fetch.
     */
    where?: Prisma.FlwExecutionStepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwExecutionSteps to fetch.
     */
    orderBy?: Prisma.FlwExecutionStepsOrderByWithRelationInput | Prisma.FlwExecutionStepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FlwExecutionSteps.
     */
    cursor?: Prisma.FlwExecutionStepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwExecutionSteps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwExecutionSteps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FlwExecutionSteps.
     */
    distinct?: Prisma.FlwExecutionStepsScalarFieldEnum | Prisma.FlwExecutionStepsScalarFieldEnum[];
};
/**
 * FlwExecutionSteps findFirstOrThrow
 */
export type FlwExecutionStepsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutionSteps to fetch.
     */
    where?: Prisma.FlwExecutionStepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwExecutionSteps to fetch.
     */
    orderBy?: Prisma.FlwExecutionStepsOrderByWithRelationInput | Prisma.FlwExecutionStepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FlwExecutionSteps.
     */
    cursor?: Prisma.FlwExecutionStepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwExecutionSteps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwExecutionSteps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FlwExecutionSteps.
     */
    distinct?: Prisma.FlwExecutionStepsScalarFieldEnum | Prisma.FlwExecutionStepsScalarFieldEnum[];
};
/**
 * FlwExecutionSteps findMany
 */
export type FlwExecutionStepsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutionSteps to fetch.
     */
    where?: Prisma.FlwExecutionStepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwExecutionSteps to fetch.
     */
    orderBy?: Prisma.FlwExecutionStepsOrderByWithRelationInput | Prisma.FlwExecutionStepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FlwExecutionSteps.
     */
    cursor?: Prisma.FlwExecutionStepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwExecutionSteps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwExecutionSteps.
     */
    skip?: number;
    distinct?: Prisma.FlwExecutionStepsScalarFieldEnum | Prisma.FlwExecutionStepsScalarFieldEnum[];
};
/**
 * FlwExecutionSteps create
 */
export type FlwExecutionStepsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * The data needed to create a FlwExecutionSteps.
     */
    data: Prisma.XOR<Prisma.FlwExecutionStepsCreateInput, Prisma.FlwExecutionStepsUncheckedCreateInput>;
};
/**
 * FlwExecutionSteps createMany
 */
export type FlwExecutionStepsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FlwExecutionSteps.
     */
    data: Prisma.FlwExecutionStepsCreateManyInput | Prisma.FlwExecutionStepsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FlwExecutionSteps createManyAndReturn
 */
export type FlwExecutionStepsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * The data used to create many FlwExecutionSteps.
     */
    data: Prisma.FlwExecutionStepsCreateManyInput | Prisma.FlwExecutionStepsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FlwExecutionSteps update
 */
export type FlwExecutionStepsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * The data needed to update a FlwExecutionSteps.
     */
    data: Prisma.XOR<Prisma.FlwExecutionStepsUpdateInput, Prisma.FlwExecutionStepsUncheckedUpdateInput>;
    /**
     * Choose, which FlwExecutionSteps to update.
     */
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
};
/**
 * FlwExecutionSteps updateMany
 */
export type FlwExecutionStepsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FlwExecutionSteps.
     */
    data: Prisma.XOR<Prisma.FlwExecutionStepsUpdateManyMutationInput, Prisma.FlwExecutionStepsUncheckedUpdateManyInput>;
    /**
     * Filter which FlwExecutionSteps to update
     */
    where?: Prisma.FlwExecutionStepsWhereInput;
    /**
     * Limit how many FlwExecutionSteps to update.
     */
    limit?: number;
};
/**
 * FlwExecutionSteps updateManyAndReturn
 */
export type FlwExecutionStepsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * The data used to update FlwExecutionSteps.
     */
    data: Prisma.XOR<Prisma.FlwExecutionStepsUpdateManyMutationInput, Prisma.FlwExecutionStepsUncheckedUpdateManyInput>;
    /**
     * Filter which FlwExecutionSteps to update
     */
    where?: Prisma.FlwExecutionStepsWhereInput;
    /**
     * Limit how many FlwExecutionSteps to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FlwExecutionSteps upsert
 */
export type FlwExecutionStepsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * The filter to search for the FlwExecutionSteps to update in case it exists.
     */
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
    /**
     * In case the FlwExecutionSteps found by the `where` argument doesn't exist, create a new FlwExecutionSteps with this data.
     */
    create: Prisma.XOR<Prisma.FlwExecutionStepsCreateInput, Prisma.FlwExecutionStepsUncheckedCreateInput>;
    /**
     * In case the FlwExecutionSteps was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FlwExecutionStepsUpdateInput, Prisma.FlwExecutionStepsUncheckedUpdateInput>;
};
/**
 * FlwExecutionSteps delete
 */
export type FlwExecutionStepsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
    /**
     * Filter which FlwExecutionSteps to delete.
     */
    where: Prisma.FlwExecutionStepsWhereUniqueInput;
};
/**
 * FlwExecutionSteps deleteMany
 */
export type FlwExecutionStepsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FlwExecutionSteps to delete
     */
    where?: Prisma.FlwExecutionStepsWhereInput;
    /**
     * Limit how many FlwExecutionSteps to delete.
     */
    limit?: number;
};
/**
 * FlwExecutionSteps without action
 */
export type FlwExecutionStepsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionSteps
     */
    select?: Prisma.FlwExecutionStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutionSteps
     */
    omit?: Prisma.FlwExecutionStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionStepsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FlwExecutionSteps.d.ts.map