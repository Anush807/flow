/**
 * Pure translation between the engine's persistence shapes and the shapes the
 * web console renders. Kept free of Prisma and of any I/O so it can be unit
 * tested the same way `conditions`/`retry`/`step-traversal` are – the console
 * router is then a thin wiring layer over these.
 *
 * The console speaks lowercase statuses, pre-formatted durations and JSON
 * *strings* for payloads (its editors are textareas). Nothing in the engine
 * changes shape to accommodate that; the mapping lives here.
 */

export type FlowStatus = "Draft" | "Active" | "Paused" | "Archived";
export type ExecutionStatus = "Pending" | "Success" | "Failed" | "Running";

export type ConsoleFlowStatus = "active" | "draft" | "paused" | "archived" | "failing";
export type ConsoleExecutionStatus = "success" | "failed" | "pending" | "running";

export type StepRow = {
  id: string;
  name: string | null;
  position: number;
  type: "Trigger" | "Action";
  integrationKey: string;
  operationKey: string | null;
  configPayload: unknown;
  inputMapping: unknown;
  parentStepId: string | null;
  branchIndex: number;
};

export type ExecutionStepRow = {
  id: string;
  status: ExecutionStatus;
  retryCount: number;
  error: string | null;
  outputPayload: unknown;
  errorPayload: unknown;
  startedAt: Date | null;
  finishedAt: Date | null;
  FlwSteps: StepRow | null;
};

export type ExecutionRow = {
  id: string;
  flwId: string;
  status: ExecutionStatus;
  triggerPayload: unknown;
  triggeredAt: Date;
  startedAt: Date | null;
  finishedAt: Date | null;
  Flw?: { name: string } | null;
  FlwExecutionSteps?: ExecutionStepRow[];
};

export type ConsoleStep = {
  id: string;
  name: string;
  type: "Trigger" | "Action";
  integrationKey: string;
  operationKey: string;
  configPayload: string;
  inputMapping: string;
  position: number;
  branchIndex: number;
  parentStepId: string | null;
  depth: number;
};

export type ConsoleExecutionStep = ConsoleStep & {
  status: ConsoleExecutionStatus;
  duration: string;
  retryCount: number;
  errorMessage?: string;
  outputPayload?: string;
  startedAt: string | null;
  finishedAt: string | null;
};

export type ConsoleExecution = {
  id: string;
  flowId: string;
  flowName: string;
  status: ConsoleExecutionStatus;
  triggeredAt: string;
  triggeredAtIso: string;
  duration: string;
  triggerPayload: string;
  stepCount: number;
  steps: ConsoleExecutionStep[];
  errorMessage?: string;
};

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

/** `null` end (still running, or never finished) reads as unknown, not zero. */
export function formatDuration(startedAt: Date | null, finishedAt: Date | null): string {
  if (!startedAt || !finishedAt) {
    return "—";
  }

  const ms = finishedAt.getTime() - startedAt.getTime();
  if (ms < 0) return "—";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;

  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.round((ms % 60_000) / 1000);
  return `${minutes}m ${seconds}s`;
}

export function relativeTime(date: Date | null, now: Date = new Date()): string {
  if (!date) return "Never run";

  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  if (seconds < 5) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toISOString().slice(0, 10);
}

/**
 * Payloads round-trip through textareas in the console, so they leave here as
 * strings. A JSON-encoded string value (a bare SQL statement, say) is unwrapped
 * rather than shown with its quotes.
 */
export function stringifyPayload(value: unknown): string {
  if (value === null || value === undefined) return "{}";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}

// ---------------------------------------------------------------------------
// Status mapping
// ---------------------------------------------------------------------------

export function toConsoleExecutionStatus(status: ExecutionStatus): ConsoleExecutionStatus {
  switch (status) {
    case "Success":
      return "success";
    case "Failed":
      return "failed";
    case "Running":
      return "running";
    default:
      return "pending";
  }
}

/**
 * "failing" is a console-only status: an Active flow whose most recent run
 * failed. The engine has no such state – an Active flow with a bad step is
 * still Active – but an operator scanning a list wants it to stand out.
 */
export function toConsoleFlowStatus(
  status: FlowStatus,
  lastExecutionStatus?: ExecutionStatus | null,
): ConsoleFlowStatus {
  if (status === "Active" && lastExecutionStatus === "Failed") {
    return "failing";
  }

  return status.toLowerCase() as ConsoleFlowStatus;
}

const CONSOLE_TO_FLOW_STATUS: Record<string, FlowStatus> = {
  active: "Active",
  draft: "Draft",
  paused: "Paused",
  archived: "Archived",
};

/** `failing` has no persisted equivalent, so it resolves to its base status. */
export function toFlowStatus(status: string): FlowStatus | undefined {
  if (status === "failing") return "Active";
  return CONSOLE_TO_FLOW_STATUS[status.toLowerCase()];
}

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

/**
 * Depth-first ordering: every step is followed by the branches hanging off it,
 * in branch then position order. A flat list in this order reads top-to-bottom
 * the way the flow executes, which is all the console needs to render – it does
 * not draw the tree.
 */
