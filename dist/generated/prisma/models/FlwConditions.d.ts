import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model FlwConditions
 *
 */
export type FlwConditionsModel = runtime.Types.Result.DefaultSelection<Prisma.$FlwConditionsPayload>;
export type AggregateFlwConditions = {
    _count: FlwConditionsCountAggregateOutputType | null;
    _avg: FlwConditionsAvgAggregateOutputType | null;
    _sum: FlwConditionsSumAggregateOutputType | null;
    _min: FlwConditionsMinAggregateOutputType | null;
    _max: FlwConditionsMaxAggregateOutputType | null;
};
export type FlwConditionsAvgAggregateOutputType = {
    position: number | null;
};
export type FlwConditionsSumAggregateOutputType = {
    position: number | null;
};
export type FlwConditionsMinAggregateOutputType = {
    id: string | null;
    flwId: string | null;
    flwStepId: string | null;
    sourceType: $Enums.FlwConditionSourceType | null;
    sourceStepId: string | null;
    fieldPath: string | null;
    operator: $Enums.FlwConditionOperator | null;
    logicGate: $Enums.FlwConditionLogicGate | null;
    position: number | null;
};
export type FlwConditionsMaxAggregateOutputType = {
    id: string | null;
    flwId: string | null;
    flwStepId: string | null;
    sourceType: $Enums.FlwConditionSourceType | null;
    sourceStepId: string | null;
    fieldPath: string | null;
    operator: $Enums.FlwConditionOperator | null;
    logicGate: $Enums.FlwConditionLogicGate | null;
    position: number | null;
};
export type FlwConditionsCountAggregateOutputType = {
    id: number;
    flwId: number;
    flwStepId: number;
    sourceType: number;
    sourceStepId: number;
    fieldPath: number;
    operator: number;
    comparisonValue: number;
    logicGate: number;
    position: number;
    _all: number;
};
export type FlwConditionsAvgAggregateInputType = {
    position?: true;
};
export type FlwConditionsSumAggregateInputType = {
    position?: true;
};
export type FlwConditionsMinAggregateInputType = {
    id?: true;
    flwId?: true;
    flwStepId?: true;
    sourceType?: true;
    sourceStepId?: true;
    fieldPath?: true;
    operator?: true;
    logicGate?: true;
    position?: true;
};
export type FlwConditionsMaxAggregateInputType = {
    id?: true;
    flwId?: true;
    flwStepId?: true;
    sourceType?: true;
    sourceStepId?: true;
    fieldPath?: true;
    operator?: true;
    logicGate?: true;
    position?: true;
};
export type FlwConditionsCountAggregateInputType = {
    id?: true;
    flwId?: true;
    flwStepId?: true;
    sourceType?: true;
    sourceStepId?: true;
    fieldPath?: true;
    operator?: true;
    comparisonValue?: true;
    logicGate?: true;
    position?: true;
    _all?: true;
};
export type FlwConditionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FlwConditions to aggregate.
     */
    where?: Prisma.FlwConditionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwConditions to fetch.
     */
    orderBy?: Prisma.FlwConditionsOrderByWithRelationInput | Prisma.FlwConditionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FlwConditionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwConditions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwConditions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FlwConditions
    **/
    _count?: true | FlwConditionsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FlwConditionsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FlwConditionsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FlwConditionsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FlwConditionsMaxAggregateInputType;
};
export type GetFlwConditionsAggregateType<T extends FlwConditionsAggregateArgs> = {
    [P in keyof T & keyof AggregateFlwConditions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFlwConditions[P]> : Prisma.GetScalarType<T[P], AggregateFlwConditions[P]>;
};
export type FlwConditionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwConditionsWhereInput;
    orderBy?: Prisma.FlwConditionsOrderByWithAggregationInput | Prisma.FlwConditionsOrderByWithAggregationInput[];
    by: Prisma.FlwConditionsScalarFieldEnum[] | Prisma.FlwConditionsScalarFieldEnum;
    having?: Prisma.FlwConditionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FlwConditionsCountAggregateInputType | true;
    _avg?: FlwConditionsAvgAggregateInputType;
    _sum?: FlwConditionsSumAggregateInputType;
    _min?: FlwConditionsMinAggregateInputType;
    _max?: FlwConditionsMaxAggregateInputType;
};
export type FlwConditionsGroupByOutputType = {
    id: string;
    flwId: string;
    flwStepId: string | null;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue: runtime.JsonValue | null;
    logicGate: $Enums.FlwConditionLogicGate;
    position: number;
    _count: FlwConditionsCountAggregateOutputType | null;
    _avg: FlwConditionsAvgAggregateOutputType | null;
    _sum: FlwConditionsSumAggregateOutputType | null;
    _min: FlwConditionsMinAggregateOutputType | null;
    _max: FlwConditionsMaxAggregateOutputType | null;
};
type GetFlwConditionsGroupByPayload<T extends FlwConditionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FlwConditionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FlwConditionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FlwConditionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FlwConditionsGroupByOutputType[P]>;
}>>;
export type FlwConditionsWhereInput = {
    AND?: Prisma.FlwConditionsWhereInput | Prisma.FlwConditionsWhereInput[];
    OR?: Prisma.FlwConditionsWhereInput[];
    NOT?: Prisma.FlwConditionsWhereInput | Prisma.FlwConditionsWhereInput[];
    id?: Prisma.StringFilter<"FlwConditions"> | string;
    flwId?: Prisma.StringFilter<"FlwConditions"> | string;
    flwStepId?: Prisma.StringNullableFilter<"FlwConditions"> | string | null;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFilter<"FlwConditions"> | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.StringNullableFilter<"FlwConditions"> | string | null;
    fieldPath?: Prisma.StringFilter<"FlwConditions"> | string;
    operator?: Prisma.EnumFlwConditionOperatorFilter<"FlwConditions"> | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.JsonNullableFilter<"FlwConditions">;
    logicGate?: Prisma.EnumFlwConditionLogicGateFilter<"FlwConditions"> | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFilter<"FlwConditions"> | number;
    Flw?: Prisma.XOR<Prisma.FlwScalarRelationFilter, Prisma.FlwWhereInput>;
    FlwSteps?: Prisma.XOR<Prisma.FlwStepsNullableScalarRelationFilter, Prisma.FlwStepsWhereInput> | null;
};
export type FlwConditionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceStepId?: Prisma.SortOrderInput | Prisma.SortOrder;
    fieldPath?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    comparisonValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    logicGate?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    Flw?: Prisma.FlwOrderByWithRelationInput;
    FlwSteps?: Prisma.FlwStepsOrderByWithRelationInput;
};
export type FlwConditionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FlwConditionsWhereInput | Prisma.FlwConditionsWhereInput[];
    OR?: Prisma.FlwConditionsWhereInput[];
    NOT?: Prisma.FlwConditionsWhereInput | Prisma.FlwConditionsWhereInput[];
    flwId?: Prisma.StringFilter<"FlwConditions"> | string;
    flwStepId?: Prisma.StringNullableFilter<"FlwConditions"> | string | null;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFilter<"FlwConditions"> | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.StringNullableFilter<"FlwConditions"> | string | null;
    fieldPath?: Prisma.StringFilter<"FlwConditions"> | string;
    operator?: Prisma.EnumFlwConditionOperatorFilter<"FlwConditions"> | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.JsonNullableFilter<"FlwConditions">;
    logicGate?: Prisma.EnumFlwConditionLogicGateFilter<"FlwConditions"> | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFilter<"FlwConditions"> | number;
    Flw?: Prisma.XOR<Prisma.FlwScalarRelationFilter, Prisma.FlwWhereInput>;
    FlwSteps?: Prisma.XOR<Prisma.FlwStepsNullableScalarRelationFilter, Prisma.FlwStepsWhereInput> | null;
}, "id">;
export type FlwConditionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceStepId?: Prisma.SortOrderInput | Prisma.SortOrder;
    fieldPath?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    comparisonValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    logicGate?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.FlwConditionsCountOrderByAggregateInput;
    _avg?: Prisma.FlwConditionsAvgOrderByAggregateInput;
    _max?: Prisma.FlwConditionsMaxOrderByAggregateInput;
    _min?: Prisma.FlwConditionsMinOrderByAggregateInput;
    _sum?: Prisma.FlwConditionsSumOrderByAggregateInput;
};
export type FlwConditionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.FlwConditionsScalarWhereWithAggregatesInput | Prisma.FlwConditionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.FlwConditionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FlwConditionsScalarWhereWithAggregatesInput | Prisma.FlwConditionsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FlwConditions"> | string;
    flwId?: Prisma.StringWithAggregatesFilter<"FlwConditions"> | string;
    flwStepId?: Prisma.StringNullableWithAggregatesFilter<"FlwConditions"> | string | null;
    sourceType?: Prisma.EnumFlwConditionSourceTypeWithAggregatesFilter<"FlwConditions"> | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.StringNullableWithAggregatesFilter<"FlwConditions"> | string | null;
    fieldPath?: Prisma.StringWithAggregatesFilter<"FlwConditions"> | string;
    operator?: Prisma.EnumFlwConditionOperatorWithAggregatesFilter<"FlwConditions"> | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.JsonNullableWithAggregatesFilter<"FlwConditions">;
    logicGate?: Prisma.EnumFlwConditionLogicGateWithAggregatesFilter<"FlwConditions"> | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntWithAggregatesFilter<"FlwConditions"> | number;
};
export type FlwConditionsCreateInput = {
    id?: string;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
    Flw: Prisma.FlwCreateNestedOneWithoutFlwConditionsInput;
    FlwSteps?: Prisma.FlwStepsCreateNestedOneWithoutFlwConditionsInput;
};
export type FlwConditionsUncheckedCreateInput = {
    id?: string;
    flwId: string;
    flwStepId?: string | null;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
};
export type FlwConditionsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    Flw?: Prisma.FlwUpdateOneRequiredWithoutFlwConditionsNestedInput;
    FlwSteps?: Prisma.FlwStepsUpdateOneWithoutFlwConditionsNestedInput;
};
export type FlwConditionsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    flwStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type FlwConditionsCreateManyInput = {
    id?: string;
    flwId: string;
    flwStepId?: string | null;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
};
export type FlwConditionsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type FlwConditionsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    flwStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type FlwConditionsListRelationFilter = {
    every?: Prisma.FlwConditionsWhereInput;
    some?: Prisma.FlwConditionsWhereInput;
    none?: Prisma.FlwConditionsWhereInput;
};
export type FlwConditionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FlwConditionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceStepId?: Prisma.SortOrder;
    fieldPath?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    comparisonValue?: Prisma.SortOrder;
    logicGate?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type FlwConditionsAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type FlwConditionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceStepId?: Prisma.SortOrder;
    fieldPath?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    logicGate?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type FlwConditionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flwId?: Prisma.SortOrder;
    flwStepId?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceStepId?: Prisma.SortOrder;
    fieldPath?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    logicGate?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type FlwConditionsSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type FlwConditionsCreateNestedManyWithoutFlwInput = {
    create?: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwInput> | Prisma.FlwConditionsCreateWithoutFlwInput[] | Prisma.FlwConditionsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwConditionsCreateOrConnectWithoutFlwInput | Prisma.FlwConditionsCreateOrConnectWithoutFlwInput[];
    createMany?: Prisma.FlwConditionsCreateManyFlwInputEnvelope;
    connect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
};
export type FlwConditionsUncheckedCreateNestedManyWithoutFlwInput = {
    create?: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwInput> | Prisma.FlwConditionsCreateWithoutFlwInput[] | Prisma.FlwConditionsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwConditionsCreateOrConnectWithoutFlwInput | Prisma.FlwConditionsCreateOrConnectWithoutFlwInput[];
    createMany?: Prisma.FlwConditionsCreateManyFlwInputEnvelope;
    connect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
};
export type FlwConditionsUpdateManyWithoutFlwNestedInput = {
    create?: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwInput> | Prisma.FlwConditionsCreateWithoutFlwInput[] | Prisma.FlwConditionsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwConditionsCreateOrConnectWithoutFlwInput | Prisma.FlwConditionsCreateOrConnectWithoutFlwInput[];
    upsert?: Prisma.FlwConditionsUpsertWithWhereUniqueWithoutFlwInput | Prisma.FlwConditionsUpsertWithWhereUniqueWithoutFlwInput[];
    createMany?: Prisma.FlwConditionsCreateManyFlwInputEnvelope;
    set?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    disconnect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    delete?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    connect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    update?: Prisma.FlwConditionsUpdateWithWhereUniqueWithoutFlwInput | Prisma.FlwConditionsUpdateWithWhereUniqueWithoutFlwInput[];
    updateMany?: Prisma.FlwConditionsUpdateManyWithWhereWithoutFlwInput | Prisma.FlwConditionsUpdateManyWithWhereWithoutFlwInput[];
    deleteMany?: Prisma.FlwConditionsScalarWhereInput | Prisma.FlwConditionsScalarWhereInput[];
};
export type FlwConditionsUncheckedUpdateManyWithoutFlwNestedInput = {
    create?: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwInput> | Prisma.FlwConditionsCreateWithoutFlwInput[] | Prisma.FlwConditionsUncheckedCreateWithoutFlwInput[];
    connectOrCreate?: Prisma.FlwConditionsCreateOrConnectWithoutFlwInput | Prisma.FlwConditionsCreateOrConnectWithoutFlwInput[];
    upsert?: Prisma.FlwConditionsUpsertWithWhereUniqueWithoutFlwInput | Prisma.FlwConditionsUpsertWithWhereUniqueWithoutFlwInput[];
    createMany?: Prisma.FlwConditionsCreateManyFlwInputEnvelope;
    set?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    disconnect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    delete?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    connect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    update?: Prisma.FlwConditionsUpdateWithWhereUniqueWithoutFlwInput | Prisma.FlwConditionsUpdateWithWhereUniqueWithoutFlwInput[];
    updateMany?: Prisma.FlwConditionsUpdateManyWithWhereWithoutFlwInput | Prisma.FlwConditionsUpdateManyWithWhereWithoutFlwInput[];
    deleteMany?: Prisma.FlwConditionsScalarWhereInput | Prisma.FlwConditionsScalarWhereInput[];
};
export type FlwConditionsCreateNestedManyWithoutFlwStepsInput = {
    create?: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwStepsInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput> | Prisma.FlwConditionsCreateWithoutFlwStepsInput[] | Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput[];
    connectOrCreate?: Prisma.FlwConditionsCreateOrConnectWithoutFlwStepsInput | Prisma.FlwConditionsCreateOrConnectWithoutFlwStepsInput[];
    createMany?: Prisma.FlwConditionsCreateManyFlwStepsInputEnvelope;
    connect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
};
export type FlwConditionsUncheckedCreateNestedManyWithoutFlwStepsInput = {
    create?: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwStepsInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput> | Prisma.FlwConditionsCreateWithoutFlwStepsInput[] | Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput[];
    connectOrCreate?: Prisma.FlwConditionsCreateOrConnectWithoutFlwStepsInput | Prisma.FlwConditionsCreateOrConnectWithoutFlwStepsInput[];
    createMany?: Prisma.FlwConditionsCreateManyFlwStepsInputEnvelope;
    connect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
};
export type FlwConditionsUpdateManyWithoutFlwStepsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwStepsInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput> | Prisma.FlwConditionsCreateWithoutFlwStepsInput[] | Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput[];
    connectOrCreate?: Prisma.FlwConditionsCreateOrConnectWithoutFlwStepsInput | Prisma.FlwConditionsCreateOrConnectWithoutFlwStepsInput[];
    upsert?: Prisma.FlwConditionsUpsertWithWhereUniqueWithoutFlwStepsInput | Prisma.FlwConditionsUpsertWithWhereUniqueWithoutFlwStepsInput[];
    createMany?: Prisma.FlwConditionsCreateManyFlwStepsInputEnvelope;
    set?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    disconnect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    delete?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    connect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    update?: Prisma.FlwConditionsUpdateWithWhereUniqueWithoutFlwStepsInput | Prisma.FlwConditionsUpdateWithWhereUniqueWithoutFlwStepsInput[];
    updateMany?: Prisma.FlwConditionsUpdateManyWithWhereWithoutFlwStepsInput | Prisma.FlwConditionsUpdateManyWithWhereWithoutFlwStepsInput[];
    deleteMany?: Prisma.FlwConditionsScalarWhereInput | Prisma.FlwConditionsScalarWhereInput[];
};
export type FlwConditionsUncheckedUpdateManyWithoutFlwStepsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwStepsInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput> | Prisma.FlwConditionsCreateWithoutFlwStepsInput[] | Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput[];
    connectOrCreate?: Prisma.FlwConditionsCreateOrConnectWithoutFlwStepsInput | Prisma.FlwConditionsCreateOrConnectWithoutFlwStepsInput[];
    upsert?: Prisma.FlwConditionsUpsertWithWhereUniqueWithoutFlwStepsInput | Prisma.FlwConditionsUpsertWithWhereUniqueWithoutFlwStepsInput[];
    createMany?: Prisma.FlwConditionsCreateManyFlwStepsInputEnvelope;
    set?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    disconnect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    delete?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    connect?: Prisma.FlwConditionsWhereUniqueInput | Prisma.FlwConditionsWhereUniqueInput[];
    update?: Prisma.FlwConditionsUpdateWithWhereUniqueWithoutFlwStepsInput | Prisma.FlwConditionsUpdateWithWhereUniqueWithoutFlwStepsInput[];
    updateMany?: Prisma.FlwConditionsUpdateManyWithWhereWithoutFlwStepsInput | Prisma.FlwConditionsUpdateManyWithWhereWithoutFlwStepsInput[];
    deleteMany?: Prisma.FlwConditionsScalarWhereInput | Prisma.FlwConditionsScalarWhereInput[];
};
export type EnumFlwConditionSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.FlwConditionSourceType;
};
export type EnumFlwConditionOperatorFieldUpdateOperationsInput = {
    set?: $Enums.FlwConditionOperator;
};
export type EnumFlwConditionLogicGateFieldUpdateOperationsInput = {
    set?: $Enums.FlwConditionLogicGate;
};
export type FlwConditionsCreateWithoutFlwInput = {
    id?: string;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
    FlwSteps?: Prisma.FlwStepsCreateNestedOneWithoutFlwConditionsInput;
};
export type FlwConditionsUncheckedCreateWithoutFlwInput = {
    id?: string;
    flwStepId?: string | null;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
};
export type FlwConditionsCreateOrConnectWithoutFlwInput = {
    where: Prisma.FlwConditionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwInput>;
};
export type FlwConditionsCreateManyFlwInputEnvelope = {
    data: Prisma.FlwConditionsCreateManyFlwInput | Prisma.FlwConditionsCreateManyFlwInput[];
    skipDuplicates?: boolean;
};
export type FlwConditionsUpsertWithWhereUniqueWithoutFlwInput = {
    where: Prisma.FlwConditionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.FlwConditionsUpdateWithoutFlwInput, Prisma.FlwConditionsUncheckedUpdateWithoutFlwInput>;
    create: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwInput>;
};
export type FlwConditionsUpdateWithWhereUniqueWithoutFlwInput = {
    where: Prisma.FlwConditionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.FlwConditionsUpdateWithoutFlwInput, Prisma.FlwConditionsUncheckedUpdateWithoutFlwInput>;
};
export type FlwConditionsUpdateManyWithWhereWithoutFlwInput = {
    where: Prisma.FlwConditionsScalarWhereInput;
    data: Prisma.XOR<Prisma.FlwConditionsUpdateManyMutationInput, Prisma.FlwConditionsUncheckedUpdateManyWithoutFlwInput>;
};
export type FlwConditionsScalarWhereInput = {
    AND?: Prisma.FlwConditionsScalarWhereInput | Prisma.FlwConditionsScalarWhereInput[];
    OR?: Prisma.FlwConditionsScalarWhereInput[];
    NOT?: Prisma.FlwConditionsScalarWhereInput | Prisma.FlwConditionsScalarWhereInput[];
    id?: Prisma.StringFilter<"FlwConditions"> | string;
    flwId?: Prisma.StringFilter<"FlwConditions"> | string;
    flwStepId?: Prisma.StringNullableFilter<"FlwConditions"> | string | null;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFilter<"FlwConditions"> | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.StringNullableFilter<"FlwConditions"> | string | null;
    fieldPath?: Prisma.StringFilter<"FlwConditions"> | string;
    operator?: Prisma.EnumFlwConditionOperatorFilter<"FlwConditions"> | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.JsonNullableFilter<"FlwConditions">;
    logicGate?: Prisma.EnumFlwConditionLogicGateFilter<"FlwConditions"> | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFilter<"FlwConditions"> | number;
};
export type FlwConditionsCreateWithoutFlwStepsInput = {
    id?: string;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
    Flw: Prisma.FlwCreateNestedOneWithoutFlwConditionsInput;
};
export type FlwConditionsUncheckedCreateWithoutFlwStepsInput = {
    id?: string;
    flwId: string;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
};
export type FlwConditionsCreateOrConnectWithoutFlwStepsInput = {
    where: Prisma.FlwConditionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwStepsInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput>;
};
export type FlwConditionsCreateManyFlwStepsInputEnvelope = {
    data: Prisma.FlwConditionsCreateManyFlwStepsInput | Prisma.FlwConditionsCreateManyFlwStepsInput[];
    skipDuplicates?: boolean;
};
export type FlwConditionsUpsertWithWhereUniqueWithoutFlwStepsInput = {
    where: Prisma.FlwConditionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.FlwConditionsUpdateWithoutFlwStepsInput, Prisma.FlwConditionsUncheckedUpdateWithoutFlwStepsInput>;
    create: Prisma.XOR<Prisma.FlwConditionsCreateWithoutFlwStepsInput, Prisma.FlwConditionsUncheckedCreateWithoutFlwStepsInput>;
};
export type FlwConditionsUpdateWithWhereUniqueWithoutFlwStepsInput = {
    where: Prisma.FlwConditionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.FlwConditionsUpdateWithoutFlwStepsInput, Prisma.FlwConditionsUncheckedUpdateWithoutFlwStepsInput>;
};
export type FlwConditionsUpdateManyWithWhereWithoutFlwStepsInput = {
    where: Prisma.FlwConditionsScalarWhereInput;
    data: Prisma.XOR<Prisma.FlwConditionsUpdateManyMutationInput, Prisma.FlwConditionsUncheckedUpdateManyWithoutFlwStepsInput>;
};
export type FlwConditionsCreateManyFlwInput = {
    id?: string;
    flwStepId?: string | null;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
};
export type FlwConditionsUpdateWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    FlwSteps?: Prisma.FlwStepsUpdateOneWithoutFlwConditionsNestedInput;
};
export type FlwConditionsUncheckedUpdateWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type FlwConditionsUncheckedUpdateManyWithoutFlwInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type FlwConditionsCreateManyFlwStepsInput = {
    id?: string;
    flwId: string;
    sourceType: $Enums.FlwConditionSourceType;
    sourceStepId?: string | null;
    fieldPath: string;
    operator: $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: $Enums.FlwConditionLogicGate;
    position: number;
};
export type FlwConditionsUpdateWithoutFlwStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    Flw?: Prisma.FlwUpdateOneRequiredWithoutFlwConditionsNestedInput;
};
export type FlwConditionsUncheckedUpdateWithoutFlwStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type FlwConditionsUncheckedUpdateManyWithoutFlwStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flwId?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumFlwConditionSourceTypeFieldUpdateOperationsInput | $Enums.FlwConditionSourceType;
    sourceStepId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fieldPath?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumFlwConditionOperatorFieldUpdateOperationsInput | $Enums.FlwConditionOperator;
    comparisonValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    logicGate?: Prisma.EnumFlwConditionLogicGateFieldUpdateOperationsInput | $Enums.FlwConditionLogicGate;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type FlwConditionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    flwStepId?: boolean;
    sourceType?: boolean;
    sourceStepId?: boolean;
    fieldPath?: boolean;
    operator?: boolean;
    comparisonValue?: boolean;
    logicGate?: boolean;
    position?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwConditions$FlwStepsArgs<ExtArgs>;
}, ExtArgs["result"]["flwConditions"]>;
export type FlwConditionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    flwStepId?: boolean;
    sourceType?: boolean;
    sourceStepId?: boolean;
    fieldPath?: boolean;
    operator?: boolean;
    comparisonValue?: boolean;
    logicGate?: boolean;
    position?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwConditions$FlwStepsArgs<ExtArgs>;
}, ExtArgs["result"]["flwConditions"]>;
export type FlwConditionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flwId?: boolean;
    flwStepId?: boolean;
    sourceType?: boolean;
    sourceStepId?: boolean;
    fieldPath?: boolean;
    operator?: boolean;
    comparisonValue?: boolean;
    logicGate?: boolean;
    position?: boolean;
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwConditions$FlwStepsArgs<ExtArgs>;
}, ExtArgs["result"]["flwConditions"]>;
export type FlwConditionsSelectScalar = {
    id?: boolean;
    flwId?: boolean;
    flwStepId?: boolean;
    sourceType?: boolean;
    sourceStepId?: boolean;
    fieldPath?: boolean;
    operator?: boolean;
    comparisonValue?: boolean;
    logicGate?: boolean;
    position?: boolean;
};
export type FlwConditionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "flwId" | "flwStepId" | "sourceType" | "sourceStepId" | "fieldPath" | "operator" | "comparisonValue" | "logicGate" | "position", ExtArgs["result"]["flwConditions"]>;
export type FlwConditionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwConditions$FlwStepsArgs<ExtArgs>;
};
export type FlwConditionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwConditions$FlwStepsArgs<ExtArgs>;
};
export type FlwConditionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Flw?: boolean | Prisma.FlwDefaultArgs<ExtArgs>;
    FlwSteps?: boolean | Prisma.FlwConditions$FlwStepsArgs<ExtArgs>;
};
export type $FlwConditionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FlwConditions";
    objects: {
        Flw: Prisma.$FlwPayload<ExtArgs>;
        FlwSteps: Prisma.$FlwStepsPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        flwId: string;
        flwStepId: string | null;
        sourceType: $Enums.FlwConditionSourceType;
        sourceStepId: string | null;
        fieldPath: string;
        operator: $Enums.FlwConditionOperator;
        comparisonValue: runtime.JsonValue | null;
        logicGate: $Enums.FlwConditionLogicGate;
        position: number;
    }, ExtArgs["result"]["flwConditions"]>;
    composites: {};
};
export type FlwConditionsGetPayload<S extends boolean | null | undefined | FlwConditionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload, S>;
export type FlwConditionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FlwConditionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FlwConditionsCountAggregateInputType | true;
};
export interface FlwConditionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FlwConditions'];
        meta: {
            name: 'FlwConditions';
        };
    };
    /**
     * Find zero or one FlwConditions that matches the filter.
     * @param {FlwConditionsFindUniqueArgs} args - Arguments to find a FlwConditions
     * @example
     * // Get one FlwConditions
     * const flwConditions = await prisma.flwConditions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlwConditionsFindUniqueArgs>(args: Prisma.SelectSubset<T, FlwConditionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FlwConditionsClient<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FlwConditions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlwConditionsFindUniqueOrThrowArgs} args - Arguments to find a FlwConditions
     * @example
     * // Get one FlwConditions
     * const flwConditions = await prisma.flwConditions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlwConditionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FlwConditionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwConditionsClient<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlwConditions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwConditionsFindFirstArgs} args - Arguments to find a FlwConditions
     * @example
     * // Get one FlwConditions
     * const flwConditions = await prisma.flwConditions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlwConditionsFindFirstArgs>(args?: Prisma.SelectSubset<T, FlwConditionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__FlwConditionsClient<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlwConditions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwConditionsFindFirstOrThrowArgs} args - Arguments to find a FlwConditions
     * @example
     * // Get one FlwConditions
     * const flwConditions = await prisma.flwConditions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlwConditionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FlwConditionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwConditionsClient<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FlwConditions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwConditionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FlwConditions
     * const flwConditions = await prisma.flwConditions.findMany()
     *
     * // Get first 10 FlwConditions
     * const flwConditions = await prisma.flwConditions.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const flwConditionsWithIdOnly = await prisma.flwConditions.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FlwConditionsFindManyArgs>(args?: Prisma.SelectSubset<T, FlwConditionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FlwConditions.
     * @param {FlwConditionsCreateArgs} args - Arguments to create a FlwConditions.
     * @example
     * // Create one FlwConditions
     * const FlwConditions = await prisma.flwConditions.create({
     *   data: {
     *     // ... data to create a FlwConditions
     *   }
     * })
     *
     */
    create<T extends FlwConditionsCreateArgs>(args: Prisma.SelectSubset<T, FlwConditionsCreateArgs<ExtArgs>>): Prisma.Prisma__FlwConditionsClient<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FlwConditions.
     * @param {FlwConditionsCreateManyArgs} args - Arguments to create many FlwConditions.
     * @example
     * // Create many FlwConditions
     * const flwConditions = await prisma.flwConditions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FlwConditionsCreateManyArgs>(args?: Prisma.SelectSubset<T, FlwConditionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FlwConditions and returns the data saved in the database.
     * @param {FlwConditionsCreateManyAndReturnArgs} args - Arguments to create many FlwConditions.
     * @example
     * // Create many FlwConditions
     * const flwConditions = await prisma.flwConditions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FlwConditions and only return the `id`
     * const flwConditionsWithIdOnly = await prisma.flwConditions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FlwConditionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FlwConditionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FlwConditions.
     * @param {FlwConditionsDeleteArgs} args - Arguments to delete one FlwConditions.
     * @example
     * // Delete one FlwConditions
     * const FlwConditions = await prisma.flwConditions.delete({
     *   where: {
     *     // ... filter to delete one FlwConditions
     *   }
     * })
     *
     */
    delete<T extends FlwConditionsDeleteArgs>(args: Prisma.SelectSubset<T, FlwConditionsDeleteArgs<ExtArgs>>): Prisma.Prisma__FlwConditionsClient<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FlwConditions.
     * @param {FlwConditionsUpdateArgs} args - Arguments to update one FlwConditions.
     * @example
     * // Update one FlwConditions
     * const flwConditions = await prisma.flwConditions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FlwConditionsUpdateArgs>(args: Prisma.SelectSubset<T, FlwConditionsUpdateArgs<ExtArgs>>): Prisma.Prisma__FlwConditionsClient<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FlwConditions.
     * @param {FlwConditionsDeleteManyArgs} args - Arguments to filter FlwConditions to delete.
     * @example
     * // Delete a few FlwConditions
     * const { count } = await prisma.flwConditions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FlwConditionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, FlwConditionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlwConditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwConditionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FlwConditions
     * const flwConditions = await prisma.flwConditions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FlwConditionsUpdateManyArgs>(args: Prisma.SelectSubset<T, FlwConditionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlwConditions and returns the data updated in the database.
     * @param {FlwConditionsUpdateManyAndReturnArgs} args - Arguments to update many FlwConditions.
     * @example
     * // Update many FlwConditions
     * const flwConditions = await prisma.flwConditions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FlwConditions and only return the `id`
     * const flwConditionsWithIdOnly = await prisma.flwConditions.updateManyAndReturn({
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
    updateManyAndReturn<T extends FlwConditionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FlwConditionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FlwConditions.
     * @param {FlwConditionsUpsertArgs} args - Arguments to update or create a FlwConditions.
     * @example
     * // Update or create a FlwConditions
     * const flwConditions = await prisma.flwConditions.upsert({
     *   create: {
     *     // ... data to create a FlwConditions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FlwConditions we want to update
     *   }
     * })
     */
    upsert<T extends FlwConditionsUpsertArgs>(args: Prisma.SelectSubset<T, FlwConditionsUpsertArgs<ExtArgs>>): Prisma.Prisma__FlwConditionsClient<runtime.Types.Result.GetResult<Prisma.$FlwConditionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FlwConditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwConditionsCountArgs} args - Arguments to filter FlwConditions to count.
     * @example
     * // Count the number of FlwConditions
     * const count = await prisma.flwConditions.count({
     *   where: {
     *     // ... the filter for the FlwConditions we want to count
     *   }
     * })
    **/
    count<T extends FlwConditionsCountArgs>(args?: Prisma.Subset<T, FlwConditionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FlwConditionsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FlwConditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwConditionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FlwConditionsAggregateArgs>(args: Prisma.Subset<T, FlwConditionsAggregateArgs>): Prisma.PrismaPromise<GetFlwConditionsAggregateType<T>>;
    /**
     * Group by FlwConditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwConditionsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FlwConditionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FlwConditionsGroupByArgs['orderBy'];
    } : {
        orderBy?: FlwConditionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FlwConditionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlwConditionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FlwConditions model
     */
    readonly fields: FlwConditionsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FlwConditions.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FlwConditionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    Flw<T extends Prisma.FlwDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlwDefaultArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    FlwSteps<T extends Prisma.FlwConditions$FlwStepsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlwConditions$FlwStepsArgs<ExtArgs>>): Prisma.Prisma__FlwStepsClient<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the FlwConditions model
 */
export interface FlwConditionsFieldRefs {
    readonly id: Prisma.FieldRef<"FlwConditions", 'String'>;
    readonly flwId: Prisma.FieldRef<"FlwConditions", 'String'>;
    readonly flwStepId: Prisma.FieldRef<"FlwConditions", 'String'>;
    readonly sourceType: Prisma.FieldRef<"FlwConditions", 'FlwConditionSourceType'>;
    readonly sourceStepId: Prisma.FieldRef<"FlwConditions", 'String'>;
    readonly fieldPath: Prisma.FieldRef<"FlwConditions", 'String'>;
    readonly operator: Prisma.FieldRef<"FlwConditions", 'FlwConditionOperator'>;
    readonly comparisonValue: Prisma.FieldRef<"FlwConditions", 'Json'>;
    readonly logicGate: Prisma.FieldRef<"FlwConditions", 'FlwConditionLogicGate'>;
    readonly position: Prisma.FieldRef<"FlwConditions", 'Int'>;
}
/**
 * FlwConditions findUnique
 */
export type FlwConditionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwConditions to fetch.
     */
    where: Prisma.FlwConditionsWhereUniqueInput;
};
/**
 * FlwConditions findUniqueOrThrow
 */
export type FlwConditionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwConditions to fetch.
     */
    where: Prisma.FlwConditionsWhereUniqueInput;
};
/**
 * FlwConditions findFirst
 */
export type FlwConditionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwConditions to fetch.
     */
    where?: Prisma.FlwConditionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwConditions to fetch.
     */
    orderBy?: Prisma.FlwConditionsOrderByWithRelationInput | Prisma.FlwConditionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FlwConditions.
     */
    cursor?: Prisma.FlwConditionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwConditions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwConditions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FlwConditions.
     */
    distinct?: Prisma.FlwConditionsScalarFieldEnum | Prisma.FlwConditionsScalarFieldEnum[];
};
/**
 * FlwConditions findFirstOrThrow
 */
