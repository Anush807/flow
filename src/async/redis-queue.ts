import { Queue } from "bullmq";
import { config } from "../config.js";

export const redisConnection = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  ...(config.REDIS_PASSWORD !== undefined ? { password: config.REDIS_PASSWORD } : {}),
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
