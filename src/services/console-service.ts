/**
 * Queries that exist for the web console only.
 *
 * The management API under `/flow` returns definition rows verbatim, which is
 * what a machine caller wants. The console instead needs list-shaped answers:
 * a flow with its live step count and last run, an execution with its step
 * definitions resolved, aggregate counters. Those queries live here so the
 * console router stays a wiring layer, and so `/flow` keeps its shape.
 */

import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  orderStepsForDisplay,
  relativeTime,
  toConsoleExecution,
  toConsoleFlowStatus,
  toConsoleStep,
  toFlowStatus,
  type ConsoleExecution,
  type ConsoleFlowStatus,
  type ConsoleStep,
  type ExecutionStatus,
} from "./console-view.js";

export type ConsoleFlow = {
  id: string;
  name: string;
  description: string;
  status: ConsoleFlowStatus;
  eventKey: string | null;
  webhookKey: string | null;
  nodeCount: number;
  executionCount: number;
  lastExecutionTime: string;
  lastExecutionStatus: "success" | "failed" | "running" | "pending" | "never";
  lastExecutionId: string | null;
  updatedAt: string;
  updatedAtIso: string;
  createdAt: string;
  hasBranches: boolean;
  steps: ConsoleStep[];
};

const LIVE_STEP_COUNT = {
  _count: {
    select: {
      FlwSteps: { where: { deletedAt: null } },
      FlwExecutions: true,
    },
  },
} satisfies Prisma.FlwInclude;

const LATEST_EXECUTION = {
  FlwExecutions: {
    orderBy: { triggeredAt: "desc" },
    take: 1,
    select: { id: true, status: true, triggeredAt: true },
  },
} satisfies Prisma.FlwInclude;

function lastExecutionStatus(status?: ExecutionStatus): ConsoleFlow["lastExecutionStatus"] {
  switch (status) {
    case "Success":
      return "success";
    case "Failed":
      return "failed";
    case "Running":
      return "running";
    case "Pending":
      return "pending";
    default:
      return "never";
  }
}

function toConsoleFlow(
  flow: {
    id: string;
    name: string;
    description: string | null;
    status: "Draft" | "Active" | "Paused" | "Archived";
    eventKey: string | null;
    webhookKey: string | null;
    createdAt: Date;
    updatedAt: Date;
    FlwExecutions: Array<{ id: string; status: ExecutionStatus; triggeredAt: Date }>;
    _count: { FlwSteps: number; FlwExecutions: number };
  },
  steps: ConsoleStep[],
  now: Date,
): ConsoleFlow {
  const latest = flow.FlwExecutions[0];

  return {
    id: flow.id,
    name: flow.name,
    description: flow.description ?? "",
    status: toConsoleFlowStatus(flow.status, latest?.status ?? null),
    eventKey: flow.eventKey,
    webhookKey: flow.webhookKey,
    nodeCount: flow._count.FlwSteps,
    executionCount: flow._count.FlwExecutions,
    lastExecutionTime: relativeTime(latest?.triggeredAt ?? null, now),
    lastExecutionStatus: lastExecutionStatus(latest?.status),
    lastExecutionId: latest?.id ?? null,
    updatedAt: relativeTime(flow.updatedAt, now),
    updatedAtIso: flow.updatedAt.toISOString(),
    createdAt: flow.createdAt.toISOString().slice(0, 10),
    hasBranches: steps.some((step) => step.parentStepId !== null),
    steps,
  };
}

