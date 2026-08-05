import type express from "express";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client.js";
import { createLogger } from "./logger.js";

const log = createLogger("http");

/**
 * Maps a thrown error onto a status code. Previously every failure in the
 * router collapsed to 400 (or 500), so callers could not tell a bad request
 * from a missing flow from a genuine server fault.
 *
 * Shared by the management API (`/flow`) and the console API (`/api`) so the
 * two cannot drift into disagreeing about what a given failure means.
 */
export function errorResponse(res: express.Response, message: string, error: unknown) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message,
      error: "Validation failed",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // eventKey and webhookKey are globally unique: a collision is the caller's to
  // fix, not a server fault.
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    const fields = (error.meta?.target as string[] | undefined)?.join(", ") ?? "field";
    return res.status(409).json({
      message,
      error: `Another flow already uses this ${fields}`,
    });
  }

  const detail = error instanceof Error ? error.message : String(error);

  if (/not found/i.test(detail)) {
    return res.status(404).json({ message, error: detail });
  }

  if (/not active|has no steps|at least one step|in flight/i.test(detail)) {
    return res.status(409).json({ message, error: detail });
  }

  if (/sourceStepPosition|required|must be|unknown status filter/i.test(detail)) {
    return res.status(400).json({ message, error: detail });
  }

  log.error(message, error);
  return res.status(500).json({ message, error: detail });
}
