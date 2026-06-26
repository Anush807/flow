/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FlowStatus = 'Active' | 'Draft' | 'Paused';
export type StepType = 'Trigger' | 'Action' | 'Transform' | 'HTTP';
export type ExecutionStatus = 'Success' | 'Failed' | 'Running';

export interface Step {
  id: string;
  name: string;
  type: StepType;
  integrationKey?: string;
  operationKey?: string;
  payload: string; // JSON configuration string
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  status: FlowStatus;
  eventKey: string;
  webhookKey: string;
  icon: 'webhook' | 'database' | 'mail' | 'api' | 'schedule';
  stepsCount: number;
  lastRun: string;
  createdDate: string;
  steps: Step[];
}

export interface ExecutionStep {
  id: string;
  name: string;
  type: string; // Sub-type label like "Stripe Trigger", "Internal API", etc.
  startedAt: string;
  duration: string;
  status: ExecutionStatus;
  outputPayload?: string; // JSON string of results
}

export interface Execution {
  id: string;
  flowId: string;
  flowName: string;
  status: ExecutionStatus;
  triggeredAt: string;
  finishedAt: string;
  duration: string;
  triggerPayload: string; // JSON string of initial payload
  steps: ExecutionStep[];
}
