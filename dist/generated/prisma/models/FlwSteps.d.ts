import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model FlwSteps
 *
 */
export type FlwStepsModel = runtime.Types.Result.DefaultSelection<Prisma.$FlwStepsPayload>;
export type AggregateFlwSteps = {
    _count: FlwStepsCountAggregateOutputType | null;
    _avg: FlwStepsAvgAggregateOutputType | null;
    _sum: FlwStepsSumAggregateOutputType | null;
    _min: FlwStepsMinAggregateOutputType | null;
    _max: FlwStepsMaxAggregateOutputType | null;
};
export type FlwStepsAvgAggregateOutputType = {
    position: number | null;
};
export type FlwStepsSumAggregateOutputType = {
    position: number | null;
};
export type FlwStepsMinAggregateOutputType = {
    id: string | null;
    flwId: string | null;
    name: string | null;
    position: number | null;
    type: $Enums.FlwStepType | null;
    integrationKey: string | null;
    operationKey: string | null;
};
export type FlwStepsMaxAggregateOutputType = {
    id: string | null;
    flwId: string | null;
    name: string | null;
    position: number | null;
    type: $Enums.FlwStepType | null;
    integrationKey: string | null;
    operationKey: string | null;
};
export type FlwStepsCountAggregateOutputType = {
    id: number;
    flwId: number;
    name: number;
    position: number;
    type: number;
    integrationKey: number;
    operationKey: number;
    configPayload: number;
    inputMapping: number;
    _all: number;
};
export type FlwStepsAvgAggregateInputType = {
    position?: true;
};
export type FlwStepsSumAggregateInputType = {
    position?: true;
};
export type FlwStepsMinAggregateInputType = {
    id?: true;
    flwId?: true;
    name?: true;
    position?: true;
    type?: true;
    integrationKey?: true;
    operationKey?: true;
};
export type FlwStepsMaxAggregateInputType = {
    id?: true;
    flwId?: true;
    name?: true;
    position?: true;
    type?: true;
    integrationKey?: true;
    operationKey?: true;
};
export type FlwStepsCountAggregateInputType = {
    id?: true;
    flwId?: true;
    name?: true;
    position?: true;
    type?: true;
    integrationKey?: true;
    operationKey?: true;
    configPayload?: true;
    inputMapping?: true;
    _all?: true;
};
export type FlwStepsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FlwSteps to aggregate.
     */
    where?: Prisma.FlwStepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwSteps to fetch.
     */
    orderBy?: Prisma.FlwStepsOrderByWithRelationInput | Prisma.FlwStepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FlwStepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwSteps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwSteps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FlwSteps
    **/
    _count?: true | FlwStepsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FlwStepsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FlwStepsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FlwStepsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FlwStepsMaxAggregateInputType;
};
export type GetFlwStepsAggregateType<T extends FlwStepsAggregateArgs> = {
    [P in keyof T & keyof AggregateFlwSteps]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFlwSteps[P]> : Prisma.GetScalarType<T[P], AggregateFlwSteps[P]>;
};
export type FlwStepsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwStepsWhereInput;
    orderBy?: Prisma.FlwStepsOrderByWithAggregationInput | Prisma.FlwStepsOrderByWithAggregationInput[];
    by: Prisma.FlwStepsScalarFieldEnum[] | Prisma.FlwStepsScalarFieldEnum;
    having?: Prisma.FlwStepsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FlwStepsCountAggregateInputType | true;
    _avg?: FlwStepsAvgAggregateInputType;
    _sum?: FlwStepsSumAggregateInputType;
    _min?: FlwStepsMinAggregateInputType;
    _max?: FlwStepsMaxAggregateInputType;
};
export type FlwStepsGroupByOutputType = {
    id: string;
    flwId: string;
    name: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey: string | null;
    configPayload: runtime.JsonValue | null;
    inputMapping: runtime.JsonValue | null;
    _count: FlwStepsCountAggregateOutputType | null;
    _avg: FlwStepsAvgAggregateOutputType | null;
    _sum: FlwStepsSumAggregateOutputType | null;
    _min: FlwStepsMinAggregateOutputType | null;
    _max: FlwStepsMaxAggregateOutputType | null;
};
type GetFlwStepsGroupByPayload<T extends FlwStepsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FlwStepsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FlwStepsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FlwStepsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FlwStepsGroupByOutputType[P]>;
}>>;
export type FlwStepsWhereInput = {
    AND?: Prisma.FlwStepsWhereInput | Prisma.FlwStepsWhereInput[];
    OR?: Prisma.FlwStepsWhereInput[];
    NOT?: Prisma.FlwStepsWhereInput | Prisma.FlwStepsWhereInput[];
    id?: Prisma.StringFilter<"FlwSteps"> | string;
    flwId?: Prisma.StringFilter<"FlwSteps"> | string;
    name?: Prisma.StringNullableFilter<"FlwSteps"> | string | null;
    position?: Prisma.IntFilter<"FlwSteps"> | number;
    type?: Prisma.EnumFlwStepTypeFilter<"FlwSteps"> | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFilter<"FlwSteps"> | string;
    operationKey?: Prisma.StringNullableFilter<"FlwSteps"> | string | null;
    configPayload?: Prisma.JsonNullableFilter<"FlwSteps">;
    inputMapping?: Prisma.JsonNullableFilter<"FlwSteps">;
    Flw?: Prisma.XOR<Prisma.FlwScalarRelationFilter, Prisma.FlwWhereInput>;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsListRelationFilter;
};
export type FlwStepsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    integrationKey?: Prisma.SortOrder;
    operationKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    configPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    inputMapping?: Prisma.SortOrderInput | Prisma.SortOrder;
    Flw?: Prisma.FlwOrderByWithRelationInput;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsOrderByRelationAggregateInput;
};
export type FlwStepsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    flwId_position?: Prisma.FlwStepsFlwIdPositionCompoundUniqueInput;
    AND?: Prisma.FlwStepsWhereInput | Prisma.FlwStepsWhereInput[];
    OR?: Prisma.FlwStepsWhereInput[];
    NOT?: Prisma.FlwStepsWhereInput | Prisma.FlwStepsWhereInput[];
    flwId?: Prisma.StringFilter<"FlwSteps"> | string;
    name?: Prisma.StringNullableFilter<"FlwSteps"> | string | null;
    position?: Prisma.IntFilter<"FlwSteps"> | number;
    type?: Prisma.EnumFlwStepTypeFilter<"FlwSteps"> | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFilter<"FlwSteps"> | string;
    operationKey?: Prisma.StringNullableFilter<"FlwSteps"> | string | null;
    configPayload?: Prisma.JsonNullableFilter<"FlwSteps">;
    inputMapping?: Prisma.JsonNullableFilter<"FlwSteps">;
    Flw?: Prisma.XOR<Prisma.FlwScalarRelationFilter, Prisma.FlwWhereInput>;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsListRelationFilter;
}, "id" | "flwId_position">;
export type FlwStepsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    integrationKey?: Prisma.SortOrder;
    operationKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    configPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    inputMapping?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.FlwStepsCountOrderByAggregateInput;
    _avg?: Prisma.FlwStepsAvgOrderByAggregateInput;
    _max?: Prisma.FlwStepsMaxOrderByAggregateInput;
    _min?: Prisma.FlwStepsMinOrderByAggregateInput;
    _sum?: Prisma.FlwStepsSumOrderByAggregateInput;
};
export type FlwStepsScalarWhereWithAggregatesInput = {
    AND?: Prisma.FlwStepsScalarWhereWithAggregatesInput | Prisma.FlwStepsScalarWhereWithAggregatesInput[];
    OR?: Prisma.FlwStepsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FlwStepsScalarWhereWithAggregatesInput | Prisma.FlwStepsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FlwSteps"> | string;
    flwId?: Prisma.StringWithAggregatesFilter<"FlwSteps"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"FlwSteps"> | string | null;
    position?: Prisma.IntWithAggregatesFilter<"FlwSteps"> | number;
    type?: Prisma.EnumFlwStepTypeWithAggregatesFilter<"FlwSteps"> | $Enums.FlwStepType;
    integrationKey?: Prisma.StringWithAggregatesFilter<"FlwSteps"> | string;
    operationKey?: Prisma.StringNullableWithAggregatesFilter<"FlwSteps"> | string | null;
    configPayload?: Prisma.JsonNullableWithAggregatesFilter<"FlwSteps">;
    inputMapping?: Prisma.JsonNullableWithAggregatesFilter<"FlwSteps">;
};
export type FlwStepsCreateInput = {
    id?: string;
    name?: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey?: string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    Flw: Prisma.FlwCreateNestedOneWithoutFlwStepsInput;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsCreateNestedManyWithoutFlwStepsInput;
};
export type FlwStepsUncheckedCreateInput = {
    id?: string;
    flwId: string;
    name?: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey?: string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUncheckedCreateNestedManyWithoutFlwStepsInput;
};
export type FlwStepsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    Flw?: Prisma.FlwUpdateOneRequiredWithoutFlwStepsNestedInput;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUpdateManyWithoutFlwStepsNestedInput;
};
export type FlwStepsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUncheckedUpdateManyWithoutFlwStepsNestedInput;
};
export type FlwStepsCreateManyInput = {
    id?: string;
    flwId: string;
    name?: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey?: string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type FlwStepsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type FlwStepsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type FlwStepsListRelationFilter = {
    every?: Prisma.FlwStepsWhereInput;
    some?: Prisma.FlwStepsWhereInput;
    none?: Prisma.FlwStepsWhereInput;
};
export type FlwStepsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FlwStepsFlwIdPositionCompoundUniqueInput = {
    flwId: string;
    position: number;
};
export type FlwStepsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    integrationKey?: Prisma.SortOrder;
    operationKey?: Prisma.SortOrder;
    configPayload?: Prisma.SortOrder;
    inputMapping?: Prisma.SortOrder;
};
export type FlwStepsAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type FlwStepsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    integrationKey?: Prisma.SortOrder;
    operationKey?: Prisma.SortOrder;
};
export type FlwStepsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    integrationKey?: Prisma.SortOrder;
    operationKey?: Prisma.SortOrder;
};
export type FlwStepsSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type FlwStepsScalarRelationFilter = {
    is?: Prisma.FlwStepsWhereInput;
    isNot?: Prisma.FlwStepsWhereInput;
};
export type FlwStepsCreateNestedManyWithoutFlwInput = {
    create?: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwInput, Prisma.FlwStepsUncheckedCreateWithoutFlwInput> | Prisma.FlwStepsCreateWithoutFlwInput[] | Prisma.FlwStepsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwStepsCreateOrConnectWithoutFlwInput | Prisma.FlwStepsCreateOrConnectWithoutFlwInput[];
    createMany?: Prisma.FlwStepsCreateManyFlwInputEnvelope;
    connect?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
};
export type FlwStepsUncheckedCreateNestedManyWithoutFlwInput = {
    create?: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwInput, Prisma.FlwStepsUncheckedCreateWithoutFlwInput> | Prisma.FlwStepsCreateWithoutFlwInput[] | Prisma.FlwStepsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwStepsCreateOrConnectWithoutFlwInput | Prisma.FlwStepsCreateOrConnectWithoutFlwInput[];
    createMany?: Prisma.FlwStepsCreateManyFlwInputEnvelope;
    connect?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
};
export type FlwStepsUpdateManyWithoutFlwNestedInput = {
    create?: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwInput, Prisma.FlwStepsUncheckedCreateWithoutFlwInput> | Prisma.FlwStepsCreateWithoutFlwInput[] | Prisma.FlwStepsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwStepsCreateOrConnectWithoutFlwInput | Prisma.FlwStepsCreateOrConnectWithoutFlwInput[];
    upsert?: Prisma.FlwStepsUpsertWithWhereUniqueWithoutFlwInput | Prisma.FlwStepsUpsertWithWhereUniqueWithoutFlwInput[];
    createMany?: Prisma.FlwStepsCreateManyFlwInputEnvelope;
    set?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
    disconnect?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
    delete?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
    connect?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
    update?: Prisma.FlwStepsUpdateWithWhereUniqueWithoutFlwInput | Prisma.FlwStepsUpdateWithWhereUniqueWithoutFlwInput[];
    updateMany?: Prisma.FlwStepsUpdateManyWithWhereWithoutFlwInput | Prisma.FlwStepsUpdateManyWithWhereWithoutFlwInput[];
    deleteMany?: Prisma.FlwStepsScalarWhereInput | Prisma.FlwStepsScalarWhereInput[];
};
export type FlwStepsUncheckedUpdateManyWithoutFlwNestedInput = {
    create?: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwInput, Prisma.FlwStepsUncheckedCreateWithoutFlwInput> | Prisma.FlwStepsCreateWithoutFlwInput[] | Prisma.FlwStepsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwStepsCreateOrConnectWithoutFlwInput | Prisma.FlwStepsCreateOrConnectWithoutFlwInput[];
    upsert?: Prisma.FlwStepsUpsertWithWhereUniqueWithoutFlwInput | Prisma.FlwStepsUpsertWithWhereUniqueWithoutFlwInput[];
    createMany?: Prisma.FlwStepsCreateManyFlwInputEnvelope;
    set?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
    disconnect?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
    delete?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
    connect?: Prisma.FlwStepsWhereUniqueInput | Prisma.FlwStepsWhereUniqueInput[];
    update?: Prisma.FlwStepsUpdateWithWhereUniqueWithoutFlwInput | Prisma.FlwStepsUpdateWithWhereUniqueWithoutFlwInput[];
    updateMany?: Prisma.FlwStepsUpdateManyWithWhereWithoutFlwInput | Prisma.FlwStepsUpdateManyWithWhereWithoutFlwInput[];
    deleteMany?: Prisma.FlwStepsScalarWhereInput | Prisma.FlwStepsScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumFlwStepTypeFieldUpdateOperationsInput = {
    set?: $Enums.FlwStepType;
};
export type FlwStepsCreateNestedOneWithoutFlwExecutionStepsInput = {
    create?: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwExecutionStepsInput, Prisma.FlwStepsUncheckedCreateWithoutFlwExecutionStepsInput>;
    connectOrCreate?: Prisma.FlwStepsCreateOrConnectWithoutFlwExecutionStepsInput;
    connect?: Prisma.FlwStepsWhereUniqueInput;
};
export type FlwStepsUpdateOneRequiredWithoutFlwExecutionStepsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwExecutionStepsInput, Prisma.FlwStepsUncheckedCreateWithoutFlwExecutionStepsInput>;
    connectOrCreate?: Prisma.FlwStepsCreateOrConnectWithoutFlwExecutionStepsInput;
    upsert?: Prisma.FlwStepsUpsertWithoutFlwExecutionStepsInput;
    connect?: Prisma.FlwStepsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FlwStepsUpdateToOneWithWhereWithoutFlwExecutionStepsInput, Prisma.FlwStepsUpdateWithoutFlwExecutionStepsInput>, Prisma.FlwStepsUncheckedUpdateWithoutFlwExecutionStepsInput>;
};
export type FlwStepsCreateWithoutFlwInput = {
    id?: string;
    name?: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey?: string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsCreateNestedManyWithoutFlwStepsInput;
};
export type FlwStepsUncheckedCreateWithoutFlwInput = {
    id?: string;
    name?: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey?: string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUncheckedCreateNestedManyWithoutFlwStepsInput;
};
export type FlwStepsCreateOrConnectWithoutFlwInput = {
    where: Prisma.FlwStepsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwInput, Prisma.FlwStepsUncheckedCreateWithoutFlwInput>;
};
export type FlwStepsCreateManyFlwInputEnvelope = {
    data: Prisma.FlwStepsCreateManyFlwInput | Prisma.FlwStepsCreateManyFlwInput[];
    skipDuplicates?: boolean;
};
export type FlwStepsUpsertWithWhereUniqueWithoutFlwInput = {
    where: Prisma.FlwStepsWhereUniqueInput;
    update: Prisma.XOR<Prisma.FlwStepsUpdateWithoutFlwInput, Prisma.FlwStepsUncheckedUpdateWithoutFlwInput>;
    create: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwInput, Prisma.FlwStepsUncheckedCreateWithoutFlwInput>;
};
export type FlwStepsUpdateWithWhereUniqueWithoutFlwInput = {
    where: Prisma.FlwStepsWhereUniqueInput;
    data: Prisma.XOR<Prisma.FlwStepsUpdateWithoutFlwInput, Prisma.FlwStepsUncheckedUpdateWithoutFlwInput>;
};
export type FlwStepsUpdateManyWithWhereWithoutFlwInput = {
    where: Prisma.FlwStepsScalarWhereInput;
    data: Prisma.XOR<Prisma.FlwStepsUpdateManyMutationInput, Prisma.FlwStepsUncheckedUpdateManyWithoutFlwInput>;
};
export type FlwStepsScalarWhereInput = {
    AND?: Prisma.FlwStepsScalarWhereInput | Prisma.FlwStepsScalarWhereInput[];
    OR?: Prisma.FlwStepsScalarWhereInput[];
    NOT?: Prisma.FlwStepsScalarWhereInput | Prisma.FlwStepsScalarWhereInput[];
    id?: Prisma.StringFilter<"FlwSteps"> | string;
    flwId?: Prisma.StringFilter<"FlwSteps"> | string;
    name?: Prisma.StringNullableFilter<"FlwSteps"> | string | null;
    position?: Prisma.IntFilter<"FlwSteps"> | number;
    type?: Prisma.EnumFlwStepTypeFilter<"FlwSteps"> | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFilter<"FlwSteps"> | string;
    operationKey?: Prisma.StringNullableFilter<"FlwSteps"> | string | null;
    configPayload?: Prisma.JsonNullableFilter<"FlwSteps">;
    inputMapping?: Prisma.JsonNullableFilter<"FlwSteps">;
};
export type FlwStepsCreateWithoutFlwExecutionStepsInput = {
    id?: string;
    name?: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey?: string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    Flw: Prisma.FlwCreateNestedOneWithoutFlwStepsInput;
};
export type FlwStepsUncheckedCreateWithoutFlwExecutionStepsInput = {
    id?: string;
    flwId: string;
    name?: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey?: string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type FlwStepsCreateOrConnectWithoutFlwExecutionStepsInput = {
    where: Prisma.FlwStepsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwExecutionStepsInput, Prisma.FlwStepsUncheckedCreateWithoutFlwExecutionStepsInput>;
};
export type FlwStepsUpsertWithoutFlwExecutionStepsInput = {
    update: Prisma.XOR<Prisma.FlwStepsUpdateWithoutFlwExecutionStepsInput, Prisma.FlwStepsUncheckedUpdateWithoutFlwExecutionStepsInput>;
    create: Prisma.XOR<Prisma.FlwStepsCreateWithoutFlwExecutionStepsInput, Prisma.FlwStepsUncheckedCreateWithoutFlwExecutionStepsInput>;
    where?: Prisma.FlwStepsWhereInput;
};
export type FlwStepsUpdateToOneWithWhereWithoutFlwExecutionStepsInput = {
    where?: Prisma.FlwStepsWhereInput;
    data: Prisma.XOR<Prisma.FlwStepsUpdateWithoutFlwExecutionStepsInput, Prisma.FlwStepsUncheckedUpdateWithoutFlwExecutionStepsInput>;
};
export type FlwStepsUpdateWithoutFlwExecutionStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    Flw?: Prisma.FlwUpdateOneRequiredWithoutFlwStepsNestedInput;
};
export type FlwStepsUncheckedUpdateWithoutFlwExecutionStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type FlwStepsCreateManyFlwInput = {
    id?: string;
    name?: string | null;
    position: number;
    type: $Enums.FlwStepType;
    integrationKey: string;
    operationKey?: string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type FlwStepsUpdateWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUpdateManyWithoutFlwStepsNestedInput;
};
export type FlwStepsUncheckedUpdateWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    FlwExecutionSteps?: Prisma.FlwExecutionStepsUncheckedUpdateManyWithoutFlwStepsNestedInput;
};
export type FlwStepsUncheckedUpdateManyWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumFlwStepTypeFieldUpdateOperationsInput | $Enums.FlwStepType;
    integrationKey?: Prisma.StringFieldUpdateOperationsInput | string;
    operationKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    configPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    inputMapping?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
