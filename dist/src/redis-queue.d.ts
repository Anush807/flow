import { Queue } from "bullmq";
export declare const redisConnection: {
    host: string;
    port: number;
};
export declare const stepQueue: Queue<any, any, string, any, any, string>;
export declare const eventTriggerQueue: Queue<any, any, string, any, any, string>;
//# sourceMappingURL=redis-queue.d.ts.map