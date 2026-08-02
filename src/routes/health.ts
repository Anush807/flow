import express from "express";
import { prisma } from "../../lib/prisma.js";
import { redisClient } from "../async/redis-client.js";
import { createLogger } from "../utils/logger.js";

const log = createLogger("health");
const router = express.Router();

const startedAt = Date.now();

/**
 * Liveness: the process is up and the event loop is turning. Deliberately does
 * not touch Postgres or Redis – a dependency blip must not get the container
 * killed and restarted into the same blip.
 */
router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
  });
});

/**
 * Readiness: can this instance actually serve traffic? Checked by the load
 * balancer, so it does probe the dependencies.
 */
router.get("/ready", (_req, res) => {
  void (async () => {
    const checks: Record<string, "ok" | "unavailable"> = {};

    const [database, redis] = await Promise.all([
      prisma.$queryRaw`SELECT 1`.then(
        () => true,
        (error: unknown) => {
          log.error("Readiness: database check failed", error);
          return false;
        },
      ),
      redisClient.ping().then(
        () => true,
        (error: unknown) => {
          log.error("Readiness: redis check failed", error);
          return false;
        },
      ),
    ]);

    checks["database"] = database ? "ok" : "unavailable";
    checks["redis"] = redis ? "ok" : "unavailable";

    const ready = database && redis;
    res.status(ready ? 200 : 503).json({ status: ready ? "ready" : "not_ready", checks });
  })();
});

export default router;
