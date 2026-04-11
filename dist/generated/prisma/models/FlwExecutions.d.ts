import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model FlwExecutions
 *
 */
export type FlwExecutionsModel = runtime.Types.Result.DefaultSelection<Prisma.$FlwExecutionsPayload>;
export type AggregateFlwExecutions = {
    _count: FlwExecutionsCountAggregateOutputType | null;
    _min: FlwExecutionsMinAggregateOutputType | null;
    _max: FlwExecutionsMaxAggregateOutputType | null;
};
export type FlwExecutionsMinAggregateOutputType = {
    id: string | null;
    flwId: string | null;
    lockedBy: string | null;
    status: $Enums.FlwExecutionStatus | null;
    lockedAt: Date | null;
    triggeredAt: Date | null;
    startedAt: Date | null;
    finishedAt: Date | null;
};
export type FlwExecutionsMaxAggregateOutputType = {
    id: string | null;
    flwId: string | null;
    lockedBy: string | null;
    status: $Enums.FlwExecutionStatus | null;
    lockedAt: Date | null;
    triggeredAt: Date | null;
    startedAt: Date | null;
    finishedAt: Date | null;
};
export type FlwExecutionsCountAggregateOutputType = {
    id: number;
    flwId: number;
    lockedBy: number;
    status: number;
    lockedAt: number;
    triggerPayload: number;
    triggeredAt: number;
    startedAt: number;
    finishedAt: number;
    _all: number;
};
export type FlwExecutionsMinAggregateInputType = {
    id?: true;
    flwId?: true;
    lockedBy?: true;
    status?: true;
    lockedAt?: true;
    triggeredAt?: true;
    startedAt?: true;
    finishedAt?: true;
};
export type FlwExecutionsMaxAggregateInputType = {
    id?: true;
    flwId?: true;
    lockedBy?: true;
    status?: true;
    lockedAt?: true;
    triggeredAt?: true;
    startedAt?: true;
    finishedAt?: true;
};
export type FlwExecutionsCountAggregateInputType = {
    id?: true;
    flwId?: true;
    lockedBy?: true;
    status?: true;
    lockedAt?: true;
    triggerPayload?: true;
    triggeredAt?: true;
    startedAt?: true;
    finishedAt?: true;
    _all?: true;
};
export type FlwExecutionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FlwExecutions to aggregate.
     */
    where?: Prisma.FlwExecutionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwExecutions to fetch.
     */
    orderBy?: Prisma.FlwExecutionsOrderByWithRelationInput | Prisma.FlwExecutionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FlwExecutionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwExecutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwExecutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FlwExecutions
    **/
    _count?: true | FlwExecutionsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FlwExecutionsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FlwExecutionsMaxAggregateInputType;
};
export type GetFlwExecutionsAggregateType<T extends FlwExecutionsAggregateArgs> = {
    [P in keyof T & keyof AggregateFlwExecutions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFlwExecutions[P]> : Prisma.GetScalarType<T[P], AggregateFlwExecutions[P]>;
};
export type FlwExecutionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwExecutionsWhereInput;
    orderBy?: Prisma.FlwExecutionsOrderByWithAggregationInput | Prisma.FlwExecutionsOrderByWithAggregationInput[];
    by: Prisma.FlwExecutionsScalarFieldEnum[] | Prisma.FlwExecutionsScalarFieldEnum;
    having?: Prisma.FlwExecutionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FlwExecutionsCountAggregateInputType | true;
    _min?: FlwExecutionsMinAggregateInputType;
    _max?: FlwExecutionsMaxAggregateInputType;
};
export type FlwExecutionsGroupByOutputType = {
    id: string;
    flwId: string;
    lockedBy: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt: Date | null;
    triggerPayload: runtime.JsonValue | null;
    triggeredAt: Date;
    startedAt: Date | null;
    finishedAt: Date | null;
    _count: FlwExecutionsCountAggregateOutputType | null;
    _min: FlwExecutionsMinAggregateOutputType | null;
    _max: FlwExecutionsMaxAggregateOutputType | null;
};
type GetFlwExecutionsGroupByPayload<T extends FlwExecutionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FlwExecutionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FlwExecutionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FlwExecutionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FlwExecutionsGroupByOutputType[P]>;
}>>;
export type FlwExecutionsWhereInput = {
    AND?: Prisma.FlwExecutionsWhereInput | Prisma.FlwExecutionsWhereInput[];
    OR?: Prisma.FlwExecutionsWhereInput[];
    NOT?: Prisma.FlwExecutionsWhereInput | Prisma.FlwExecutionsWhereInput[];
    id?: Prisma.StringFilter<"FlwExecutions"> | string;
    flwId?: Prisma.StringFilter<"FlwExecutions"> | string;
    lockedBy?: Prisma.StringNullableFilter<"FlwExecutions"> | string | null;
    status?: Prisma.EnumFlwExecutionStatusFilter<"FlwExecutions"> | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
    triggerPayload?: Prisma.JsonNullableFilter<"FlwExecutions">;
    triggeredAt?: Prisma.DateTimeFilter<"FlwExecutions"> | Date | string;
    startedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
    Flw?: Prisma.XOR<Prisma.FlwScalarRelationFilter, Prisma.FlwWhereInput>;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsListRelationFilter;
};
export type FlwExecutionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    lockedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lockedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    triggerPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    triggeredAt?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    Flw?: Prisma.FlwOrderByWithRelationInput;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsOrderByRelationAggregateInput;
};
export type FlwExecutionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FlwExecutionsWhereInput | Prisma.FlwExecutionsWhereInput[];
    OR?: Prisma.FlwExecutionsWhereInput[];
    NOT?: Prisma.FlwExecutionsWhereInput | Prisma.FlwExecutionsWhereInput[];
    flwId?: Prisma.StringFilter<"FlwExecutions"> | string;
    lockedBy?: Prisma.StringNullableFilter<"FlwExecutions"> | string | null;
    status?: Prisma.EnumFlwExecutionStatusFilter<"FlwExecutions"> | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
    triggerPayload?: Prisma.JsonNullableFilter<"FlwExecutions">;
    triggeredAt?: Prisma.DateTimeFilter<"FlwExecutions"> | Date | string;
    startedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
    Flw?: Prisma.XOR<Prisma.FlwScalarRelationFilter, Prisma.FlwWhereInput>;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsListRelationFilter;
}, "id">;
export type FlwExecutionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    lockedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lockedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    triggerPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    triggeredAt?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.FlwExecutionsCountOrderByAggregateInput;
    _max?: Prisma.FlwExecutionsMaxOrderByAggregateInput;
    _min?: Prisma.FlwExecutionsMinOrderByAggregateInput;
};
export type FlwExecutionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.FlwExecutionsScalarWhereWithAggregatesInput | Prisma.FlwExecutionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.FlwExecutionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FlwExecutionsScalarWhereWithAggregatesInput | Prisma.FlwExecutionsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FlwExecutions"> | string;
    flwId?: Prisma.StringWithAggregatesFilter<"FlwExecutions"> | string;
    lockedBy?: Prisma.StringNullableWithAggregatesFilter<"FlwExecutions"> | string | null;
    status?: Prisma.EnumFlwExecutionStatusWithAggregatesFilter<"FlwExecutions"> | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FlwExecutions"> | Date | string | null;
    triggerPayload?: Prisma.JsonNullableWithAggregatesFilter<"FlwExecutions">;
    triggeredAt?: Prisma.DateTimeWithAggregatesFilter<"FlwExecutions"> | Date | string;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FlwExecutions"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FlwExecutions"> | Date | string | null;
};
export type FlwExecutionsCreateInput = {
    id?: string;
    lockedBy?: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt?: Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    Flw: Prisma.FlwCreateNestedOneWithoutFlwExecutionsInput;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsCreateNestedManyWithoutFlwExecutionsInput;
};
export type FlwExecutionsUncheckedCreateInput = {
    id?: string;
    flwId: string;
    lockedBy?: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt?: Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUncheckedCreateNestedManyWithoutFlwExecutionsInput;
};
export type FlwExecutionsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    Flw?: Prisma.FlwUpdateOneRequiredWithoutFlwExecutionsNestedInput;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUpdateManyWithoutFlwExecutionsNestedInput;
};
export type FlwExecutionsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUncheckedUpdateManyWithoutFlwExecutionsNestedInput;
};
export type FlwExecutionsCreateManyInput = {
    id?: string;
    flwId: string;
    lockedBy?: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt?: Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
};
export type FlwExecutionsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionsListRelationFilter = {
    every?: Prisma.FlwExecutionsWhereInput;
    some?: Prisma.FlwExecutionsWhereInput;
    none?: Prisma.FlwExecutionsWhereInput;
};
export type FlwExecutionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FlwExecutionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    lockedBy?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lockedAt?: Prisma.SortOrder;
    triggerPayload?: Prisma.SortOrder;
    triggeredAt?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
};
export type FlwExecutionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    lockedBy?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lockedAt?: Prisma.SortOrder;
    triggeredAt?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
};
export type FlwExecutionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    lockedBy?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lockedAt?: Prisma.SortOrder;
    triggeredAt?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
};
export type FlwExecutionsScalarRelationFilter = {
    is?: Prisma.FlwExecutionsWhereInput;
    isNot?: Prisma.FlwExecutionsWhereInput;
};
export type FlwExecutionsCreateNestedManyWithoutFlwInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput> | Prisma.FlwExecutionsCreateWithoutFlwInput[] | Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwExecutionsCreateOrConnectWithoutFlwInput | Prisma.FlwExecutionsCreateOrConnectWithoutFlwInput[];
    createMany?: Prisma.FlwExecutionsCreateManyFlwInputEnvelope;
    connect?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
};
export type FlwExecutionsUncheckedCreateNestedManyWithoutFlwInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput> | Prisma.FlwExecutionsCreateWithoutFlwInput[] | Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwExecutionsCreateOrConnectWithoutFlwInput | Prisma.FlwExecutionsCreateOrConnectWithoutFlwInput[];
    createMany?: Prisma.FlwExecutionsCreateManyFlwInputEnvelope;
    connect?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
};
export type FlwExecutionsUpdateManyWithoutFlwNestedInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput> | Prisma.FlwExecutionsCreateWithoutFlwInput[] | Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwExecutionsCreateOrConnectWithoutFlwInput | Prisma.FlwExecutionsCreateOrConnectWithoutFlwInput[];
    upsert?: Prisma.FlwExecutionsUpsertWithWhereUniqueWithoutFlwInput | Prisma.FlwExecutionsUpsertWithWhereUniqueWithoutFlwInput[];
    createMany?: Prisma.FlwExecutionsCreateManyFlwInputEnvelope;
    set?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
    disconnect?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
    delete?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
    connect?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
    update?: Prisma.FlwExecutionsUpdateWithWhereUniqueWithoutFlwInput | Prisma.FlwExecutionsUpdateWithWhereUniqueWithoutFlwInput[];
    updateMany?: Prisma.FlwExecutionsUpdateManyWithWhereWithoutFlwInput | Prisma.FlwExecutionsUpdateManyWithWhereWithoutFlwInput[];
    deleteMany?: Prisma.FlwExecutionsScalarWhereInput | Prisma.FlwExecutionsScalarWhereInput[];
};
export type FlwExecutionsUncheckedUpdateManyWithoutFlwNestedInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput> | Prisma.FlwExecutionsCreateWithoutFlwInput[] | Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwExecutionsCreateOrConnectWithoutFlwInput | Prisma.FlwExecutionsCreateOrConnectWithoutFlwInput[];
    upsert?: Prisma.FlwExecutionsUpsertWithWhereUniqueWithoutFlwInput | Prisma.FlwExecutionsUpsertWithWhereUniqueWithoutFlwInput[];
    createMany?: Prisma.FlwExecutionsCreateManyFlwInputEnvelope;
    set?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
    disconnect?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
    delete?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
    connect?: Prisma.FlwExecutionsWhereUniqueInput | Prisma.FlwExecutionsWhereUniqueInput[];
    update?: Prisma.FlwExecutionsUpdateWithWhereUniqueWithoutFlwInput | Prisma.FlwExecutionsUpdateWithWhereUniqueWithoutFlwInput[];
    updateMany?: Prisma.FlwExecutionsUpdateManyWithWhereWithoutFlwInput | Prisma.FlwExecutionsUpdateManyWithWhereWithoutFlwInput[];
    deleteMany?: Prisma.FlwExecutionsScalarWhereInput | Prisma.FlwExecutionsScalarWhereInput[];
};
export type EnumFlwExecutionStatusFieldUpdateOperationsInput = {
    set?: $Enums.FlwExecutionStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type FlwExecutionsCreateNestedOneWithoutFlwExecutionStepsInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwExecutionStepsInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwExecutionStepsInput>;
    connectOrCreate?: Prisma.FlwExecutionsCreateOrConnectWithoutFlwExecutionStepsInput;
    connect?: Prisma.FlwExecutionsWhereUniqueInput;
};
export type FlwExecutionsUpdateOneRequiredWithoutFlwExecutionStepsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwExecutionStepsInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwExecutionStepsInput>;
    connectOrCreate?: Prisma.FlwExecutionsCreateOrConnectWithoutFlwExecutionStepsInput;
    upsert?: Prisma.FlwExecutionsUpsertWithoutFlwExecutionStepsInput;
    connect?: Prisma.FlwExecutionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FlwExecutionsUpdateToOneWithWhereWithoutFlwExecutionStepsInput, Prisma.FlwExecutionsUpdateWithoutFlwExecutionStepsInput>, Prisma.FlwExecutionsUncheckedUpdateWithoutFlwExecutionStepsInput>;
};
export type FlwExecutionsCreateWithoutFlwInput = {
    id?: string;
    lockedBy?: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt?: Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsCreateNestedManyWithoutFlwExecutionsInput;
};
export type FlwExecutionsUncheckedCreateWithoutFlwInput = {
    id?: string;
    lockedBy?: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt?: Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUncheckedCreateNestedManyWithoutFlwExecutionsInput;
};
export type FlwExecutionsCreateOrConnectWithoutFlwInput = {
    where: Prisma.FlwExecutionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput>;
};
export type FlwExecutionsCreateManyFlwInputEnvelope = {
    data: Prisma.FlwExecutionsCreateManyFlwInput | Prisma.FlwExecutionsCreateManyFlwInput[];
    skipDuplicates?: boolean;
};
export type FlwExecutionsUpsertWithWhereUniqueWithoutFlwInput = {
    where: Prisma.FlwExecutionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.FlwExecutionsUpdateWithoutFlwInput, Prisma.FlwExecutionsUncheckedUpdateWithoutFlwInput>;
    create: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwInput>;
};
export type FlwExecutionsUpdateWithWhereUniqueWithoutFlwInput = {
    where: Prisma.FlwExecutionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.FlwExecutionsUpdateWithoutFlwInput, Prisma.FlwExecutionsUncheckedUpdateWithoutFlwInput>;
};
export type FlwExecutionsUpdateManyWithWhereWithoutFlwInput = {
    where: Prisma.FlwExecutionsScalarWhereInput;
    data: Prisma.XOR<Prisma.FlwExecutionsUpdateManyMutationInput, Prisma.FlwExecutionsUncheckedUpdateManyWithoutFlwInput>;
};
export type FlwExecutionsScalarWhereInput = {
    AND?: Prisma.FlwExecutionsScalarWhereInput | Prisma.FlwExecutionsScalarWhereInput[];
    OR?: Prisma.FlwExecutionsScalarWhereInput[];
    NOT?: Prisma.FlwExecutionsScalarWhereInput | Prisma.FlwExecutionsScalarWhereInput[];
    id?: Prisma.StringFilter<"FlwExecutions"> | string;
    flwId?: Prisma.StringFilter<"FlwExecutions"> | string;
    lockedBy?: Prisma.StringNullableFilter<"FlwExecutions"> | string | null;
    status?: Prisma.EnumFlwExecutionStatusFilter<"FlwExecutions"> | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
    triggerPayload?: Prisma.JsonNullableFilter<"FlwExecutions">;
    triggeredAt?: Prisma.DateTimeFilter<"FlwExecutions"> | Date | string;
    startedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"FlwExecutions"> | Date | string | null;
};
export type FlwExecutionsCreateWithoutFlwExecutionStepsInput = {
    id?: string;
    lockedBy?: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt?: Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    Flw: Prisma.FlwCreateNestedOneWithoutFlwExecutionsInput;
};
export type FlwExecutionsUncheckedCreateWithoutFlwExecutionStepsInput = {
    id?: string;
    flwId: string;
    lockedBy?: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt?: Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
};
export type FlwExecutionsCreateOrConnectWithoutFlwExecutionStepsInput = {
    where: Prisma.FlwExecutionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwExecutionStepsInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwExecutionStepsInput>;
};
export type FlwExecutionsUpsertWithoutFlwExecutionStepsInput = {
    update: Prisma.XOR<Prisma.FlwExecutionsUpdateWithoutFlwExecutionStepsInput, Prisma.FlwExecutionsUncheckedUpdateWithoutFlwExecutionStepsInput>;
    create: Prisma.XOR<Prisma.FlwExecutionsCreateWithoutFlwExecutionStepsInput, Prisma.FlwExecutionsUncheckedCreateWithoutFlwExecutionStepsInput>;
    where?: Prisma.FlwExecutionsWhereInput;
};
export type FlwExecutionsUpdateToOneWithWhereWithoutFlwExecutionStepsInput = {
    where?: Prisma.FlwExecutionsWhereInput;
    data: Prisma.XOR<Prisma.FlwExecutionsUpdateWithoutFlwExecutionStepsInput, Prisma.FlwExecutionsUncheckedUpdateWithoutFlwExecutionStepsInput>;
};
export type FlwExecutionsUpdateWithoutFlwExecutionStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    Flw?: Prisma.FlwUpdateOneRequiredWithoutFlwExecutionsNestedInput;
};
export type FlwExecutionsUncheckedUpdateWithoutFlwExecutionStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FlwExecutionsCreateManyFlwInput = {
    id?: string;
    lockedBy?: string | null;
    status: $Enums.FlwExecutionStatus;
    lockedAt?: Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
};
export type FlwExecutionsUpdateWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUpdateManyWithoutFlwExecutionsNestedInput;
};
export type FlwExecutionsUncheckedUpdateWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUncheckedUpdateManyWithoutFlwExecutionsNestedInput;
};
export type FlwExecutionsUncheckedUpdateManyWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumFlwExecutionStatusFieldUpdateOperationsInput | $Enums.FlwExecutionStatus;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    triggerPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    triggeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type FlwExecutionsCountOutputType
 */