/**
 * Count Type FlwStepsCountOutputType
 */
export type FlwStepsCountOutputType = {
    FlwExecutionSteps: number;
};
export type FlwStepsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    FlwExecutionSteps?: boolean | FlwStepsCountOutputTypeCountFlwExecutionStepsArgs;
};
/**
 * FlwStepsCountOutputType without action
 */
export type FlwStepsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwStepsCountOutputType
     */
    select?: Prisma.FlwStepsCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * FlwStepsCountOutputType without action
 */
export type FlwStepsCountOutputTypeCountFlwExecutionStepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwExecutionStepsWhereInput;
};
export type FlwStepsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    name?: boolean;
    position?: boolean;
    type?: boolean;
    integrationKey?: boolean;
    operationKey?: boolean;
    configPayload?: boolean;
    inputMapping?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwExecutionSteps?: boolean | Prisma.FlwSteps$FlwExecutionStepsArgs<ExtArgs>;
    _count?: boolean | Prisma.FlwStepsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwSteps"]>;
export type FlwStepsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    name?: boolean;
    position?: boolean;
    type?: boolean;
    integrationKey?: boolean;
    operationKey?: boolean;
    configPayload?: boolean;
    inputMapping?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwSteps"]>;
export type FlwStepsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    name?: boolean;
    position?: boolean;
    type?: boolean;
    integrationKey?: boolean;
    operationKey?: boolean;
    configPayload?: boolean;
    inputMapping?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flwSteps"]>;
