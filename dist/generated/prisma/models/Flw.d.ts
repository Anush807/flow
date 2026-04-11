import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Flw
 *
 */
export type FlwModel = runtime.Types.Result.DefaultSelection<Prisma.$FlwPayload>;
export type AggregateFlw = {
    _count: FlwCountAggregateOutputType | null;
    _min: FlwMinAggregateOutputType | null;
    _max: FlwMaxAggregateOutputType | null;
};
export type FlwMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type FlwMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type FlwCountAggregateOutputType = {
    id: number;
    name: number;
    isActive: number;
    createdAt: number;
    _all: number;
};
export type FlwMinAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
    createdAt?: true;
};
export type FlwMaxAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
    createdAt?: true;
};
export type FlwCountAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
    createdAt?: true;
    _all?: true;
};
export type FlwAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Flw to aggregate.
     */
    where?: Prisma.FlwWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Flws to fetch.
     */
    orderBy?: Prisma.FlwOrderByWithRelationInput | Prisma.FlwOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FlwWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Flws from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Flws.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Flws
    **/
    _count?: true | FlwCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FlwMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FlwMaxAggregateInputType;
};
export type GetFlwAggregateType<T extends FlwAggregateArgs> = {
    [P in keyof T & keyof AggregateFlw]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFlw[P]> : Prisma.GetScalarType<T[P], AggregateFlw[P]>;
};
export type FlwGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwWhereInput;
    orderBy?: Prisma.FlwOrderByWithAggregationInput | Prisma.FlwOrderByWithAggregationInput[];
    by: Prisma.FlwScalarFieldEnum[] | Prisma.FlwScalarFieldEnum;
    having?: Prisma.FlwScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FlwCountAggregateInputType | true;
    _min?: FlwMinAggregateInputType;
    _max?: FlwMaxAggregateInputType;
};
export type FlwGroupByOutputType = {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    _count: FlwCountAggregateOutputType | null;
    _min: FlwMinAggregateOutputType | null;
    _max: FlwMaxAggregateOutputType | null;
};
type GetFlwGroupByPayload<T extends FlwGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FlwGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FlwGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FlwGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FlwGroupByOutputType[P]>;
}>>;
export type FlwWhereInput = {
    AND?: Prisma.FlwWhereInput | Prisma.FlwWhereInput[];
    OR?: Prisma.FlwWhereInput[];
    NOT?: Prisma.FlwWhereInput | Prisma.FlwWhereInput[];
    id?: Prisma.StringFilter<"Flw"> | string;
    name?: Prisma.StringFilter<"Flw"> | string;
    isActive?: Prisma.BoolFilter<"Flw"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Flw"> | Date | string;
    FlwSteps?: Prisma.FlwStepsListRelationFilter;
    FlwExecutions?: Prisma.FlwExecutionsListRelationFilter;
    ProcessedEvents?: Prisma.ProcessedEventsListRelationFilter;
};
export type FlwOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    FlwSteps?: Prisma.FlwStepsOrderByRelationAggregateInput;
    FlwExecutions?: Prisma.FlwExecutionsOrderByRelationAggregateInput;
    ProcessedEvents?: Prisma.ProcessedEventsOrderByRelationAggregateInput;
};
export type FlwWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FlwWhereInput | Prisma.FlwWhereInput[];
    OR?: Prisma.FlwWhereInput[];
    NOT?: Prisma.FlwWhereInput | Prisma.FlwWhereInput[];
    name?: Prisma.StringFilter<"Flw"> | string;
    isActive?: Prisma.BoolFilter<"Flw"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Flw"> | Date | string;
    FlwSteps?: Prisma.FlwStepsListRelationFilter;
    FlwExecutions?: Prisma.FlwExecutionsListRelationFilter;
    ProcessedEvents?: Prisma.ProcessedEventsListRelationFilter;
}, "id">;
export type FlwOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FlwCountOrderByAggregateInput;
    _max?: Prisma.FlwMaxOrderByAggregateInput;
    _min?: Prisma.FlwMinOrderByAggregateInput;
};
export type FlwScalarWhereWithAggregatesInput = {
    AND?: Prisma.FlwScalarWhereWithAggregatesInput | Prisma.FlwScalarWhereWithAggregatesInput[];
    OR?: Prisma.FlwScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FlwScalarWhereWithAggregatesInput | Prisma.FlwScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Flw"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Flw"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Flw"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Flw"> | Date | string;
};
export type FlwCreateInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    FlwSteps?: Prisma.FlwStepsCreateNestedManyWithoutFlwInput;
    FlwExecutions?: Prisma.FlwExecutionsCreateNestedManyWithoutFlwInput;
    ProcessedEvents?: Prisma.ProcessedEventsCreateNestedManyWithoutFlwInput;
};
export type FlwUncheckedCreateInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    FlwSteps?: Prisma.FlwStepsUncheckedCreateNestedManyWithoutFlwInput;
    FlwExecutions?: Prisma.FlwExecutionsUncheckedCreateNestedManyWithoutFlwInput;
    ProcessedEvents?: Prisma.ProcessedEventsUncheckedCreateNestedManyWithoutFlwInput;
};
export type FlwUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    FlwSteps?: Prisma.FlwStepsUpdateManyWithoutFlwNestedInput;
    FlwExecutions?: Prisma.FlwExecutionsUpdateManyWithoutFlwNestedInput;
    ProcessedEvents?: Prisma.ProcessedEventsUpdateManyWithoutFlwNestedInput;
};
export type FlwUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    FlwSteps?: Prisma.FlwStepsUncheckedUpdateManyWithoutFlwNestedInput;
    FlwExecutions?: Prisma.FlwExecutionsUncheckedUpdateManyWithoutFlwNestedInput;
    ProcessedEvents?: Prisma.ProcessedEventsUncheckedUpdateManyWithoutFlwNestedInput;
};
export type FlwCreateManyInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type FlwUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlwUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlwCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FlwMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FlwMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FlwScalarRelationFilter = {
    is?: Prisma.FlwWhereInput;
    isNot?: Prisma.FlwWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type FlwCreateNestedOneWithoutFlwStepsInput = {
    create?: Prisma.XOR<Prisma.FlwCreateWithoutFlwStepsInput, Prisma.FlwUncheckedCreateWithoutFlwStepsInput>;
    connectOrCreate?: Prisma.FlwCreateOrConnectWithoutFlwStepsInput;
    connect?: Prisma.FlwWhereUniqueInput;
};
export type FlwUpdateOneRequiredWithoutFlwStepsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwCreateWithoutFlwStepsInput, Prisma.FlwUncheckedCreateWithoutFlwStepsInput>;
    connectOrCreate?: Prisma.FlwCreateOrConnectWithoutFlwStepsInput;
    upsert?: Prisma.FlwUpsertWithoutFlwStepsInput;
    connect?: Prisma.FlwWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FlwUpdateToOneWithWhereWithoutFlwStepsInput, Prisma.FlwUpdateWithoutFlwStepsInput>, Prisma.FlwUncheckedUpdateWithoutFlwStepsInput>;
};
export type FlwCreateNestedOneWithoutFlwExecutionsInput = {
    create?: Prisma.XOR<Prisma.FlwCreateWithoutFlwExecutionsInput, Prisma.FlwUncheckedCreateWithoutFlwExecutionsInput>;
    connectOrCreate?: Prisma.FlwCreateOrConnectWithoutFlwExecutionsInput;
    connect?: Prisma.FlwWhereUniqueInput;
};
export type FlwUpdateOneRequiredWithoutFlwExecutionsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwCreateWithoutFlwExecutionsInput, Prisma.FlwUncheckedCreateWithoutFlwExecutionsInput>;
    connectOrCreate?: Prisma.FlwCreateOrConnectWithoutFlwExecutionsInput;
    upsert?: Prisma.FlwUpsertWithoutFlwExecutionsInput;
    connect?: Prisma.FlwWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FlwUpdateToOneWithWhereWithoutFlwExecutionsInput, Prisma.FlwUpdateWithoutFlwExecutionsInput>, Prisma.FlwUncheckedUpdateWithoutFlwExecutionsInput>;
};
export type FlwCreateNestedOneWithoutProcessedEventsInput = {
    create?: Prisma.XOR<Prisma.FlwCreateWithoutProcessedEventsInput, Prisma.FlwUncheckedCreateWithoutProcessedEventsInput>;
    connectOrCreate?: Prisma.FlwCreateOrConnectWithoutProcessedEventsInput;
    connect?: Prisma.FlwWhereUniqueInput;
};
export type FlwUpdateOneRequiredWithoutProcessedEventsNestedInput = {
    create?: Prisma.XOR<Prisma.FlwCreateWithoutProcessedEventsInput, Prisma.FlwUncheckedCreateWithoutProcessedEventsInput>;
    connectOrCreate?: Prisma.FlwCreateOrConnectWithoutProcessedEventsInput;
    upsert?: Prisma.FlwUpsertWithoutProcessedEventsInput;
    connect?: Prisma.FlwWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FlwUpdateToOneWithWhereWithoutProcessedEventsInput, Prisma.FlwUpdateWithoutProcessedEventsInput>, Prisma.FlwUncheckedUpdateWithoutProcessedEventsInput>;
};
export type FlwCreateWithoutFlwStepsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    FlwExecutions?: Prisma.FlwExecutionsCreateNestedManyWithoutFlwInput;
    ProcessedEvents?: Prisma.ProcessedEventsCreateNestedManyWithoutFlwInput;
};
export type FlwUncheckedCreateWithoutFlwStepsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    FlwExecutions?: Prisma.FlwExecutionsUncheckedCreateNestedManyWithoutFlwInput;
    ProcessedEvents?: Prisma.ProcessedEventsUncheckedCreateNestedManyWithoutFlwInput;
};
export type FlwCreateOrConnectWithoutFlwStepsInput = {
    where: Prisma.FlwWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwCreateWithoutFlwStepsInput, Prisma.FlwUncheckedCreateWithoutFlwStepsInput>;
};
export type FlwUpsertWithoutFlwStepsInput = {
    update: Prisma.XOR<Prisma.FlwUpdateWithoutFlwStepsInput, Prisma.FlwUncheckedUpdateWithoutFlwStepsInput>;
    create: Prisma.XOR<Prisma.FlwCreateWithoutFlwStepsInput, Prisma.FlwUncheckedCreateWithoutFlwStepsInput>;
    where?: Prisma.FlwWhereInput;
};
export type FlwUpdateToOneWithWhereWithoutFlwStepsInput = {
    where?: Prisma.FlwWhereInput;
    data: Prisma.XOR<Prisma.FlwUpdateWithoutFlwStepsInput, Prisma.FlwUncheckedUpdateWithoutFlwStepsInput>;
};
export type FlwUpdateWithoutFlwStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    FlwExecutions?: Prisma.FlwExecutionsUpdateManyWithoutFlwNestedInput;
    ProcessedEvents?: Prisma.ProcessedEventsUpdateManyWithoutFlwNestedInput;
};
export type FlwUncheckedUpdateWithoutFlwStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    FlwExecutions?: Prisma.FlwExecutionsUncheckedUpdateManyWithoutFlwNestedInput;
    ProcessedEvents?: Prisma.ProcessedEventsUncheckedUpdateManyWithoutFlwNestedInput;
};
export type FlwCreateWithoutFlwExecutionsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    FlwSteps?: Prisma.FlwStepsCreateNestedManyWithoutFlwInput;
    ProcessedEvents?: Prisma.ProcessedEventsCreateNestedManyWithoutFlwInput;
};
export type FlwUncheckedCreateWithoutFlwExecutionsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    FlwSteps?: Prisma.FlwStepsUncheckedCreateNestedManyWithoutFlwInput;
    ProcessedEvents?: Prisma.ProcessedEventsUncheckedCreateNestedManyWithoutFlwInput;
};
export type FlwCreateOrConnectWithoutFlwExecutionsInput = {
    where: Prisma.FlwWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwCreateWithoutFlwExecutionsInput, Prisma.FlwUncheckedCreateWithoutFlwExecutionsInput>;
};
export type FlwUpsertWithoutFlwExecutionsInput = {
    update: Prisma.XOR<Prisma.FlwUpdateWithoutFlwExecutionsInput, Prisma.FlwUncheckedUpdateWithoutFlwExecutionsInput>;
    create: Prisma.XOR<Prisma.FlwCreateWithoutFlwExecutionsInput, Prisma.FlwUncheckedCreateWithoutFlwExecutionsInput>;
    where?: Prisma.FlwWhereInput;
};
export type FlwUpdateToOneWithWhereWithoutFlwExecutionsInput = {
    where?: Prisma.FlwWhereInput;
    data: Prisma.XOR<Prisma.FlwUpdateWithoutFlwExecutionsInput, Prisma.FlwUncheckedUpdateWithoutFlwExecutionsInput>;
};
export type FlwUpdateWithoutFlwExecutionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    FlwSteps?: Prisma.FlwStepsUpdateManyWithoutFlwNestedInput;
    ProcessedEvents?: Prisma.ProcessedEventsUpdateManyWithoutFlwNestedInput;
};
export type FlwUncheckedUpdateWithoutFlwExecutionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    FlwSteps?: Prisma.FlwStepsUncheckedUpdateManyWithoutFlwNestedInput;
    ProcessedEvents?: Prisma.ProcessedEventsUncheckedUpdateManyWithoutFlwNestedInput;
};
export type FlwCreateWithoutProcessedEventsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    FlwSteps?: Prisma.FlwStepsCreateNestedManyWithoutFlwInput;
    FlwExecutions?: Prisma.FlwExecutionsCreateNestedManyWithoutFlwInput;
};
export type FlwUncheckedCreateWithoutProcessedEventsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    FlwSteps?: Prisma.FlwStepsUncheckedCreateNestedManyWithoutFlwInput;
    FlwExecutions?: Prisma.FlwExecutionsUncheckedCreateNestedManyWithoutFlwInput;
};
export type FlwCreateOrConnectWithoutProcessedEventsInput = {
    where: Prisma.FlwWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlwCreateWithoutProcessedEventsInput, Prisma.FlwUncheckedCreateWithoutProcessedEventsInput>;
};
export type FlwUpsertWithoutProcessedEventsInput = {
    update: Prisma.XOR<Prisma.FlwUpdateWithoutProcessedEventsInput, Prisma.FlwUncheckedUpdateWithoutProcessedEventsInput>;
    create: Prisma.XOR<Prisma.FlwCreateWithoutProcessedEventsInput, Prisma.FlwUncheckedCreateWithoutProcessedEventsInput>;
    where?: Prisma.FlwWhereInput;
};
export type FlwUpdateToOneWithWhereWithoutProcessedEventsInput = {
    where?: Prisma.FlwWhereInput;
    data: Prisma.XOR<Prisma.FlwUpdateWithoutProcessedEventsInput, Prisma.FlwUncheckedUpdateWithoutProcessedEventsInput>;
};
export type FlwUpdateWithoutProcessedEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    FlwSteps?: Prisma.FlwStepsUpdateManyWithoutFlwNestedInput;
    FlwExecutions?: Prisma.FlwExecutionsUpdateManyWithoutFlwNestedInput;
};
export type FlwUncheckedUpdateWithoutProcessedEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    FlwSteps?: Prisma.FlwStepsUncheckedUpdateManyWithoutFlwNestedInput;
    FlwExecutions?: Prisma.FlwExecutionsUncheckedUpdateManyWithoutFlwNestedInput;
};
/**
 * Count Type FlwCountOutputType
 */