export type FlwConditionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwConditions to fetch.
     */
    where?: Prisma.FlwConditionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwConditions to fetch.
     */
    orderBy?: Prisma.FlwConditionsOrderByWithRelationInput | Prisma.FlwConditionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FlwConditions.
     */
    cursor?: Prisma.FlwConditionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwConditions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwConditions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FlwConditions.
     */
    distinct?: Prisma.FlwConditionsScalarFieldEnum | Prisma.FlwConditionsScalarFieldEnum[];
};
/**
 * FlwConditions findMany
 */
export type FlwConditionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * Filter, which FlwConditions to fetch.
     */
    where?: Prisma.FlwConditionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FlwConditions to fetch.
     */
    orderBy?: Prisma.FlwConditionsOrderByWithRelationInput | Prisma.FlwConditionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FlwConditions.
     */
    cursor?: Prisma.FlwConditionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FlwConditions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FlwConditions.
     */
    skip?: number;
    distinct?: Prisma.FlwConditionsScalarFieldEnum | Prisma.FlwConditionsScalarFieldEnum[];
};
/**
 * FlwConditions create
 */
export type FlwConditionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * The data needed to create a FlwConditions.
     */
    data: Prisma.XOR<Prisma.FlwConditionsCreateInput, Prisma.FlwConditionsUncheckedCreateInput>;
};
/**
 * FlwConditions createMany
 */