export type FlwExecutionsCountOutputType = {
    FlwExecutionSteps: number;
};
export type FlwExecutionsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    FlwExecutionSteps?: boolean | FlwExecutionsCountOutputTypeCountFlwExecutionStepsArgs;
};
/**
 * FlwExecutionsCountOutputType without action
 */
export type FlwExecutionsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutionsCountOutputType
     */
    select?: Prisma.FlwExecutionsCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * FlwExecutionsCountOutputType without action
 */
export type FlwExecutionsCountOutputTypeCountFlwExecutionStepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwExecutionStepsWhereInput;
};
export type FlwExecutionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    lockedBy?: boolean;
    status?: boolean;
    lockedAt?: boolean;
    triggerPayload?: boolean;
    triggeredAt?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwExecutionSteps?: boolean | Prisma.FlwExecutions$FlwExecutionStepsArgs<ExtArgs>;
    _count?: boolean | Prisma.FlwExecutionsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwExecutions"]>;
export type FlwExecutionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    lockedBy?: boolean;
    status?: boolean;
    lockedAt?: boolean;
    triggerPayload?: boolean;
    triggeredAt?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwExecutions"]>;
export type FlwExecutionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    lockedBy?: boolean;
    status?: boolean;
    lockedAt?: boolean;
    triggerPayload?: boolean;
    triggeredAt?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwExecutions"]>;