export type FlwCountOutputType = {
    FlwSteps: number;
    FlwExecutions: number;
    ProcessedEvents: number;
};
export type FlwCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    FlwSteps?: boolean | FlwCountOutputTypeCountFlwStepsArgs;
    FlwExecutions?: boolean | FlwCountOutputTypeCountFlwExecutionsArgs;
    ProcessedEvents?: boolean | FlwCountOutputTypeCountProcessedEventsArgs;
};
/**
 * FlwCountOutputType without action
 */
export type FlwCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlwCountOutputType
     */
    select?: Prisma.FlwCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * FlwCountOutputType without action
 */
export type FlwCountOutputTypeCountFlwStepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwStepsWhereInput;
};
/**
 * FlwCountOutputType without action
 */
export type FlwCountOutputTypeCountFlwExecutionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlwExecutionsWhereInput;
};
/**
 * FlwCountOutputType without action
 */
export type FlwCountOutputTypeCountProcessedEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcessedEventsWhereInput;
};
export type FlwSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    FlwSteps?: boolean | Prisma.Flw$FlwStepsArgs<ExtArgs>;
    FlwExecutions?: boolean | Prisma.Flw$FlwExecutionsArgs<ExtArgs>;
    ProcessedEvents?: boolean | Prisma.Flw$ProcessedEventsArgs<ExtArgs>;
    _count?: boolean | Prisma.FlwCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flw"]>;
