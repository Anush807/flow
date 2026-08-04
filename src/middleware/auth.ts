import { timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { config, isProduction } from "../config.js";
import { createLogger } from "../utils/logger.js";

const log = createLogger("auth");

/**
 * Constant-time comparison. A plain `===` on a secret leaks its prefix through
 * response timing, which is exactly the kind of thing that makes an API key
 * guessable one byte at a time.
 */
function secretsMatch(provided: string, expected: string): boolean {
  const providedBuffer = Buffer.from(provided, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  // timingSafeEqual throws on length mismatch, so compare lengths separately.
  // Length is not the secret here – the contents are.
  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

function extractBearerToken(req: Request): string | undefined {
  const header = req.header("authorization");
  if (header) {
    const [scheme, ...rest] = header.split(" ");
    const token = rest.join(" ").trim();
    if (scheme?.toLowerCase() === "bearer" && token) {
      return token;
    }
  }

  const apiKeyHeader = req.header("x-api-key");
  return apiKeyHeader && apiKeyHeader.trim() ? apiKeyHeader.trim() : undefined;
}

/**
 * Guards the management API. Webhook and event ingress deliberately stay
 * public – they are authenticated by their unguessable key in the URL, because
 * third-party callers cannot be given the management credential.
 */
export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const expected = config.API_KEY;

  if (!expected) {
    // config.ts makes this impossible in production; in development it means
    // the operator has not opted into auth yet.
    if (!isProduction) {
      next();
      return;
    }

    res.status(500).json({ error: "Server is missing API_KEY configuration" });
    return;
  }

  const provided = extractBearerToken(req);

  if (!provided || !secretsMatch(provided, expected)) {
    log.warn("Rejected unauthenticated management request", {
      method: req.method,
      path: req.path,
      hasCredential: provided !== undefined,
    });

    res.status(401).json({
      error: "Unauthorized",
      message: "Provide the management API key via 'Authorization: Bearer <key>' or 'x-api-key'",
    });
    return;
  }

  next();
}