export function orderStepsForDisplay(steps: StepRow[]): Array<StepRow & { depth: number }> {
  const byParent = new Map<string | null, StepRow[]>();

  for (const step of steps) {
    const siblings = byParent.get(step.parentStepId) ?? [];
    siblings.push(step);
    byParent.set(step.parentStepId, siblings);
  }

  for (const siblings of byParent.values()) {
    siblings.sort((a, b) => a.branchIndex - b.branchIndex || a.position - b.position);
  }

  const ordered: Array<StepRow & { depth: number }> = [];
  const seen = new Set<string>();

  const walk = (parentId: string | null, depth: number) => {
    for (const step of byParent.get(parentId) ?? []) {
      // Guards against a cycle in parentStepId turning this into an infinite
      // walk – bad data should render short, not hang the request.
      if (seen.has(step.id)) continue;
      seen.add(step.id);

      ordered.push({ ...step, depth });
      walk(step.id, depth + 1);
    }
  };

  walk(null, 0);

  // Anything unreachable from a root (an orphaned branch) still gets rendered.
  for (const step of steps) {
    if (!seen.has(step.id)) {
      ordered.push({ ...step, depth: 0 });
    }
  }

  return ordered;
}

export function toConsoleStep(step: StepRow & { depth?: number }): ConsoleStep {
  return {
    id: step.id,
    name: step.name ?? `Step ${step.position}`,
    type: step.type,
    integrationKey: step.integrationKey,
    operationKey: step.operationKey ?? "",
    configPayload: stringifyPayload(step.configPayload),
    inputMapping: stringifyPayload(step.inputMapping),
    position: step.position,
    branchIndex: step.branchIndex,
    parentStepId: step.parentStepId,
    depth: step.depth ?? 0,
  };
}

export function toConsoleExecutionStep(row: ExecutionStepRow): ConsoleExecutionStep {
  const definition = row.FlwSteps;
  const base: ConsoleStep = definition
    ? toConsoleStep(definition)
    : {
        id: row.id,
        name: "Unknown step",
        type: "Action",
        integrationKey: "unknown",
        operationKey: "",
        configPayload: "{}",
        inputMapping: "{}",
        position: 0,
        branchIndex: 0,
        parentStepId: null,
        depth: 0,
      };

  const errorMessage =
    row.error ?? (row.errorPayload ? stringifyPayload(row.errorPayload) : undefined);

  return {
    ...base,
    // The execution-step row is the thing being rendered, so its id wins over
    // the definition's – the console keys expansion state on it.
    id: row.id,
    status: toConsoleExecutionStatus(row.status),
    duration: formatDuration(row.startedAt, row.finishedAt),
    retryCount: row.retryCount,
    ...(errorMessage !== undefined ? { errorMessage } : {}),
    ...(row.outputPayload !== null && row.outputPayload !== undefined
      ? { outputPayload: stringifyPayload(row.outputPayload) }
      : {}),
    startedAt: row.startedAt ? row.startedAt.toISOString() : null,
    finishedAt: row.finishedAt ? row.finishedAt.toISOString() : null,
  };
}

// ---------------------------------------------------------------------------
// Executions
// ---------------------------------------------------------------------------

export function toConsoleExecution(row: ExecutionRow, now: Date = new Date()): ConsoleExecution {
  const steps = (row.FlwExecutionSteps ?? []).map(toConsoleExecutionStep);
  const failed = steps.find((step) => step.status === "failed" && step.errorMessage);

  return {
    id: row.id,
    flowId: row.flwId,
    flowName: row.Flw?.name ?? "Unknown flow",
    status: toConsoleExecutionStatus(row.status),
    triggeredAt: relativeTime(row.triggeredAt, now),
    triggeredAtIso: row.triggeredAt.toISOString(),
    // Timed from the trigger rather than from `startedAt` (the first claim):
    // the wait for a free worker is part of what an operator is looking at.
    duration: formatDuration(row.triggeredAt, row.finishedAt),
    triggerPayload: stringifyPayload(row.triggerPayload),
    stepCount: steps.length,
    steps,
    ...(failed?.errorMessage !== undefined ? { errorMessage: failed.errorMessage } : {}),
  };
}

// ---------------------------------------------------------------------------
// Console -> engine (flow definition writes)
// ---------------------------------------------------------------------------

export type ConsoleStepInput = {
  name?: string | undefined;
  type: "Trigger" | "Action";
  integrationKey: string;
  operationKey?: string | undefined;
  configPayload?: string | undefined;
  inputMapping?: string | undefined;
};

export type ParsedStepInput = {
  name?: string | undefined;
  type: "Trigger" | "Action";
  integrationKey: string;
  operationKey?: string | undefined;
  configPayload?: unknown;
  inputMapping?: unknown;
};

/**
 * The console edits payloads as text. Blank means "not set" (so the engine
 * stores JSON null rather than an empty object), and anything that is not valid
 * JSON is rejected here with the step number attached – by the time the worker
 * reads it there is no way to say which textarea was wrong.
 */
export function parsePayloadField(
  value: string | undefined,
  field: string,
  stepNumber: number,
): unknown {
  if (value === undefined) return undefined;

  const trimmed = value.trim();
  if (trimmed === "") return undefined;

  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error(`Step ${stepNumber}: ${field} must be valid JSON`);
  }
}

export function toFlowStepInputs(steps: ConsoleStepInput[]): ParsedStepInput[] {
  return steps.map((step, index) => {
    const stepNumber = index + 1;
    const configPayload = parsePayloadField(step.configPayload, "configPayload", stepNumber);
    const inputMapping = parsePayloadField(step.inputMapping, "inputMapping", stepNumber);

    return {
      ...(step.name !== undefined && step.name.trim() !== "" ? { name: step.name.trim() } : {}),
      type: step.type,
      integrationKey: step.integrationKey,
      ...(step.operationKey !== undefined && step.operationKey.trim() !== ""
        ? { operationKey: step.operationKey.trim() }
        : {}),
      ...(configPayload !== undefined ? { configPayload } : {}),
      ...(inputMapping !== undefined ? { inputMapping } : {}),
    };
  });
}