export type FlwSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["flw"]>;
export type FlwSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["flw"]>;
export type FlwSelectScalar = {
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
};
export type FlwOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "isActive" | "createdAt", ExtArgs["result"]["flw"]>;
export type FlwInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    FlwSteps?: boolean | Prisma.Flw$FlwStepsArgs<ExtArgs>;
    FlwExecutions?: boolean | Prisma.Flw$FlwExecutionsArgs<ExtArgs>;
    ProcessedEvents?: boolean | Prisma.Flw$ProcessedEventsArgs<ExtArgs>;
    _count?: boolean | Prisma.FlwCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FlwIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type FlwIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $FlwPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Flw";
    objects: {
        FlwSteps: Prisma.$FlwStepsPayload<ExtArgs>[];
        FlwExecutions: Prisma.$FlwExecutionsPayload<ExtArgs>[];
        ProcessedEvents: Prisma.$ProcessedEventsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["flw"]>;
    composites: {};
};
export type FlwGetPayload<S extends boolean | null | undefined | FlwDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FlwPayload, S>;
export type FlwCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FlwFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FlwCountAggregateInputType | true;
};
export interface FlwDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Flw'];
        meta: {
            name: 'Flw';
        };
    };
    /**
     * Find zero or one Flw that matches the filter.
     * @param {FlwFindUniqueArgs} args - Arguments to find a Flw
     * @example
     * // Get one Flw
     * const flw = await prisma.flw.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlwFindUniqueArgs>(args: Prisma.SelectSubset<T, FlwFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Flw that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlwFindUniqueOrThrowArgs} args - Arguments to find a Flw
     * @example
     * // Get one Flw
     * const flw = await prisma.flw.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlwFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FlwFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Flw that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwFindFirstArgs} args - Arguments to find a Flw
     * @example
     * // Get one Flw
     * const flw = await prisma.flw.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlwFindFirstArgs>(args?: Prisma.SelectSubset<T, FlwFindFirstArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Flw that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwFindFirstOrThrowArgs} args - Arguments to find a Flw
     * @example
     * // Get one Flw
     * const flw = await prisma.flw.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlwFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FlwFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Flws that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Flws
     * const flws = await prisma.flw.findMany()
     *
     * // Get first 10 Flws
     * const flws = await prisma.flw.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const flwWithIdOnly = await prisma.flw.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FlwFindManyArgs>(args?: Prisma.SelectSubset<T, FlwFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Flw.
     * @param {FlwCreateArgs} args - Arguments to create a Flw.
     * @example
     * // Create one Flw
     * const Flw = await prisma.flw.create({
     *   data: {
     *     // ... data to create a Flw
     *   }
     * })
     *
     */
    create<T extends FlwCreateArgs>(args: Prisma.SelectSubset<T, FlwCreateArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Flws.
     * @param {FlwCreateManyArgs} args - Arguments to create many Flws.
     * @example
     * // Create many Flws
     * const flw = await prisma.flw.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FlwCreateManyArgs>(args?: Prisma.SelectSubset<T, FlwCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Flws and returns the data saved in the database.
     * @param {FlwCreateManyAndReturnArgs} args - Arguments to create many Flws.
     * @example
     * // Create many Flws
     * const flw = await prisma.flw.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Flws and only return the `id`
     * const flwWithIdOnly = await prisma.flw.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FlwCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FlwCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Flw.
     * @param {FlwDeleteArgs} args - Arguments to delete one Flw.
     * @example
     * // Delete one Flw
     * const Flw = await prisma.flw.delete({
     *   where: {
     *     // ... filter to delete one Flw
     *   }
     * })
     *
     */
    delete<T extends FlwDeleteArgs>(args: Prisma.SelectSubset<T, FlwDeleteArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Flw.
     * @param {FlwUpdateArgs} args - Arguments to update one Flw.
     * @example
     * // Update one Flw
     * const flw = await prisma.flw.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FlwUpdateArgs>(args: Prisma.SelectSubset<T, FlwUpdateArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Flws.
     * @param {FlwDeleteManyArgs} args - Arguments to filter Flws to delete.
     * @example
     * // Delete a few Flws
     * const { count } = await prisma.flw.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FlwDeleteManyArgs>(args?: Prisma.SelectSubset<T, FlwDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Flws.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Flws
     * const flw = await prisma.flw.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FlwUpdateManyArgs>(args: Prisma.SelectSubset<T, FlwUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Flws and returns the data updated in the database.
     * @param {FlwUpdateManyAndReturnArgs} args - Arguments to update many Flws.
     * @example
     * // Update many Flws
     * const flw = await prisma.flw.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Flws and only return the `id`
     * const flwWithIdOnly = await prisma.flw.updateManyAndReturn({
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
    updateManyAndReturn<T extends FlwUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FlwUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Flw.
     * @param {FlwUpsertArgs} args - Arguments to update or create a Flw.
     * @example
     * // Update or create a Flw
     * const flw = await prisma.flw.upsert({
     *   create: {
     *     // ... data to create a Flw
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Flw we want to update
     *   }
     * })
     */
    upsert<T extends FlwUpsertArgs>(args: Prisma.SelectSubset<T, FlwUpsertArgs<ExtArgs>>): Prisma.Prisma__FlwClient<runtime.Types.Result.GetResult<Prisma.$FlwPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Flws.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwCountArgs} args - Arguments to filter Flws to count.
     * @example
     * // Count the number of Flws
     * const count = await prisma.flw.count({
     *   where: {
     *     // ... the filter for the Flws we want to count
     *   }
     * })
    **/
    count<T extends FlwCountArgs>(args?: Prisma.Subset<T, FlwCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FlwCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Flw.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FlwAggregateArgs>(args: Prisma.Subset<T, FlwAggregateArgs>): Prisma.PrismaPromise<GetFlwAggregateType<T>>;
    /**
     * Group by Flw.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlwGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FlwGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FlwGroupByArgs['orderBy'];
    } : {
        orderBy?: FlwGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FlwGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlwGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Flw model
     */
    readonly fields: FlwFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Flw.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FlwClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    FlwSteps<T extends Prisma.Flw$FlwStepsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Flw$FlwStepsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwStepsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    FlwExecutions<T extends Prisma.Flw$FlwExecutionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Flw$FlwExecutionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlwExecutionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ProcessedEvents<T extends Prisma.Flw$ProcessedEventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Flw$ProcessedEventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcessedEventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Flw model
 */
export interface FlwFieldRefs {
    readonly id: Prisma.FieldRef<"Flw", 'String'>;
    readonly name: Prisma.FieldRef<"Flw", 'String'>;
    readonly isActive: Prisma.FieldRef<"Flw", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Flw", 'DateTime'>;
}
/**
 * Flw findUnique
 */
export type FlwFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * Filter, which Flw to fetch.
     */
    where: Prisma.FlwWhereUniqueInput;
};
/**
 * Flw findUniqueOrThrow
 */
export type FlwFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * Filter, which Flw to fetch.
     */
    where: Prisma.FlwWhereUniqueInput;
};
/**
 * Flw findFirst
 */
export type FlwFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * Filter, which Flw to fetch.
     */
    where?: Prisma.FlwWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Flws to fetch.
     */
    orderBy?: Prisma.FlwOrderByWithRelationInput | Prisma.FlwOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Flws.
     */
    cursor?: Prisma.FlwWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Flws from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Flws.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Flws.
     */
    distinct?: Prisma.FlwScalarFieldEnum | Prisma.FlwScalarFieldEnum[];
};
/**
 * Flw findFirstOrThrow
 */
export type FlwFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * Filter, which Flw to fetch.
     */
    where?: Prisma.FlwWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Flws to fetch.
     */
    orderBy?: Prisma.FlwOrderByWithRelationInput | Prisma.FlwOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Flws.
     */
    cursor?: Prisma.FlwWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Flws from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Flws.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Flws.
     */
    distinct?: Prisma.FlwScalarFieldEnum | Prisma.FlwScalarFieldEnum[];
};
/**
 * Flw findMany
 */
export type FlwFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * Filter, which Flws to fetch.
     */
    where?: Prisma.FlwWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Flws to fetch.
     */
    orderBy?: Prisma.FlwOrderByWithRelationInput | Prisma.FlwOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Flws.
     */
    cursor?: Prisma.FlwWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Flws from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Flws.
     */
    skip?: number;
    distinct?: Prisma.FlwScalarFieldEnum | Prisma.FlwScalarFieldEnum[];
};
/**
 * Flw create
 */
export type FlwCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * The data needed to create a Flw.
     */
    data: Prisma.XOR<Prisma.FlwCreateInput, Prisma.FlwUncheckedCreateInput>;
};
/**
 * Flw createMany
 */
export type FlwCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Flws.
     */
    data: Prisma.FlwCreateManyInput | Prisma.FlwCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Flw createManyAndReturn
 */
export type FlwCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * The data used to create many Flws.
     */
    data: Prisma.FlwCreateManyInput | Prisma.FlwCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Flw update
 */
export type FlwUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * The data needed to update a Flw.
     */
    data: Prisma.XOR<Prisma.FlwUpdateInput, Prisma.FlwUncheckedUpdateInput>;
    /**
     * Choose, which Flw to update.
     */
    where: Prisma.FlwWhereUniqueInput;
};
/**
 * Flw updateMany
 */
export type FlwUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Flws.
     */
    data: Prisma.XOR<Prisma.FlwUpdateManyMutationInput, Prisma.FlwUncheckedUpdateManyInput>;
    /**
     * Filter which Flws to update
     */
    where?: Prisma.FlwWhereInput;
    /**
     * Limit how many Flws to update.
     */
    limit?: number;
};
/**
 * Flw updateManyAndReturn
 */
