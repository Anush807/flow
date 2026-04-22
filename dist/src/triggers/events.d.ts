import { Worker } from "bullmq";
export type ExternalEventJob = {
    eventKey: string;
    payload: unknown;
    idempotencyKey?: string;
};
export declare const eventTriggerWorker: Worker<ExternalEventJob, any, string>;
//# sourceMappingURL=events.d.ts.map