export type FlwExecutionsSelectScalar = {
    id?: boolean;
    flwId?: boolean;
    lockedBy?: boolean;
    status?: boolean;
    lockedAt?: boolean;
    triggerPayload?: boolean;
    triggeredAt?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
};
export type FlwExecutionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "flwId" | "lockedBy" | "status" | "lockedAt" | "triggerPayload" | "triggeredAt" | "startedAt" | "finishedAt", ExtArgs["result"]["flwExecutions"]>;
export type FlwExecutionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwExecutionSteps?: boolean | Prisma.FlwExecutions$FlwExecutionStepsArgs<ExtArgs>;
    _count?: boolean | Prisma.FlwExecutionsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FlwExecutionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
};
export type FlwExecutionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
};
export type $FlwExecutionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FlwExecutions";
    objects: {
        Flw: Prisma.$FlwPayload<ExtArgs>;
        FlwExecutionSteps: Prisma.$FlwExecutionStepsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        flwId: string;
        lockedBy: string | null;
        status: $Enums.FlwExecutionStatus;
        lockedAt: Date | null;
        triggerPayload: runtime.JsonValue | null;
        triggeredAt: Date;
        startedAt: Date | null;
        finishedAt: Date | null;
    }, ExtArgs["result"]["flwExecutions"]>;
    composites: {};
};
export type FlwExecutionsGetPayload<S extends boolean | null | undefined | FlwExecutionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload, S>;
export type FlwExecutionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FlwExecutionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FlwExecutionsCountAggregateInputType | true;
};
export interface FlwExecutionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FlwExecutions'];
        meta: {
            name: 'FlwExecutions';
        };
    };
    /**
     * Find zero or one FlwExecutions that matches the filter.
     * @param {FlwExecutionsFindUniqueArgs} args - Arguments to find a FlwExecutions
     * @example
     * // Get one FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlwExecutionsFindUniqueArgs>(args: Prisma.SelectSubset<T, FlwExecutionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FlwExecutions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlwExecutionsFindUniqueOrThrowArgs} args - Arguments to find a FlwExecutions
     * @example
     * // Get one FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlwExecutionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FlwExecutionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlwExecutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionsFindFirstArgs} args - Arguments to find a FlwExecutions
     * @example
     * // Get one FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlwExecutionsFindFirstArgs>(args?: Prisma.SelectSubset<T, FlwExecutionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlwExecutions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionsFindFirstOrThrowArgs} args - Arguments to find a FlwExecutions
     * @example
     * // Get one FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlwExecutionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FlwExecutionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FlwExecutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.findMany()
     *
     * // Get first 10 FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const flwExecutionsWithIdOnly = await prisma.flwExecutions.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FlwExecutionsFindManyArgs>(args?: Prisma.SelectSubset<T, FlwExecutionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FlwExecutions.
     * @param {FlwExecutionsCreateArgs} args - Arguments to create a FlwExecutions.
     * @example
     * // Create one FlwExecutions
     * const FlwExecutions = await prisma.flwExecutions.create({
     *   data: {
     *     // ... data to create a FlwExecutions
     *   }
     * })
     *
     */
    create<T extends FlwExecutionsCreateArgs>(args: Prisma.SelectSubset<T, FlwExecutionsCreateArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FlwExecutions.
     * @param {FlwExecutionsCreateManyArgs} args - Arguments to create many FlwExecutions.
     * @example
     * // Create many FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FlwExecutionsCreateManyArgs>(args?: Prisma.SelectSubset<T, FlwExecutionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FlwExecutions and returns the data saved in the database.
     * @param {FlwExecutionsCreateManyAndReturnArgs} args - Arguments to create many FlwExecutions.
     * @example
     * // Create many FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FlwExecutions and only return the `id`
     * const flwExecutionsWithIdOnly = await prisma.flwExecutions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FlwExecutionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FlwExecutionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FlwExecutions.
     * @param {FlwExecutionsDeleteArgs} args - Arguments to delete one FlwExecutions.
     * @example
     * // Delete one FlwExecutions
     * const FlwExecutions = await prisma.flwExecutions.delete({
     *   where: {
     *     // ... filter to delete one FlwExecutions
     *   }
     * })
     *
     */
    delete<T extends FlwExecutionsDeleteArgs>(args: Prisma.SelectSubset<T, FlwExecutionsDeleteArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FlwExecutions.
     * @param {FlwExecutionsUpdateArgs} args - Arguments to update one FlwExecutions.
     * @example
     * // Update one FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FlwExecutionsUpdateArgs>(args: Prisma.SelectSubset<T, FlwExecutionsUpdateArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FlwExecutions.
     * @param {FlwExecutionsDeleteManyArgs} args - Arguments to filter FlwExecutions to delete.
     * @example
     * // Delete a few FlwExecutions
     * const { count } = await prisma.flwExecutions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FlwExecutionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, FlwExecutionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlwExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FlwExecutionsUpdateManyArgs>(args: Prisma.SelectSubset<T, FlwExecutionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlwExecutions and returns the data updated in the database.
     * @param {FlwExecutionsUpdateManyAndReturnArgs} args - Arguments to update many FlwExecutions.
     * @example
     * // Update many FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FlwExecutions and only return the `id`
     * const flwExecutionsWithIdOnly = await prisma.flwExecutions.updateManyAndReturn({
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
    updateManyAndReturn<T extends FlwExecutionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FlwExecutionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FlwExecutions.
     * @param {FlwExecutionsUpsertArgs} args - Arguments to update or create a FlwExecutions.
     * @example
     * // Update or create a FlwExecutions
     * const flwExecutions = await prisma.flwExecutions.upsert({
     *   create: {
     *     // ... data to create a FlwExecutions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FlwExecutions we want to update
     *   }
     * })
     */
    upsert<T extends FlwExecutionsUpsertArgs>(args: Prisma.SelectSubset<T, FlwExecutionsUpsertArgs<ExtArgs>>): Prisma.Prisma__FlwExecutionsClient<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FlwExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionsCountArgs} args - Arguments to filter FlwExecutions to count.
     * @example
     * // Count the number of FlwExecutions
     * const count = await prisma.flwExecutions.count({
     *   where: {
     *     // ... the filter for the FlwExecutions we want to count
     *   }
     * })
    **/
    count<T extends FlwExecutionsCountArgs>(args?: Prisma.Subset<T, FlwExecutionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FlwExecutionsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FlwExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FlwExecutionsAggregateArgs>(args: Prisma.Subset<T, FlwExecutionsAggregateArgs>): Prisma.PrismaPromise<GetFlwExecutionsAggregateType<T>>;
    /**
     * Group by FlwExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwExecutionsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FlwExecutionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FlwExecutionsGroupByArgs['orderBy'];
    } : {
        orderBy?: FlwExecutionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FlwExecutionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlwExecutionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FlwExecutions model
     */
    readonly fields: FlwExecutionsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FlwExecutions.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FlwExecutionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    Flw<T extends Prisma.FlwDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlwDefaultArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    FlwExecutionSteps<T extends Prisma.FlwExecutions$FlwExecutionStepsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlwExecutions$FlwExecutionStepsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the FlwExecutions model
 */
export interface FlwExecutionsFieldRefs {
    readonly id: Prisma.FieldRef<"FlwExecutions", 'String'>;
    readonly flwId: Prisma.FieldRef<"FlwExecutions", 'String'>;
    readonly lockedBy: Prisma.FieldRef<"FlwExecutions", 'String'>;
    readonly status: Prisma.FieldRef<"FlwExecutions", 'FlwExecutionStatus'>;
    readonly lockedAt: Prisma.FieldRef<"FlwExecutions", 'DateTime'>;
    readonly triggerPayload: Prisma.FieldRef<"FlwExecutions", 'Json'>;
    readonly triggeredAt: Prisma.FieldRef<"FlwExecutions", 'DateTime'>;
    readonly startedAt: Prisma.FieldRef<"FlwExecutions", 'DateTime'>;
    readonly finishedAt: Prisma.FieldRef<"FlwExecutions", 'DateTime'>;
}
/**
 * FlwExecutions findUnique
 */
export type FlwExecutionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutions to fetch.
     */
    where: Prisma.FlwExecutionsWhereUniqueInput;
};
/**
 * FlwExecutions findUniqueOrThrow
 */
export type FlwExecutionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutions to fetch.
     */
    where: Prisma.FlwExecutionsWhereUniqueInput;
};
/**
 * FlwExecutions findFirst
 */
export type FlwExecutionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutions to fetch.
     */
    where?: Prisma.FlwExecutionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwExecutions to fetch.
     */
    orderBy?: Prisma.FlwExecutionsOrderByWithRelationInput | Prisma.FlwExecutionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FlwExecutions.
     */
    cursor?: Prisma.FlwExecutionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwExecutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwExecutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FlwExecutions.
     */
    distinct?: Prisma.FlwExecutionsScalarFieldEnum | Prisma.FlwExecutionsScalarFieldEnum[];
};
/**
 * FlwExecutions findFirstOrThrow
 */
export type FlwExecutionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutions to fetch.
     */
    where?: Prisma.FlwExecutionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwExecutions to fetch.
     */
    orderBy?: Prisma.FlwExecutionsOrderByWithRelationInput | Prisma.FlwExecutionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FlwExecutions.
     */
    cursor?: Prisma.FlwExecutionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwExecutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwExecutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FlwExecutions.
     */
    distinct?: Prisma.FlwExecutionsScalarFieldEnum | Prisma.FlwExecutionsScalarFieldEnum[];
};
/**
 * FlwExecutions findMany
 */
export type FlwExecutionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwExecutions to fetch.
     */
    where?: Prisma.FlwExecutionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwExecutions to fetch.
     */
    orderBy?: Prisma.FlwExecutionsOrderByWithRelationInput | Prisma.FlwExecutionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FlwExecutions.
     */
    cursor?: Prisma.FlwExecutionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwExecutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwExecutions.
     */
    skip?: number;
    distinct?: Prisma.FlwExecutionsScalarFieldEnum | Prisma.FlwExecutionsScalarFieldEnum[];
};
/**
 * FlwExecutions create
 */
