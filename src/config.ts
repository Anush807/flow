import "dotenv/config";
import { z } from "zod";

/**
 * Validated once, at import time. A misconfigured deployment should fail on
 * boot with a precise message rather than at 3am inside a step handler.
 */

const intFromEnv = (fallback: number, min = 1) =>
  z
    .string()
    .optional()
    .transform((value) => (value === undefined || value === "" ? fallback : Number(value)))
    .pipe(z.number().int().min(min));

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: intFromEnv(3000),

    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

    REDIS_HOST: z.string().min(1).default("127.0.0.1"),
    REDIS_PORT: intFromEnv(6379),
    REDIS_PASSWORD: z.string().optional(),

    // Management API credential. Required in production – see superRefine.
    API_KEY: z.string().optional(),

    WORKER_CONCURRENCY: intFromEnv(10),
    RECOVERY_INTERVAL_MS: intFromEnv(15_000, 1_000),
    RECOVERY_BATCH_SIZE: intFromEnv(50),

    STEP_MAX_RETRIES: intFromEnv(5, 0),
    STEP_RETRY_BASE_DELAY_MS: intFromEnv(5_000, 100),

    // Rate limits, per window, per client.
    RATE_LIMIT_WINDOW_MS: intFromEnv(60_000, 1_000),
    RATE_LIMIT_MANAGEMENT_MAX: intFromEnv(120),
    RATE_LIMIT_INGRESS_MAX: intFromEnv(600),

    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

    // Built web console. Unset means "look in the default locations" – see
    // src/routes/console-static.ts.
    CONSOLE_DIST_DIR: z.string().optional(),

    SMTP_HOST: z.string().optional(),
    SMTP_PORT: intFromEnv(587),
    SMTP_SECURE: z
      .string()
      .optional()
      .transform((value) => value === "true"),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.string().default("no-reply@example.com"),
  })
  .superRefine((value, ctx) => {
    if (value.NODE_ENV === "production" && !value.API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["API_KEY"],
        message:
          "API_KEY must be set in production – the management API would otherwise be unauthenticated",
      });
    }

    if (value.API_KEY !== undefined && value.API_KEY.length < 16) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["API_KEY"],
        message: "API_KEY must be at least 16 characters",
      });
    }
  });

export type Config = z.infer<typeof envSchema>;

function loadConfig(): Config {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");

    // Thrown, not process.exit: tests import this module and need to catch it.
    throw new Error(`Invalid environment configuration:\n${details}`);
  }

  return parsed.data;
}

export const config = loadConfig();

export const isProduction = config.NODE_ENV === "production";
