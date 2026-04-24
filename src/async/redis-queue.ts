import { Queue } from "bullmq"

export const redisConnection = {
  host: process.env["REDIS_HOST"] ?? "127.0.0.1",
  port: parseInt(process.env["REDIS_PORT"] ?? "6379", 10),
};

export const stepQueue = new Queue("step-execution-worker", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 1,
    removeOnComplete: 100,
    removeOnFail: 200,
  },
});

export const eventTriggerQueue = new Queue("external-event-trigger", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 1,
    removeOnComplete: 100,
    removeOnFail: 200,
  },
});
