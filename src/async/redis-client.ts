import { Redis } from "ioredis";
import { config } from "../config.js";
import { createLogger } from "../utils/logger.js";

const log = createLogger("redis");

/**
 * Shared client for non-queue Redis work (rate limiting, readiness checks).
 * BullMQ manages its own connections from `redisConnection`.
 */
export const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  ...(config.REDIS_PASSWORD !== undefined ? { password: config.REDIS_PASSWORD } : {}),
  // Fail fast instead of queueing commands forever when Redis is unreachable;
  // the rate limiter is designed to fail open on error.
  maxRetriesPerRequest: 2,
  enableOfflineQueue: false,
  lazyConnect: false,
});

redisClient.on("error", (error: unknown) => {
  log.error("Redis client error", error);
});