export type FlwUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * The data used to update Flws.
     */
    data: Prisma.XOR<Prisma.FlwUpdateManyMutationInput, Prisma.FlwUncheckedUpdateManyInput>;
    /**
     * Filter which Flws to update
     */
    where?: Prisma.FlwWhereInput;
    /**
     * Limit how many Flws to update.
     */
    limit?: number;
};
/**
 * Flw upsert
 */
export type FlwUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * The filter to search for the Flw to update in case it exists.
     */
    where: Prisma.FlwWhereUniqueInput;
    /**
     * In case the Flw found by the `where` argument doesn't exist, create a new Flw with this data.
     */
    create: Prisma.XOR<Prisma.FlwCreateInput, Prisma.FlwUncheckedCreateInput>;
    /**
     * In case the Flw was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FlwUpdateInput, Prisma.FlwUncheckedUpdateInput>;
};
/**
 * Flw delete
 */
export type FlwDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
    /**
     * Filter which Flw to delete.
     */
    where: Prisma.FlwWhereUniqueInput;
};
/**
 * Flw deleteMany
 */
export type FlwDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Flws to delete
     */
    where?: Prisma.FlwWhereInput;
    /**
     * Limit how many Flws to delete.
     */
    limit?: number;
};
/**
 * Flw.FlwSteps
 */