export type FlwConditionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FlwConditions.
     */
    data: Prisma.FlwConditionsCreateManyInput | Prisma.FlwConditionsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FlwConditions createManyAndReturn
 */
export type FlwConditionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * The data used to create many FlwConditions.
     */
    data: Prisma.FlwConditionsCreateManyInput | Prisma.FlwConditionsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FlwConditions update
 */
export type FlwConditionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * The data needed to update a FlwConditions.
     */
    data: Prisma.XOR<Prisma.FlwConditionsUpdateInput, Prisma.FlwConditionsUncheckedUpdateInput>;
    /**
     * Choose, which FlwConditions to update.
     */
    where: Prisma.FlwConditionsWhereUniqueInput;
};
/**
 * FlwConditions updateMany
 */
export type FlwConditionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FlwConditions.
     */
    data: Prisma.XOR<Prisma.FlwConditionsUpdateManyMutationInput, Prisma.FlwConditionsUncheckedUpdateManyInput>;
    /**
     * Filter which FlwConditions to update
     */
    where?: Prisma.FlwConditionsWhereInput;
    /**
     * Limit how many FlwConditions to update.
     */
    limit?: number;
};
/**
 * FlwConditions updateManyAndReturn
 */
export type FlwConditionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * The data used to update FlwConditions.
     */
    data: Prisma.XOR<Prisma.FlwConditionsUpdateManyMutationInput, Prisma.FlwConditionsUncheckedUpdateManyInput>;
    /**
     * Filter which FlwConditions to update
     */
    where?: Prisma.FlwConditionsWhereInput;
    /**
     * Limit how many FlwConditions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FlwConditions upsert
 */
