import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateFlowMutation,
  useFlowDetailQuery,
  useIntegrationsQuery,
  useUpdateFlowMutation,
} from '../api/flowApi';
import { useFlowStore } from '../store/useFlowStore';
import { apiErrorMessage } from '../lib/axios';
import type { EditableFlowStatus, StepDraft, StepType } from '../types';
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  GitBranch,
  Loader2,
  Plus,
  Route,
  Save,
  Settings,
  Trash2,
} from 'lucide-react';

let draftCounter = 0;
const nextKey = () => `draft-${++draftCounter}`;

function emptyStep(type: StepType = 'Action'): StepDraft {
  return {
    key: nextKey(),
    name: '',
    type,
    integrationKey: '',
    operationKey: '',
    configPayload: '',
    inputMapping: '',
  };
}

/** JSON is validated as you type so a bad payload never reaches the API. */
function jsonError(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed === '') return null;
  try {
    JSON.parse(trimmed);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : 'Invalid JSON';
  }
}

export const FlowFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addToast } = useFlowStore();

  const { data: existingFlow, isLoading: isFetchingFlow } = useFlowDetailQuery(id);
  const { data: integrations } = useIntegrationsQuery();
  const createMutation = useCreateFlowMutation();
  const updateMutation = useUpdateFlowMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<EditableFlowStatus>('draft');
  const [eventKey, setEventKey] = useState('');
  const [webhookKey, setWebhookKey] = useState('');
  const [steps, setSteps] = useState<StepDraft[]>([emptyStep('Trigger')]);

  useEffect(() => {
    if (!isEdit || !existingFlow) return;

    setName(existingFlow.name);
    setDescription(existingFlow.description);
    // "failing" is a derived status and cannot be saved back.
    setStatus(existingFlow.status === 'failing' ? 'active' : existingFlow.status);
    setEventKey(existingFlow.eventKey ?? '');
    setWebhookKey(existingFlow.webhookKey ?? '');

    if (existingFlow.steps.length > 0) {
      setSteps(
        existingFlow.steps.map((step) => ({
          key: step.id,
          name: step.name,
          type: step.type,
          integrationKey: step.integrationKey,
          operationKey: step.operationKey,
          configPayload: step.configPayload === '{}' ? '' : step.configPayload,
          inputMapping: step.inputMapping === '{}' ? '' : step.inputMapping,
        })),
      );
    }
  }, [isEdit, existingFlow]);

  const integrationKeys = useMemo(
    () => [...new Set((integrations ?? []).map((operation) => operation.integrationKey))],
    [integrations],
  );

  const operationsFor = (integrationKey: string) =>
    (integrations ?? []).filter((operation) => operation.integrationKey === integrationKey);

  const updateStep = (index: number, patch: Partial<StepDraft>) => {
    setSteps((current) =>
      current.map((step, i) => {
        if (i !== index) return step;
        const next = { ...step, ...patch };
        // Switching integration invalidates whatever operation was selected.
        if (patch.integrationKey !== undefined && patch.integrationKey !== step.integrationKey) {
          next.operationKey = operationsFor(patch.integrationKey)[0]?.operationKey ?? '';
        }
        return next;
      }),
    );
  };

  const moveStep = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= steps.length) return;
    setSteps((current) => {
      const next = [...current];
      const [moved] = next.splice(index, 1);
      if (moved) next.splice(target, 0, moved);
      return next;
    });
  };

  const removeStep = (index: number) => {
    if (steps.length <= 1) {
      addToast('A flow needs at least one step', 'error');
      return;
    }
    setSteps((current) => current.filter((_, i) => i !== index));
  };

  const payloadErrors = steps.flatMap((step, index) => {
    const errors: string[] = [];
    const config = jsonError(step.configPayload);
    const mapping = jsonError(step.inputMapping);
    if (config) errors.push(`Step ${index + 1} config payload: ${config}`);
    if (mapping) errors.push(`Step ${index + 1} input mapping: ${mapping}`);
    if (!step.integrationKey) errors.push(`Step ${index + 1} needs an integration`);
    return errors;
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      addToast('Flow name is required', 'error');
      return;
    }
    if (payloadErrors.length > 0) {
      addToast(payloadErrors[0] ?? 'Fix the highlighted fields', 'error');
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      status,
      eventKey: eventKey.trim(),
      webhookKey: webhookKey.trim(),
      steps: steps.map((step) => ({
        name: step.name,
        type: step.type,
        integrationKey: step.integrationKey,
        operationKey: step.operationKey,
        configPayload: step.configPayload,
        inputMapping: step.inputMapping,
      })),
    };

    try {
      if (isEdit && id) {
        await updateMutation.mutateAsync({ id, data: payload });
        addToast(`Flow "${payload.name}" saved`, 'success');
        navigate(`/flows/${id}`);
      } else {
        const created = await createMutation.mutateAsync(payload);
        addToast(`Flow "${payload.name}" created`, 'success');
        navigate(`/flows/${created.id}`);
      }
    } catch (error) {
      addToast(apiErrorMessage(error, 'Failed to save flow'), 'error');
    }
  };

  if (isEdit && isFetchingFlow) {
    return (
      <div className="flex-1 min-h-screen bg-background p-container-padding flex justify-center items-center text-on-surface-variant">
        <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
        Loading flow configuration...
      </div>
    );
  }

  const saving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="flex-1 min-h-screen bg-background overflow-y-auto">
      <header className="h-16 border-b border-surface-variant bg-surface flex items-center px-container-padding sticky top-0 z-40 justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(isEdit && id ? `/flows/${id}` : '/flows')}
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-section-heading text-section-heading text-primary">
            {isEdit ? 'Edit flow' : 'Create flow'}
          </h2>
        </div>
      </header>

      <div className="p-container-padding max-w-5xl mx-auto space-y-gutter">
        <form onSubmit={handleSubmit} className="space-y-gutter">
          {/* Core configuration */}
          <div className="bg-surface-container border border-surface-container-high rounded-xl p-6">
            <h3 className="font-card-title text-card-title text-on-surface mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>Flow configuration</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-base" htmlFor="flowName">
                  Flow name
                </label>
                <input
                  id="flowName"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Sync customer data"
                  className="input-base"
                />
              </div>

              <div>
                <label className="label-base" htmlFor="flowStatus">
                  Status
                </label>
                <select
                  id="flowStatus"
                  value={status}
                  onChange={(event) => setStatus(event.target.value as EditableFlowStatus)}
                  className="input-base cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="archived">Archived</option>
                </select>
                <p className="text-xs text-on-surface-variant mt-1">
                  Only Active flows can be triggered — by webhook, event or manually.
                </p>
              </div>

              <div>
                <label className="label-base" htmlFor="eventKey">
                  Event key
                </label>
                <input
                  id="eventKey"
                  type="text"
                  value={eventKey}
                  onChange={(event) => setEventKey(event.target.value)}
                  placeholder="customer.created"
                  className="input-base font-code-block text-code-block"
                />
                <p className="text-xs text-on-surface-variant mt-1">
                  Unique across flows. Used by <code className="font-code-block">POST /flow/events/:eventKey/emit</code>.
                </p>
              </div>

              <div>
                <label className="label-base" htmlFor="webhookKey">
                  Webhook key
                </label>
                <input
                  id="webhookKey"
                  type="text"
                  value={webhookKey}
                  onChange={(event) => setWebhookKey(event.target.value)}
                  placeholder="wh_customer_created"
                  className="input-base font-code-block text-code-block"
                />
                <p className="text-xs text-on-surface-variant mt-1">
                  Public ingress at <code className="font-code-block">POST /webhooks/&lt;key&gt;</code>, so make it unguessable.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="label-base" htmlFor="flowDescription">
                  Description
                </label>
                <input
                  id="flowDescription"
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="What this flow does and who owns it"
                  className="input-base"
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="bg-surface-container border border-surface-container-high rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-card-title text-card-title text-on-surface flex items-center gap-2">
                <Route className="w-5 h-5 text-primary" />
                <span>Steps</span>
              </h3>

              <button
                type="button"
                onClick={() => setSteps((current) => [...current, emptyStep()])}
                className="border border-primary-container text-primary hover:bg-primary-container hover:text-white px-4 py-2 rounded text-[14px] font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add step</span>
              </button>
            </div>

            {isEdit && existingFlow?.hasBranches && (
              <div className="mb-6 flex items-start gap-2 rounded border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-400">
                <GitBranch className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  This flow has branches. Saving here replaces the definition with this single line of
                  steps, and the branch structure is lost. Executions already running finish on the old
                  definition.
                </span>
              </div>
            )}

            <div className="mb-6 text-xs text-on-surface-variant">
              Payload strings support <code className="font-code-block">{'{{ trigger.path }}'}</code> and{' '}
              <code className="font-code-block">{'{{ steps.<stepId>.path }}'}</code>. Input mapping wins over
              config payload when both are set.
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => {
                const configError = jsonError(step.configPayload);
                const mappingError = jsonError(step.inputMapping);
                const operations = operationsFor(step.integrationKey);

                return (
                  <div
                    key={step.key}
                    className="bg-surface border-l-[3px] border-l-primary-container border-y border-r border-surface-container-high rounded-r p-5 relative"
                  >
                    <div className="absolute -left-3 top-5 w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-[12px]">
                      {index + 1}
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveStep(index, -1)}
                        disabled={index === 0}
                        className="p-1 text-on-surface-variant hover:text-on-surface disabled:opacity-30 transition-colors cursor-pointer"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStep(index, 1)}
                        disabled={index === steps.length - 1}
                        className="p-1 text-on-surface-variant hover:text-on-surface disabled:opacity-30 transition-colors cursor-pointer"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                        title="Remove step"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pl-4 pr-24">
                      <div>
                        <label className="label-base">Step name</label>
                        <input
                          type="text"
                          value={step.name}
                          onChange={(event) => updateStep(index, { name: event.target.value })}
                          placeholder={`Step ${index + 1}`}
                          className="input-base"
                        />
                      </div>

                      <div>
                        <label className="label-base">Type</label>
                        <select
                          value={step.type}
                          onChange={(event) => updateStep(index, { type: event.target.value as StepType })}
                          className="input-base cursor-pointer"
                        >
                          <option value="Trigger">Trigger (skipped on dry runs)</option>
                          <option value="Action">Action</option>
                        </select>
                      </div>

                      <div>
                        <label className="label-base">Integration</label>
                        <select
                          value={step.integrationKey}
                          onChange={(event) => updateStep(index, { integrationKey: event.target.value })}
                          className="input-base font-code-block cursor-pointer"
                        >
                          <option value="">Select an integration…</option>
                          {integrationKeys.map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                          {step.integrationKey && !integrationKeys.includes(step.integrationKey) && (
                            <option value={step.integrationKey}>{step.integrationKey} (unregistered)</option>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="label-base">Operation</label>
                        <select
                          value={step.operationKey}
                          onChange={(event) => updateStep(index, { operationKey: event.target.value })}
                          disabled={!step.integrationKey}
                          className="input-base font-code-block cursor-pointer disabled:opacity-50"
                        >
                          <option value="">Select an operation…</option>
                          {operations.map((operation) => (
                            <option key={operation.key} value={operation.operationKey}>
                              {operation.operationKey}
                            </option>
                          ))}
                          {step.operationKey &&
                            !operations.some((op) => op.operationKey === step.operationKey) && (
                              <option value={step.operationKey}>{step.operationKey} (unregistered)</option>
                            )}
                        </select>
                      </div>
                    </div>

                    <div className="pl-4 space-y-4">
                      <PayloadField
                        label="Input mapping (JSON)"
                        value={step.inputMapping}
                        error={mappingError}
                        rows="h-24"
                        onChange={(value) => updateStep(index, { inputMapping: value })}
                      />
                      <PayloadField
                        label="Config payload (JSON)"
                        value={step.configPayload}
                        error={configError}
                        rows="h-32"
                        onChange={(value) => updateStep(index, { configPayload: value })}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {payloadErrors.length > 0 && (
            <div className="rounded border border-error/30 bg-error/10 p-4 text-sm text-error flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <ul className="space-y-1">
                {payloadErrors.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2 pb-12">
            <button
              type="submit"
              disabled={saving || payloadErrors.length > 0}
              className="w-full bg-primary-container text-white rounded font-card-title text-card-title py-4 hover:bg-inverse-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{isEdit ? 'Save changes' : 'Create flow'}</span>
                </>
              )}
            </button>
            {isEdit && (
              <p className="text-xs text-on-surface-variant text-center mt-3">
                Saving steps supersedes the current definition; past executions keep the steps they ran.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const PayloadField: React.FC<{
  label: string;
  value: string;
  error: string | null;
  rows: string;
  onChange: (value: string) => void;
}> = ({ label, value, error, rows, onChange }) => (
  <div>
    <label className="label-base">{label}</label>
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="{}"
      className={`w-full bg-surface-container-lowest border rounded p-3 text-on-surface-variant font-code-block text-code-block ${rows} focus:outline-none transition-colors ${
        error ? 'border-error focus:border-error' : 'border-surface-container-high focus:border-primary-container'
      }`}
    />
    {error && <p className="text-xs text-error mt-1">{error}</p>}
  </div>
);