export async function listConsoleFlows(params: {
  search?: string | undefined;
  status?: string | undefined;
  limit: number;
  offset: number;
}): Promise<{ flows: ConsoleFlow[]; total: number }> {
  const search = params.search?.trim();
  const requestedStatus = params.status && params.status !== "all" ? params.status : undefined;
  const flowStatus = requestedStatus ? toFlowStatus(requestedStatus) : undefined;

  if (requestedStatus && !flowStatus) {
    throw new Error(`Unknown status filter: ${requestedStatus}`);
  }

  const where: Prisma.FlwWhereInput = {
    ...(flowStatus ? { status: flowStatus } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
            { eventKey: { contains: search, mode: "insensitive" as const } },
            { webhookKey: { contains: search, mode: "insensitive" as const } },
            { id: search },
          ],
        }
      : {}),
  };

  const [total, rows] = await Promise.all([
    prisma.flw.count({ where }),
    prisma.flw.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: params.offset,
      take: params.limit,
      include: { ...LATEST_EXECUTION, ...LIVE_STEP_COUNT },
    }),
  ]);

  // The list renders step counts, not step bodies, so the definitions are only
  // fetched for the page being returned.
  const stepsByFlow = await liveStepsByFlow(rows.map((row) => row.id));

  const now = new Date();
  const flows = rows.map((row) => toConsoleFlow(row, stepsByFlow.get(row.id) ?? [], now));

  // "failing" is derived, so it cannot be a SQL predicate. It narrows the
  // Active page that was already fetched; `total` is corrected to match what
  // the caller can actually see.
  if (requestedStatus === "failing") {
    const failing = flows.filter((flow) => flow.status === "failing");
    return { flows: failing, total: failing.length };
  }

  return { flows, total };
}

async function liveStepsByFlow(flwIds: string[]): Promise<Map<string, ConsoleStep[]>> {
  const byFlow = new Map<string, ConsoleStep[]>();
  if (flwIds.length === 0) return byFlow;

  const steps = await prisma.flwSteps.findMany({
    where: { flwId: { in: flwIds }, deletedAt: null },
    orderBy: [{ branchIndex: "asc" }, { position: "asc" }],
  });

  const grouped = new Map<string, typeof steps>();
  for (const step of steps) {
    const list = grouped.get(step.flwId) ?? [];
    list.push(step);
    grouped.set(step.flwId, list);
  }

  for (const [flwId, flowSteps] of grouped) {
    byFlow.set(flwId, orderStepsForDisplay(flowSteps).map(toConsoleStep));
  }

  return byFlow;
}

export async function getConsoleFlow(flwId: string): Promise<
  | (ConsoleFlow & {
      recentExecutions: ConsoleExecution[];
      metrics: FlowMetrics;
    })
  | null
> {
  const flow = await prisma.flw.findUnique({
    where: { id: flwId },
    include: { ...LATEST_EXECUTION, ...LIVE_STEP_COUNT },
  });

  if (!flow) return null;

  const [stepsByFlow, recent, metrics] = await Promise.all([
    liveStepsByFlow([flow.id]),
    prisma.flwExecutions.findMany({
      where: { flwId },
      orderBy: { triggeredAt: "desc" },
      take: 10,
      include: { Flw: { select: { name: true } }, _count: { select: { FlwExecutionSteps: true } } },
    }),
    getFlowMetrics(flwId),
  ]);

  const now = new Date();

  return {
    ...toConsoleFlow(flow, stepsByFlow.get(flow.id) ?? [], now),
    recentExecutions: recent.map((row) => ({
      ...toConsoleExecution(row, now),
      stepCount: row._count.FlwExecutionSteps,
    })),
    metrics,
  };
}

export type FlowMetrics = {
  windowHours: number;
  totalRuns: number;
  successRuns: number;
  failedRuns: number;
  runningRuns: number;
  successRate: number | null;
  allTimeRuns: number;
};

export async function getFlowMetrics(flwId: string, windowHours = 24): Promise<FlowMetrics> {
  const since = new Date(Date.now() - windowHours * 60 * 60 * 1000);
  const window = { flwId, triggeredAt: { gte: since } };

  const [totalRuns, successRuns, failedRuns, runningRuns, allTimeRuns] = await Promise.all([
    prisma.flwExecutions.count({ where: window }),
    prisma.flwExecutions.count({ where: { ...window, status: "Success" } }),
    prisma.flwExecutions.count({ where: { ...window, status: "Failed" } }),
    prisma.flwExecutions.count({ where: { ...window, status: "Running" } }),
    prisma.flwExecutions.count({ where: { flwId } }),
  ]);

  // Rate is over settled runs only – a window that is mostly still Pending
  // should not read as a collapse in success rate.
  const settled = successRuns + failedRuns;

  return {
    windowHours,
    totalRuns,
    successRuns,
    failedRuns,
    runningRuns,
    successRate: settled === 0 ? null : (successRuns / settled) * 100,
    allTimeRuns,
  };
}

