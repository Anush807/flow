import dns from "node:dns";
import express from "express";
import { config, isProduction } from "./config.js";
import creatFlw from "./api.js";
import consoleRouter from "./routes/console.js";
import { mountConsoleStatic } from "./routes/console-static.js";
import healthRouter from "./routes/health.js";
import { requireApiKey } from "./middleware/auth.js";
import { ingressRateLimit, managementRateLimit } from "./middleware/rate-limit.js";
import { webhookTriggerHandler } from "./triggers/webhook.js";
import { prisma } from "../lib/prisma.js";
import { redisClient } from "./async/redis-client.js";
import { eventTriggerQueue, stepQueue } from "./async/redis-queue.js";
import { createLogger } from "./utils/logger.js";

dns.setDefaultResultOrder("ipv4first");

const log = createLogger("server");
const app = express();

// Behind a load balancer, req.ip must come from X-Forwarded-For or every
// client shares one rate-limit bucket.
if (isProduction) {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

// Health checks come before auth and rate limiting: probes must not carry a
// credential, and must not be throttled.
app.use(healthRouter);

app.use((req, res, next) => {
  const startedAt = Date.now();
  res.on("finish", () => {
    log.info("request", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });
  next();
});

// Public ingress: authenticated by the unguessable key in the URL, because
// third-party producers cannot hold the management credential.
app.post("/webhooks/:webhookKey", ingressRateLimit, (req, res, next) => {
  void webhookTriggerHandler(req, res).catch(next);
});

// Everything under /flow is the management API.
app.use("/flow", managementRateLimit, requireApiKey, creatFlw);

// The web console's own API. Same credential, same limits – it is the same
// management surface, shaped for a browser.
app.use("/api", managementRateLimit, requireApiKey, consoleRouter);

// The console bundle itself, if it has been built. Last, so it can never
// shadow an API route.
mountConsoleStatic(app);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// JSON error handler – without this, body-parser failures and unhandled
// rejections from async route handlers return an HTML stack trace.
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  log.error("Unhandled request error", err);
  if (res.headersSent) return;

  // Never leak internals to the caller in production.
  const message = isProduction
    ? "Internal Server Error"
    : err instanceof Error
      ? err.message
      : String(err);

  res.status(500).json({ error: message });
});

const server = app.listen(config.PORT, () => {
  log.info("API server listening", { port: config.PORT, env: config.NODE_ENV });

  if (!config.API_KEY) {
    log.warn("API_KEY is not set – the management API is UNAUTHENTICATED (development only)");
  }
});

async function shutdown(signal: string) {
  log.info("Shutting down", { signal });

  // Stop accepting connections, let in-flight requests drain, then release
  // the dependencies.
  server.close(() => {
    void (async () => {
      try {
        await Promise.allSettled([
          stepQueue.close(),
          eventTriggerQueue.close(),
          redisClient.quit(),
          prisma.$disconnect(),
        ]);
        log.info("Shutdown complete");
        process.exit(0);
      } catch (error) {
        log.error("Shutdown failed", error);
        process.exit(1);
      }
    })();
  });

  // Don't hang forever on a stuck keep-alive connection.
  setTimeout(() => {
    log.error("Shutdown timed out – forcing exit");
    process.exit(1);
  }, 15_000).unref();
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
