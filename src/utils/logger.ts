import { config } from "../config.js";

/**
 * JSON-lines structured logging. Every execution-related line carries the ids
 * needed to reconstruct a run (`flwId`, `executionId`, `stepExecutionId`), so a
 * failure can be traced across the API, the worker and the recovery loop
 * without grepping free-text messages.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown>;

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const threshold = LEVEL_ORDER[config.LOG_LEVEL];

function serializeError(error: unknown): LogContext {
  if (error instanceof Error) {
    return {
      error: error.message,
      errorName: error.name,
      ...(error.stack !== undefined ? { stack: error.stack } : {}),
    };
  }
  return { error: String(error) };
}

function emit(level: LogLevel, component: string, message: string, context?: LogContext) {
  if (LEVEL_ORDER[level] < threshold) return;

  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    component,
    message,
    ...context,
  });

  // Keep the stream split so container runtimes and log shippers that treat
  // stderr as the error channel keep working.
  if (level === "error" || level === "warn") {
    process.stderr.write(`${line}\n`);
  } else {
    process.stdout.write(`${line}\n`);
  }
}

export type Logger = {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, error?: unknown, context?: LogContext) => void;
  child: (bound: LogContext) => Logger;
};

export function createLogger(component: string, bound: LogContext = {}): Logger {
  return {
    debug: (message, context) => emit("debug", component, message, { ...bound, ...context }),
    info: (message, context) => emit("info", component, message, { ...bound, ...context }),
    warn: (message, context) => emit("warn", component, message, { ...bound, ...context }),
    error: (message, error, context) =>
      emit("error", component, message, {
        ...bound,
        ...context,
        ...(error !== undefined ? serializeError(error) : {}),
      }),
    child: (childBound) => createLogger(component, { ...bound, ...childBound }),
  };
}