export type FlwExecutionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * The data needed to create a FlwExecutions.
     */
    data: Prisma.XOR<Prisma.FlwExecutionsCreateInput, Prisma.FlwExecutionsUncheckedCreateInput>;
};
/**
 * FlwExecutions createMany
 */
export type FlwExecutionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FlwExecutions.
     */
    data: Prisma.FlwExecutionsCreateManyInput | Prisma.FlwExecutionsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FlwExecutions createManyAndReturn
 */
export type FlwExecutionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * The data used to create many FlwExecutions.
     */
    data: Prisma.FlwExecutionsCreateManyInput | Prisma.FlwExecutionsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FlwExecutions update
 */
export type FlwExecutionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * The data needed to update a FlwExecutions.
     */
    data: Prisma.XOR<Prisma.FlwExecutionsUpdateInput, Prisma.FlwExecutionsUncheckedUpdateInput>;
    /**
     * Choose, which FlwExecutions to update.
     */
    where: Prisma.FlwExecutionsWhereUniqueInput;
};
/**
 * FlwExecutions updateMany
 */
export type FlwExecutionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FlwExecutions.
     */
    data: Prisma.XOR<Prisma.FlwExecutionsUpdateManyMutationInput, Prisma.FlwExecutionsUncheckedUpdateManyInput>;
    /**
     * Filter which FlwExecutions to update
     */
    where?: Prisma.FlwExecutionsWhereInput;
    /**
     * Limit how many FlwExecutions to update.
     */
    limit?: number;
};
/**
 * FlwExecutions updateManyAndReturn
 */