export type Flw$FlwStepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    orderBy?: Prisma.FlwStepsOrderByWithRelationInput | Prisma.FlwStepsOrderByWithRelationInput[];
    cursor?: Prisma.FlwStepsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlwStepsScalarFieldEnum | Prisma.FlwStepsScalarFieldEnum[];
};
/**
 * Flw.FlwExecutions
 */
export type Flw$FlwExecutionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.FlwExecutionsWhereInput;
    orderBy?: Prisma.FlwExecutionsOrderByWithRelationInput | Prisma.FlwExecutionsOrderByWithRelationInput[];
    cursor?: Prisma.FlwExecutionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlwExecutionsScalarFieldEnum | Prisma.FlwExecutionsScalarFieldEnum[];
};
/**
 * Flw.ProcessedEvents
 */
export type Flw$ProcessedEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvents
     */
    select?: Prisma.ProcessedEventsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProcessedEvents
     */
    omit?: Prisma.ProcessedEventsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProcessedEventsInclude<ExtArgs> | null;
    where?: Prisma.ProcessedEventsWhereInput;
    orderBy?: Prisma.ProcessedEventsOrderByWithRelationInput | Prisma.ProcessedEventsOrderByWithRelationInput[];
    cursor?: Prisma.ProcessedEventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcessedEventsScalarFieldEnum | Prisma.ProcessedEventsScalarFieldEnum[];
};
/**
 * Flw without action
 */
export type FlwDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flw
     */
    select?: Prisma.FlwSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Flw
     */
    omit?: Prisma.FlwOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FlwInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Flw.d.ts.map