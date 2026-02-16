import { Queue } from "bullmq"

export const stepQueue = new Queue("step-execution-worker", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});