export type FlwStepsSelectScalar = {
    id?: boolean;
    flwId?: boolean;
    name?: boolean;
    position?: boolean;
    type?: boolean;
    integrationKey?: boolean;
    operationKey?: boolean;
    configPayload?: boolean;
    inputMapping?: boolean;
};
export type FlwStepsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "flwId" | "name" | "position" | "type" | "integrationKey" | "operationKey" | "configPayload" | "inputMapping", ExtArgs["result"]["flwSteps"]>;
export type FlwStepsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwExecutionSteps?: boolean | Prisma.FlwSteps$FlwExecutionStepsArgs<ExtArgs>;
    _count?: boolean | Prisma.FlwStepsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FlwStepsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
};
export type FlwStepsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
};
export type $FlwStepsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FlwSteps";
    objects: {
        Flw: Prisma.$FlwPayload<ExtArgs>;
        FlwExecutionSteps: Prisma.$FlwExecutionStepsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        flwId: string;
        name: string | null;
        position: number;
        type: $Enums.FlwStepType;
        integrationKey: string;
        operationKey: string | null;
        configPayload: runtime.JsonValue | null;
        inputMapping: runtime.JsonValue | null;
    }, ExtArgs["result"]["flwSteps"]>;
    composites: {};
};
export type FlwStepsGetPayload<S extends boolean | null | undefined | FlwStepsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload, S>;
export type FlwStepsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FlwStepsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FlwStepsCountAggregateInputType | true;
};
export interface FlwStepsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FlwSteps'];
        meta: {
            name: 'FlwSteps';
        };
    };
    /**
     * Find zero or one FlwSteps that matches the filter.
     * @param {FlwStepsFindUniqueArgs} args - Arguments to find a FlwSteps
     * @example
     * // Get one FlwSteps
     * const flwSteps = await prisma.flwSteps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlwStepsFindUniqueArgs>(args: Prisma.SelectSubset<T, FlwStepsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FlwSteps that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlwStepsFindUniqueOrThrowArgs} args - Arguments to find a FlwSteps
     * @example
     * // Get one FlwSteps
     * const flwSteps = await prisma.flwSteps.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlwStepsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FlwStepsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlwSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwStepsFindFirstArgs} args - Arguments to find a FlwSteps
     * @example
     * // Get one FlwSteps
     * const flwSteps = await prisma.flwSteps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlwStepsFindFirstArgs>(args?: Prisma.SelectSubset<T, FlwStepsFindFirstArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlwSteps that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwStepsFindFirstOrThrowArgs} args - Arguments to find a FlwSteps
     * @example
     * // Get one FlwSteps
     * const flwSteps = await prisma.flwSteps.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlwStepsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FlwStepsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FlwSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwStepsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FlwSteps
     * const flwSteps = await prisma.flwSteps.findMany()
     *
     * // Get first 10 FlwSteps
     * const flwSteps = await prisma.flwSteps.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const flwStepsWithIdOnly = await prisma.flwSteps.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FlwStepsFindManyArgs>(args?: Prisma.SelectSubset<T, FlwStepsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FlwSteps.
     * @param {FlwStepsCreateArgs} args - Arguments to create a FlwSteps.
     * @example
     * // Create one FlwSteps
     * const FlwSteps = await prisma.flwSteps.create({
     *   data: {
     *     // ... data to create a FlwSteps
     *   }
     * })
     *
     */
    create<T extends FlwStepsCreateArgs>(args: Prisma.SelectSubset<T, FlwStepsCreateArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FlwSteps.
     * @param {FlwStepsCreateManyArgs} args - Arguments to create many FlwSteps.
     * @example
     * // Create many FlwSteps
     * const flwSteps = await prisma.flwSteps.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FlwStepsCreateManyArgs>(args?: Prisma.SelectSubset<T, FlwStepsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FlwSteps and returns the data saved in the database.
     * @param {FlwStepsCreateManyAndReturnArgs} args - Arguments to create many FlwSteps.
     * @example
     * // Create many FlwSteps
     * const flwSteps = await prisma.flwSteps.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FlwSteps and only return the `id`
     * const flwStepsWithIdOnly = await prisma.flwSteps.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FlwStepsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FlwStepsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FlwSteps.
     * @param {FlwStepsDeleteArgs} args - Arguments to delete one FlwSteps.
     * @example
     * // Delete one FlwSteps
     * const FlwSteps = await prisma.flwSteps.delete({
     *   where: {
     *     // ... filter to delete one FlwSteps
     *   }
     * })
     *
     */
    delete<T extends FlwStepsDeleteArgs>(args: Prisma.SelectSubset<T, FlwStepsDeleteArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FlwSteps.
     * @param {FlwStepsUpdateArgs} args - Arguments to update one FlwSteps.
     * @example
     * // Update one FlwSteps
     * const flwSteps = await prisma.flwSteps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FlwStepsUpdateArgs>(args: Prisma.SelectSubset<T, FlwStepsUpdateArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FlwSteps.
     * @param {FlwStepsDeleteManyArgs} args - Arguments to filter FlwSteps to delete.
     * @example
     * // Delete a few FlwSteps
     * const { count } = await prisma.flwSteps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FlwStepsDeleteManyArgs>(args?: Prisma.SelectSubset<T, FlwStepsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlwSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwStepsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FlwSteps
     * const flwSteps = await prisma.flwSteps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FlwStepsUpdateManyArgs>(args: Prisma.SelectSubset<T, FlwStepsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlwSteps and returns the data updated in the database.
     * @param {FlwStepsUpdateManyAndReturnArgs} args - Arguments to update many FlwSteps.
     * @example
     * // Update many FlwSteps
     * const flwSteps = await prisma.flwSteps.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FlwSteps and only return the `id`
     * const flwStepsWithIdOnly = await prisma.flwSteps.updateManyAndReturn({
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
    updateManyAndReturn<T extends FlwStepsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FlwStepsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FlwSteps.
     * @param {FlwStepsUpsertArgs} args - Arguments to update or create a FlwSteps.
     * @example
     * // Update or create a FlwSteps
     * const flwSteps = await prisma.flwSteps.upsert({
     *   create: {
     *     // ... data to create a FlwSteps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FlwSteps we want to update
     *   }
     * })
     */
    upsert<T extends FlwStepsUpsertArgs>(args: Prisma.SelectSubset<T, FlwStepsUpsertArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FlwSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwStepsCountArgs} args - Arguments to filter FlwSteps to count.
     * @example
     * // Count the number of FlwSteps
     * const count = await prisma.flwSteps.count({
     *   where: {
     *     // ... the filter for the FlwSteps we want to count
     *   }
     * })
    **/
    count<T extends FlwStepsCountArgs>(args?: Prisma.Subset<T, FlwStepsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FlwStepsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FlwSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwStepsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FlwStepsAggregateArgs>(args: Prisma.Subset<T, FlwStepsAggregateArgs>): Prisma.PrismaPromise<GetFlwStepsAggregateType<T>>;
    /**
     * Group by FlwSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwStepsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FlwStepsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FlwStepsGroupByArgs['orderBy'];
    } : {
        orderBy?: FlwStepsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FlwStepsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlwStepsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FlwSteps model
     */
    readonly fields: FlwStepsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FlwSteps.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FlwStepsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    Flw<T extends Prisma.FlwDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlwDefaultArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    FlwExecutionSteps<T extends Prisma.FlwSteps$FlwExecutionStepsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlwSteps$FlwExecutionStepsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionStepsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the FlwSteps model
 */
export interface FlwStepsFieldRefs {
    readonly id: Prisma.FieldRef<"FlwSteps", 'String'>;
    readonly flwId: Prisma.FieldRef<"FlwSteps", 'String'>;
    readonly name: Prisma.FieldRef<"FlwSteps", 'String'>;
    readonly position: Prisma.FieldRef<"FlwSteps", 'Int'>;
    readonly type: Prisma.FieldRef<"FlwSteps", 'FlwStepType'>;
    readonly integrationKey: Prisma.FieldRef<"FlwSteps", 'String'>;
    readonly operationKey: Prisma.FieldRef<"FlwSteps", 'String'>;
    readonly configPayload: Prisma.FieldRef<"FlwSteps", 'Json'>;
    readonly inputMapping: Prisma.FieldRef<"FlwSteps", 'Json'>;
}
/**
 * FlwSteps findUnique
 */
export type FlwStepsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwSteps to fetch.
     */
    where: Prisma.FlwStepsWhereUniqueInput;
};
/**
 * FlwSteps findUniqueOrThrow
 */
export type FlwStepsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwSteps to fetch.
     */
    where: Prisma.FlwStepsWhereUniqueInput;
};
/**
 * FlwSteps findFirst
 */
export type FlwStepsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwSteps to fetch.
     */
    where?: Prisma.FlwStepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwSteps to fetch.
     */
    orderBy?: Prisma.FlwStepsOrderByWithRelationInput | Prisma.FlwStepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FlwSteps.
     */
    cursor?: Prisma.FlwStepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwSteps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwSteps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FlwSteps.
     */
    distinct?: Prisma.FlwStepsScalarFieldEnum | Prisma.FlwStepsScalarFieldEnum[];
};
/**
 * FlwSteps findFirstOrThrow
 */
export type FlwStepsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwSteps to fetch.
     */
    where?: Prisma.FlwStepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwSteps to fetch.
     */
    orderBy?: Prisma.FlwStepsOrderByWithRelationInput | Prisma.FlwStepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FlwSteps.
     */
    cursor?: Prisma.FlwStepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwSteps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwSteps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FlwSteps.
     */
    distinct?: Prisma.FlwStepsScalarFieldEnum | Prisma.FlwStepsScalarFieldEnum[];
};
/**
 * FlwSteps findMany
 */
export type FlwStepsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwSteps to fetch.
     */
    where?: Prisma.FlwStepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwSteps to fetch.
     */
    orderBy?: Prisma.FlwStepsOrderByWithRelationInput | Prisma.FlwStepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FlwSteps.
     */
    cursor?: Prisma.FlwStepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwSteps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwSteps.
     */
    skip?: number;
    distinct?: Prisma.FlwStepsScalarFieldEnum | Prisma.FlwStepsScalarFieldEnum[];
};
/**
 * FlwSteps create
 */
export type FlwStepsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * The data needed to create a FlwSteps.
     */
    data: Prisma.XOR<Prisma.FlwStepsCreateInput, Prisma.FlwStepsUncheckedCreateInput>;
};
/**
 * FlwSteps createMany
 */
export type FlwStepsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FlwSteps.
     */
    data: Prisma.FlwStepsCreateManyInput | Prisma.FlwStepsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FlwSteps createManyAndReturn
 */
export type FlwStepsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * The data used to create many FlwSteps.
     */
    data: Prisma.FlwStepsCreateManyInput | Prisma.FlwStepsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FlwSteps update
 */
export type FlwStepsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * The data needed to update a FlwSteps.
     */
    data: Prisma.XOR<Prisma.FlwStepsUpdateInput, Prisma.FlwStepsUncheckedUpdateInput>;
    /**
     * Choose, which FlwSteps to update.
     */
    where: Prisma.FlwStepsWhereUniqueInput;
};
/**
 * FlwSteps updateMany
 */
export type FlwStepsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FlwSteps.
     */
    data: Prisma.XOR<Prisma.FlwStepsUpdateManyMutationInput, Prisma.FlwStepsUncheckedUpdateManyInput>;
    /**
     * Filter which FlwSteps to update
     */
    where?: Prisma.FlwStepsWhereInput;
    /**
     * Limit how many FlwSteps to update.
     */
    limit?: number;
};
/**
 * FlwSteps updateManyAndReturn
 */
export type FlwStepsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * The data used to update FlwSteps.
     */
    data: Prisma.XOR<Prisma.FlwStepsUpdateManyMutationInput, Prisma.FlwStepsUncheckedUpdateManyInput>;
    /**
     * Filter which FlwSteps to update
     */
    where?: Prisma.FlwStepsWhereInput;
    /**
     * Limit how many FlwSteps to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FlwSteps upsert
 */
export type FlwStepsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * The filter to search for the FlwSteps to update in case it exists.
     */
    where: Prisma.FlwStepsWhereUniqueInput;
    /**
     * In case the FlwSteps found by the `where` argument doesn't exist, create a new FlwSteps with this data.
     */
    create: Prisma.XOR<Prisma.FlwStepsCreateInput, Prisma.FlwStepsUncheckedCreateInput>;
    /**
     * In case the FlwSteps was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FlwStepsUpdateInput, Prisma.FlwStepsUncheckedUpdateInput>;
};
/**
 * FlwSteps delete
 */
export type FlwStepsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
    /**
     * Filter which FlwSteps to delete.
     */
    where: Prisma.FlwStepsWhereUniqueInput;
};
/**
 * FlwSteps deleteMany
 */
export type FlwStepsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FlwSteps to delete
     */
    where?: Prisma.FlwStepsWhereInput;
    /**
     * Limit how many FlwSteps to delete.
     */
    limit?: number;
};
/**
 * FlwSteps.FlwExecutionSteps
 */
export type FlwSteps$FlwExecutionStepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * FlwSteps without action
 */
export type FlwStepsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwSteps
     */
    select?: Prisma.FlwStepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwSteps
     */
    omit?: Prisma.FlwStepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwStepsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FlwSteps.d.ts.map