export type FlwExecutionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * The data used to update FlwExecutions.
     */
    data: Prisma.XOR<Prisma.FlwExecutionsUpdateManyMutationInput, Prisma.FlwExecutionsUncheckedUpdateManyInput>;
    /**
     * Filter which FlwExecutions to update
     */
    where?: Prisma.FlwExecutionsWhereInput;
    /**
     * Limit how many FlwExecutions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FlwExecutions upsert
 */
export type FlwExecutionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * The filter to search for the FlwExecutions to update in case it exists.
     */
    where: Prisma.FlwExecutionsWhereUniqueInput;
    /**
     * In case the FlwExecutions found by the `where` argument doesn't exist, create a new FlwExecutions with this data.
     */
    create: Prisma.XOR<Prisma.FlwExecutionsCreateInput, Prisma.FlwExecutionsUncheckedCreateInput>;
    /**
     * In case the FlwExecutions was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FlwExecutionsUpdateInput, Prisma.FlwExecutionsUncheckedUpdateInput>;
};
/**
 * FlwExecutions delete
 */
export type FlwExecutionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
    /**
     * Filter which FlwExecutions to delete.
     */
    where: Prisma.FlwExecutionsWhereUniqueInput;
};
/**
 * FlwExecutions deleteMany
 */
export type FlwExecutionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FlwExecutions to delete
     */
    where?: Prisma.FlwExecutionsWhereInput;
    /**
     * Limit how many FlwExecutions to delete.
     */
    limit?: number;
};
/**
 * FlwExecutions.FlwExecutionSteps
 */
export type FlwExecutions$FlwExecutionStepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.FlwExecutionStepsWhereInput;
    orderBy?: Prisma.FlwExecutionStepsOrderByWithRelationInput | Prisma.FlwExecutionStepsOrderByWithRelationInput[];
    cursor?: Prisma.FlwExecutionStepsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlwExecutionStepsScalarFieldEnum | Prisma.FlwExecutionStepsScalarFieldEnum[];
};
/**
 * FlwExecutions without action
 */
export type FlwExecutionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwExecutions
     */
    select?: Prisma.FlwExecutionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwExecutions
     */
    omit?: Prisma.FlwExecutionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwExecutionsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FlwExecutions.d.ts.map