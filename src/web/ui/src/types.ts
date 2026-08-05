/**
 * Mirrors the console API's DTOs (`src/services/console-view.ts` and
 * `src/services/console-service.ts` on the server). Nothing here is invented by
 * the UI: if a screen needs a field, it gets added to the server mapper first.
 */

/** `failing` is derived server-side: an Active flow whose last run failed. */
export type FlowStatus = 'active' | 'draft' | 'paused' | 'archived' | 'failing';

/** The four statuses a flow can actually be saved as. */
export type EditableFlowStatus = 'draft' | 'active' | 'paused' | 'archived';

export type ExecutionStatus = 'success' | 'failed' | 'pending' | 'running';

export type StepType = 'Trigger' | 'Action';

export interface FlowStep {
  id: string;
  name: string;
  type: StepType;
  integrationKey: string;
  operationKey: string;
  /** JSON text – the console edits these in textareas. */
  configPayload: string;
  inputMapping: string;
  position: number;
  branchIndex: number;
  parentStepId: string | null;
  /** 0 on the main line, deeper for steps inside a branch. */
  depth: number;
}

export interface ExecutionStep extends FlowStep {
  status: ExecutionStatus;
  duration: string;
  retryCount: number;
  errorMessage?: string;
  outputPayload?: string;
  startedAt: string | null;
  finishedAt: string | null;
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  status: FlowStatus;
  eventKey: string | null;
  webhookKey: string | null;
  nodeCount: number;
  executionCount: number;
  lastExecutionTime: string;
  lastExecutionStatus: 'success' | 'failed' | 'running' | 'pending' | 'never';
  lastExecutionId: string | null;
  updatedAt: string;
  updatedAtIso: string;
  createdAt: string;
  hasBranches: boolean;
  steps: FlowStep[];
}

export interface FlowMetrics {
  windowHours: number;
  totalRuns: number;
  successRuns: number;
  failedRuns: number;
  runningRuns: number;
  successRate: number | null;
  allTimeRuns: number;
}

export interface FlowDetail extends Flow {
  recentExecutions: Execution[];
  metrics: FlowMetrics;
}

export interface Execution {
  id: string;
  flowId: string;
  flowName: string;
  status: ExecutionStatus;
  triggeredAt: string;
  triggeredAtIso: string;
  duration: string;
  triggerPayload: string;
  stepCount: number;
  steps: ExecutionStep[];
  errorMessage?: string;
}

export interface DashboardStats {
  totalFlows: number;
  activeFlows: number;
  totalExecutions: number;
  runningExecutions: number;
  failedExecutions: number;
  successfulExecutions: number;
  successRate: number | null;
  breakdown: {
    active: number;
    draft: number;
    paused: number;
    archived: number;
  };
  recentFailures: number;
}

export interface IntegrationOperation {
  key: string;
  integrationKey: string;
  operationKey: string;
}

export interface EngineSettings {
  environment: string;
  authRequired: boolean;
  worker: {
    concurrency: number;
    stepMaxRetries: number;
    stepRetryBaseDelayMs: number;
  };
  recovery: {
    intervalMs: number;
    batchSize: number;
  };
  rateLimits: {
    windowMs: number;
    managementMax: number;
    ingressMax: number;
  };
  logLevel: string;
  emailConfigured: boolean;
  /** null when Redis could not be reached in time. */
  queue: Record<string, number> | null;
}

/** A dry run: executed in-process, persisted nowhere, branches not walked. */
export interface TestRunStep {
  stepId: string;
  name: string | null;
  type: StepType;
  integrationKey: string;
  operationKey: string | null;
  status: 'success' | 'failed' | 'skipped';
  outputPayload?: string;
  error: string | null;
  duration: string;
}

export interface TestRunResult {
  flowId: string;
  flowName: string;
  totalSteps: number;
  executedSteps: number;
  status: 'success' | 'failed' | 'partial';
  duration: string;
  steps: TestRunStep[];
}

export interface Pagination {
  limit: number;
  offset: number;
  total: number;
}

/** The console API wraps every payload in `{ data, pagination? }`. */
export interface ApiEnvelope<T> {
  data: T;
  pagination?: Pagination;
  message?: string;
}

/** A step as the form edits it, before the server assigns it an id. */
export interface StepDraft {
  key: string;
  name: string;
  type: StepType;
  integrationKey: string;
  operationKey: string;
  configPayload: string;
  inputMapping: string;
}

export interface FlowFormPayload {
  name: string;
  description: string;
  status: EditableFlowStatus;
  eventKey: string;
  webhookKey: string;
  steps: Array<Omit<StepDraft, 'key'>>;
}