export type FlwConditionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * The filter to search for the FlwConditions to update in case it exists.
     */
    where: Prisma.FlwConditionsWhereUniqueInput;
    /**
     * In case the FlwConditions found by the `where` argument doesn't exist, create a new FlwConditions with this data.
     */
    create: Prisma.XOR<Prisma.FlwConditionsCreateInput, Prisma.FlwConditionsUncheckedCreateInput>;
    /**
     * In case the FlwConditions was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FlwConditionsUpdateInput, Prisma.FlwConditionsUncheckedUpdateInput>;
};
/**
 * FlwConditions delete
 */
export type FlwConditionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
    /**
     * Filter which FlwConditions to delete.
     */
    where: Prisma.FlwConditionsWhereUniqueInput;
};
/**
 * FlwConditions deleteMany
 */
export type FlwConditionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FlwConditions to delete
     */
    where?: Prisma.FlwConditionsWhereInput;
    /**
     * Limit how many FlwConditions to delete.
     */
    limit?: number;
};
/**
 * FlwConditions.FlwSteps
 */
export type FlwConditions$FlwStepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.FlwStepsWhereInput;
};
/**
 * FlwConditions without action
 */
export type FlwConditionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwConditions
     */
    select?: Prisma.FlwConditionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FlwConditions
     */
    omit?: Prisma.FlwConditionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwConditionsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FlwConditions.d.ts.map