const CONSOLE_TO_EXECUTION_STATUS: Record<string, ExecutionStatus> = {
  success: "Success",
  failed: "Failed",
  running: "Running",
  pending: "Pending",
};

export async function listConsoleExecutions(params: {
  flowId?: string | undefined;
  status?: string | undefined;
  limit: number;
  offset: number;
}): Promise<{ executions: ConsoleExecution[]; total: number }> {
  const requestedStatus = params.status && params.status !== "all" ? params.status : undefined;
  const status = requestedStatus ? CONSOLE_TO_EXECUTION_STATUS[requestedStatus.toLowerCase()] : undefined;

  if (requestedStatus && !status) {
    throw new Error(`Unknown status filter: ${requestedStatus}`);
  }

  const where: Prisma.FlwExecutionsWhereInput = {
    ...(params.flowId ? { flwId: params.flowId } : {}),
    ...(status ? { status } : {}),
  };

  const [total, rows] = await Promise.all([
    prisma.flwExecutions.count({ where }),
    prisma.flwExecutions.findMany({
      where,
      orderBy: { triggeredAt: "desc" },
      skip: params.offset,
      take: params.limit,
      include: { Flw: { select: { name: true } }, _count: { select: { FlwExecutionSteps: true } } },
    }),
  ]);

  const now = new Date();

  return {
    // Step bodies are deliberately not loaded for a list – the detail view
    // fetches them for the one execution being inspected.
    executions: rows.map((row) => ({
      ...toConsoleExecution(row, now),
      stepCount: row._count.FlwExecutionSteps,
    })),
    total,
  };
}

export async function getConsoleExecution(executionId: string): Promise<ConsoleExecution | null> {
  const row = await prisma.flwExecutions.findUnique({
    where: { id: executionId },
    include: {
      Flw: { select: { name: true } },
      FlwExecutionSteps: {
        // Postgres sorts NULLs last on ASC, so steps that never started trail
        // the ones that did, which is the order they would have run in.
        orderBy: [{ startedAt: "asc" }, { id: "asc" }],
        include: { FlwSteps: true },
      },
    },
  });

  return row ? toConsoleExecution(row) : null;
}

export type ConsoleStats = {
  totalFlows: number;
  activeFlows: number;
  totalExecutions: number;
  runningExecutions: number;
  failedExecutions: number;
  successfulExecutions: number;
  successRate: number | null;
  breakdown: Record<"active" | "draft" | "paused" | "archived", number>;
  recentFailures: number;
};

export async function getConsoleStats(): Promise<ConsoleStats> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [flowGroups, totalExecutions, running, failed, successful, recentFailures] =
    await Promise.all([
      prisma.flw.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.flwExecutions.count(),
      prisma.flwExecutions.count({ where: { status: "Running" } }),
      prisma.flwExecutions.count({ where: { status: "Failed" } }),
      prisma.flwExecutions.count({ where: { status: "Success" } }),
      prisma.flwExecutions.count({ where: { status: "Failed", triggeredAt: { gte: since } } }),
    ]);

  const breakdown = { active: 0, draft: 0, paused: 0, archived: 0 };
  let totalFlows = 0;

  for (const group of flowGroups) {
    const count = group._count._all;
    totalFlows += count;
    breakdown[group.status.toLowerCase() as keyof typeof breakdown] = count;
  }

  const settled = successful + failed;

  return {
    totalFlows,
    activeFlows: breakdown.active,
    totalExecutions,
    runningExecutions: running,
    failedExecutions: failed,
    successfulExecutions: successful,
    successRate: settled === 0 ? null : (successful / settled) * 100,
    breakdown,
    recentFailures,
  };
}

/**
 * Source payload for a re-run. The new execution is a fresh run of the *current*
 * definition with the original trigger payload – not a resume of the old one,
 * which would mean re-claiming steps that already succeeded.
 */
export async function getExecutionForRerun(executionId: string) {
  const execution = await prisma.flwExecutions.findUnique({
    where: { id: executionId },
    select: { id: true, flwId: true, triggerPayload: true },
  });

  if (!execution) {
    throw new Error(`Execution not found: ${executionId}`);
  }

  return execution;
}
