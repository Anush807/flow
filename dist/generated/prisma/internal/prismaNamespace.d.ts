import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.4.0
 * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly Flw: "Flw";
    readonly FlwSteps: "FlwSteps";
    readonly FlwExecutions: "FlwExecutions";
    readonly FlwExecutionSteps: "FlwExecutionSteps";
    readonly FlwConditions: "FlwConditions";
    readonly ProcessedEvents: "ProcessedEvents";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "flw" | "flwSteps" | "flwExecutions" | "flwExecutionSteps" | "flwConditions" | "processedEvents";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Flw: {
            payload: Prisma.$FlwPayload<ExtArgs>;
            fields: Prisma.FlwFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FlwFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FlwFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>;
                };
                findFirst: {
                    args: Prisma.FlwFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FlwFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>;
                };
                findMany: {
                    args: Prisma.FlwFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>[];
                };
                create: {
                    args: Prisma.FlwCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>;
                };
                createMany: {
                    args: Prisma.FlwCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FlwCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>[];
                };
                delete: {
                    args: Prisma.FlwDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>;
                };
                update: {
                    args: Prisma.FlwUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>;
                };
                deleteMany: {
                    args: Prisma.FlwDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FlwUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FlwUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>[];
                };
                upsert: {
                    args: Prisma.FlwUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwPayload>;
                };
                aggregate: {
                    args: Prisma.FlwAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFlw>;
                };
                groupBy: {
                    args: Prisma.FlwGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FlwCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwCountAggregateOutputType> | number;
                };
            };
        };
        FlwSteps: {
            payload: Prisma.$FlwStepsPayload<ExtArgs>;
            fields: Prisma.FlwStepsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FlwStepsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FlwStepsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>;
                };
                findFirst: {
                    args: Prisma.FlwStepsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FlwStepsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>;
                };
                findMany: {
                    args: Prisma.FlwStepsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>[];
                };
                create: {
                    args: Prisma.FlwStepsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>;
                };
                createMany: {
                    args: Prisma.FlwStepsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FlwStepsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>[];
                };
                delete: {
                    args: Prisma.FlwStepsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>;
                };
                update: {
                    args: Prisma.FlwStepsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>;
                };
                deleteMany: {
                    args: Prisma.FlwStepsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FlwStepsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FlwStepsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>[];
                };
                upsert: {
                    args: Prisma.FlwStepsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwStepsPayload>;
                };
                aggregate: {
                    args: Prisma.FlwStepsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFlwSteps>;
                };
                groupBy: {
                    args: Prisma.FlwStepsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwStepsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FlwStepsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwStepsCountAggregateOutputType> | number;
                };
            };
        };
        FlwExecutions: {
            payload: Prisma.$FlwExecutionsPayload<ExtArgs>;
            fields: Prisma.FlwExecutionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FlwExecutionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FlwExecutionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>;
                };
                findFirst: {
                    args: Prisma.FlwExecutionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FlwExecutionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>;
                };
                findMany: {
                    args: Prisma.FlwExecutionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>[];
                };
                create: {
                    args: Prisma.FlwExecutionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>;
                };
                createMany: {
                    args: Prisma.FlwExecutionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FlwExecutionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>[];
                };
                delete: {
                    args: Prisma.FlwExecutionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>;
                };
                update: {
                    args: Prisma.FlwExecutionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>;
                };
                deleteMany: {
                    args: Prisma.FlwExecutionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FlwExecutionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FlwExecutionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>[];
                };
                upsert: {
                    args: Prisma.FlwExecutionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionsPayload>;
                };
                aggregate: {
                    args: Prisma.FlwExecutionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFlwExecutions>;
                };
                groupBy: {
                    args: Prisma.FlwExecutionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwExecutionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FlwExecutionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwExecutionsCountAggregateOutputType> | number;
                };
            };
        };
        FlwExecutionSteps: {
            payload: Prisma.$FlwExecutionStepsPayload<ExtArgs>;
            fields: Prisma.FlwExecutionStepsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FlwExecutionStepsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FlwExecutionStepsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>;
                };
                findFirst: {
                    args: Prisma.FlwExecutionStepsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FlwExecutionStepsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>;
                };
                findMany: {
                    args: Prisma.FlwExecutionStepsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>[];
                };
                create: {
                    args: Prisma.FlwExecutionStepsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>;
                };
                createMany: {
                    args: Prisma.FlwExecutionStepsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FlwExecutionStepsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>[];
                };
                delete: {
                    args: Prisma.FlwExecutionStepsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>;
                };
                update: {
                    args: Prisma.FlwExecutionStepsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>;
                };
                deleteMany: {
                    args: Prisma.FlwExecutionStepsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FlwExecutionStepsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FlwExecutionStepsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>[];
                };
                upsert: {
                    args: Prisma.FlwExecutionStepsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwExecutionStepsPayload>;
                };
                aggregate: {
                    args: Prisma.FlwExecutionStepsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFlwExecutionSteps>;
                };
                groupBy: {
                    args: Prisma.FlwExecutionStepsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwExecutionStepsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FlwExecutionStepsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwExecutionStepsCountAggregateOutputType> | number;
                };
            };
        };
        FlwConditions: {
            payload: Prisma.$FlwConditionsPayload<ExtArgs>;
            fields: Prisma.FlwConditionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FlwConditionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FlwConditionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>;
                };
                findFirst: {
                    args: Prisma.FlwConditionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FlwConditionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>;
                };
                findMany: {
                    args: Prisma.FlwConditionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>[];
                };
                create: {
                    args: Prisma.FlwConditionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>;
                };
                createMany: {
                    args: Prisma.FlwConditionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FlwConditionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>[];
                };
                delete: {
                    args: Prisma.FlwConditionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>;
                };
                update: {
                    args: Prisma.FlwConditionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>;
                };
                deleteMany: {
                    args: Prisma.FlwConditionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FlwConditionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FlwConditionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>[];
                };
                upsert: {
                    args: Prisma.FlwConditionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FlwConditionsPayload>;
                };
                aggregate: {
                    args: Prisma.FlwConditionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFlwConditions>;
                };
                groupBy: {
                    args: Prisma.FlwConditionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwConditionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FlwConditionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FlwConditionsCountAggregateOutputType> | number;
                };
            };
        };
        ProcessedEvents: {
            payload: Prisma.$ProcessedEventsPayload<ExtArgs>;
            fields: Prisma.ProcessedEventsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProcessedEventsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProcessedEventsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>;
                };
                findFirst: {
                    args: Prisma.ProcessedEventsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProcessedEventsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>;
                };
                findMany: {
                    args: Prisma.ProcessedEventsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>[];
                };
                create: {
                    args: Prisma.ProcessedEventsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>;
                };
                createMany: {
                    args: Prisma.ProcessedEventsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProcessedEventsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>[];
                };
                delete: {
                    args: Prisma.ProcessedEventsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>;
                };
                update: {
                    args: Prisma.ProcessedEventsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>;
                };
                deleteMany: {
                    args: Prisma.ProcessedEventsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProcessedEventsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProcessedEventsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>[];
                };
                upsert: {
                    args: Prisma.ProcessedEventsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcessedEventsPayload>;
                };
                aggregate: {
                    args: Prisma.ProcessedEventsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProcessedEvents>;
                };
                groupBy: {
                    args: Prisma.ProcessedEventsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProcessedEventsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProcessedEventsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProcessedEventsCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const FlwScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly eventKey: "eventKey";
    readonly webhookKey: "webhookKey";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type FlwScalarFieldEnum = (typeof FlwScalarFieldEnum)[keyof typeof FlwScalarFieldEnum];
export declare const FlwStepsScalarFieldEnum: {
    readonly id: "id";
    readonly flwId: "flwId";
    readonly name: "name";
    readonly position: "position";
    readonly type: "type";
    readonly integrationKey: "integrationKey";
    readonly operationKey: "operationKey";
    readonly configPayload: "configPayload";
    readonly inputMapping: "inputMapping";
};
export type FlwStepsScalarFieldEnum = (typeof FlwStepsScalarFieldEnum)[keyof typeof FlwStepsScalarFieldEnum];
export declare const FlwExecutionsScalarFieldEnum: {
    readonly id: "id";
    readonly flwId: "flwId";
    readonly lockedBy: "lockedBy";
    readonly idempotencyKey: "idempotencyKey";
    readonly status: "status";
    readonly lockedAt: "lockedAt";
    readonly triggerPayload: "triggerPayload";
    readonly triggeredAt: "triggeredAt";
    readonly startedAt: "startedAt";
    readonly finishedAt: "finishedAt";
};
export type FlwExecutionsScalarFieldEnum = (typeof FlwExecutionsScalarFieldEnum)[keyof typeof FlwExecutionsScalarFieldEnum];
export declare const FlwExecutionStepsScalarFieldEnum: {
    readonly id: "id";
    readonly flwExecutionId: "flwExecutionId";
    readonly flwStepId: "flwStepId";
    readonly status: "status";
    readonly retryCount: "retryCount";
    readonly error: "error";
    readonly outputPayload: "outputPayload";
    readonly errorPayload: "errorPayload";
    readonly idempotencyKey: "idempotencyKey";
    readonly startedAt: "startedAt";
    readonly finishedAt: "finishedAt";
    readonly nextRetryAt: "nextRetryAt";
};
export type FlwExecutionStepsScalarFieldEnum = (typeof FlwExecutionStepsScalarFieldEnum)[keyof typeof FlwExecutionStepsScalarFieldEnum];
export declare const FlwConditionsScalarFieldEnum: {
    readonly id: "id";
    readonly flwId: "flwId";
    readonly flwStepId: "flwStepId";
    readonly sourceType: "sourceType";
    readonly sourceStepId: "sourceStepId";
    readonly fieldPath: "fieldPath";
    readonly operator: "operator";
    readonly comparisonValue: "comparisonValue";
    readonly logicGate: "logicGate";
    readonly position: "position";
};
export type FlwConditionsScalarFieldEnum = (typeof FlwConditionsScalarFieldEnum)[keyof typeof FlwConditionsScalarFieldEnum];
export declare const ProcessedEventsScalarFieldEnum: {
    readonly id: "id";
    readonly eventKey: "eventKey";
    readonly flwId: "flwId";
    readonly flwExecutionId: "flwExecutionId";
    readonly processedAt: "processedAt";
};
export type ProcessedEventsScalarFieldEnum = (typeof ProcessedEventsScalarFieldEnum)[keyof typeof ProcessedEventsScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'FlwStatus'
 */
export type EnumFlwStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwStatus'>;
/**
 * Reference to a field of type 'FlwStatus[]'
 */
export type ListEnumFlwStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwStatus[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'FlwStepType'
 */
export type EnumFlwStepTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwStepType'>;
/**
 * Reference to a field of type 'FlwStepType[]'
 */
export type ListEnumFlwStepTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwStepType[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'FlwExecutionStatus'
 */
export type EnumFlwExecutionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwExecutionStatus'>;
/**
 * Reference to a field of type 'FlwExecutionStatus[]'
 */
export type ListEnumFlwExecutionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwExecutionStatus[]'>;
/**
 * Reference to a field of type 'FlwConditionSourceType'
 */
export type EnumFlwConditionSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwConditionSourceType'>;
/**
 * Reference to a field of type 'FlwConditionSourceType[]'
 */
export type ListEnumFlwConditionSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwConditionSourceType[]'>;
/**
 * Reference to a field of type 'FlwConditionOperator'
 */
export type EnumFlwConditionOperatorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwConditionOperator'>;
/**
 * Reference to a field of type 'FlwConditionOperator[]'
 */
export type ListEnumFlwConditionOperatorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwConditionOperator[]'>;
/**
 * Reference to a field of type 'FlwConditionLogicGate'
 */
export type EnumFlwConditionLogicGateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwConditionLogicGate'>;
/**
 * Reference to a field of type 'FlwConditionLogicGate[]'
 */
export type ListEnumFlwConditionLogicGateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlwConditionLogicGate[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    flw?: Prisma.FlwOmit;
    flwSteps?: Prisma.FlwStepsOmit;
    flwExecutions?: Prisma.FlwExecutionsOmit;
    flwExecutionSteps?: Prisma.FlwExecutionStepsOmit;
    flwConditions?: Prisma.FlwConditionsOmit;
    processedEvents?: Prisma.ProcessedEventsOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map