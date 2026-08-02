import type { NextFunction, Request, Response } from "express";
import { config } from "../config.js";
import { redisClient } from "../async/redis-client.js";
import { createLogger } from "../utils/logger.js";

const log = createLogger("rate-limit");

type RateLimitOptions = {
  bucket: string;
  max: number;
  windowMs: number;
  /** Defaults to the caller's IP. */
  identify?: (req: Request) => string;
};

export type RateLimitDecision = {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: number;
};

/**
 * Fixed-window counter in Redis, so the budget is shared across every API
 * instance – an in-process limiter would let N replicas serve N times the
 * configured limit.
 *
 * Exported for testing.
 */
export async function consumeRateLimit(
  key: string,
  max: number,
  windowMs: number,
  now: number = Date.now(),
): Promise<RateLimitDecision> {
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const redisKey = `ratelimit:${key}:${windowStart}`;

  const results = await redisClient
    .multi()
    .incr(redisKey)
    .pexpire(redisKey, windowMs)
    .exec();

  // ioredis returns [[err, value], ...]; a null reply means the transaction
  // was discarded.
  const incrResult = results?.[0];
  const count = typeof incrResult?.[1] === "number" ? incrResult[1] : Number(incrResult?.[1] ?? 0);

  return {
    allowed: count <= max,
    remaining: Math.max(0, max - count),
    limit: max,
    resetAt: windowStart + windowMs,
  };
}

function clientIdentifier(req: Request): string {
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

export function rateLimit(options: RateLimitOptions) {
  const identify = options.identify ?? clientIdentifier;

  return function rateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
    void (async () => {
      try {
        const decision = await consumeRateLimit(
          `${options.bucket}:${identify(req)}`,
          options.max,
          options.windowMs,
        );

        res.setHeader("RateLimit-Limit", decision.limit);
        res.setHeader("RateLimit-Remaining", decision.remaining);
        res.setHeader("RateLimit-Reset", Math.ceil((decision.resetAt - Date.now()) / 1000));

        if (!decision.allowed) {
          res.status(429).json({
            error: "Too Many Requests",
            message: `Rate limit of ${decision.limit} requests per ${options.windowMs}ms exceeded`,
          });
          return;
        }

        next();
      } catch (error) {
        // Fail open: a Redis outage must not take the whole API down. The
        // worker's own Redis dependency will surface the outage anyway.
        log.error("Rate limit check failed – allowing request", error, { bucket: options.bucket });
        next();
      }
    })();
  };
}

export const managementRateLimit = rateLimit({
  bucket: "management",
  max: config.RATE_LIMIT_MANAGEMENT_MAX,
  windowMs: config.RATE_LIMIT_WINDOW_MS,
});

/**
 * Ingress is keyed by webhook/event key as well as IP: one noisy integration
 * must not exhaust the budget for every other producer behind the same NAT.
 */
export const ingressRateLimit = rateLimit({
  bucket: "ingress",
  max: config.RATE_LIMIT_INGRESS_MAX,
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  identify: (req) => {
    const key = req.params["webhookKey"] ?? req.params["eventKey"] ?? "unknown";
    return `${key}:${req.ip ?? req.socket.remoteAddress ?? "unknown"}`;
  },
});
