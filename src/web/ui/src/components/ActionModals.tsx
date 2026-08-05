import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmitEventMutation, useTestFlowMutation } from '../api/flowApi';
import { useFlowStore } from '../store/useFlowStore';
import { apiErrorMessage } from '../lib/axios';
import type { TestRunResult } from '../types';
import { AlertCircle, CheckCircle2, Loader2, MinusCircle, Play, X, Zap } from 'lucide-react';

const SAMPLE_PAYLOAD = JSON.stringify({ example: 'replace me', id: 123 }, null, 2);

export const ActionModals: React.FC = () => {
  const navigate = useNavigate();
  const {
    isTestModalOpen,
    isEmitModalOpen,
    activeFlowForAction: flow,
    closeTestModal,
    closeEmitModal,
    addToast,
  } = useFlowStore();

  const testMutation = useTestFlowMutation();
  const emitMutation = useEmitEventMutation();

  const [payload, setPayload] = useState(SAMPLE_PAYLOAD);
  const [idempotencyKey, setIdempotencyKey] = useState('');
  const [testResult, setTestResult] = useState<TestRunResult | null>(null);

  // Each time a modal opens on a flow, start from a clean payload and drop the
  // previous run's output.
  useEffect(() => {
    if (flow) {
      setPayload(SAMPLE_PAYLOAD);
      setIdempotencyKey('');
      setTestResult(null);
    }
  }, [flow, isTestModalOpen, isEmitModalOpen]);

  if (!flow) return null;

  const payloadInvalid = (() => {
    try {
      JSON.parse(payload);
      return false;
    } catch {
      return true;
    }
  })();

  const handleRunTest = async () => {
    try {
      const result = await testMutation.mutateAsync({ flowId: flow.id, payload });
      setTestResult(result);
    } catch (error) {
      addToast(apiErrorMessage(error, 'Dry run failed'), 'error');
    }
  };

  const handleEmit = async () => {
    try {
      const result = await emitMutation.mutateAsync({
        flowId: flow.id,
        payload,
        ...(idempotencyKey.trim() ? { idempotencyKey: idempotencyKey.trim() } : {}),
      });

      if (result.duplicate) {
        addToast('Duplicate idempotency key — the existing execution was returned', 'info');
      } else {
        addToast('Execution queued', 'success');
      }

      closeEmitModal();
      if (result.execution) navigate(`/executions/${result.execution.id}`);
    } catch (error) {
      addToast(apiErrorMessage(error, 'Failed to trigger flow'), 'error');
    }
  };

  return (
    <>
      {/* Dry run */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container border border-surface-container-high rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-[#22c55e]">
                <Play className="w-5 h-5" />
                <h3 className="font-card-title text-card-title text-on-surface">Dry run</h3>
              </div>
              <button
                onClick={closeTestModal}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-on-surface-variant mb-4">
              Runs <span className="text-on-surface font-semibold">{flow.name}</span> in-process against this
              payload. Nothing is persisted and no job is queued — but the integrations do run for real, so
              an HTTP step really calls out and an email step really sends.
              {flow.hasBranches && ' Branches are not walked on a dry run.'}
            </p>

            <div className="mb-4">
              <label className="label-base">Trigger payload (JSON)</label>
              <textarea
                value={payload}
                onChange={(event) => setPayload(event.target.value)}
                className={`w-full bg-surface-container-lowest border rounded p-3 text-on-surface-variant font-code-block text-code-block h-40 focus:outline-none transition-colors ${
                  payloadInvalid ? 'border-error' : 'border-surface-container-high focus:border-primary-container'
                }`}
              />
              {payloadInvalid && <p className="text-xs text-error mt-1">Payload is not valid JSON</p>}
            </div>

            {testResult && <TestResultPanel result={testResult} />}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={closeTestModal}
                className="px-4 py-2 rounded border border-surface-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleRunTest}
                disabled={testMutation.isPending || payloadInvalid}
                className="px-4 py-2 rounded bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 hover:bg-[#22c55e]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center gap-2 cursor-pointer"
              >
                {testMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Executing steps...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    {testResult ? 'Run again' : 'Run dry run'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real trigger */}
      {isEmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container border border-surface-container-high rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="w-5 h-5 fill-current" />
                <h3 className="font-card-title text-card-title text-on-surface">Trigger execution</h3>
              </div>
              <button
                onClick={closeEmitModal}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-on-surface-variant mb-4">
              Creates a real execution of <span className="text-on-surface font-semibold">{flow.name}</span>{' '}
              and hands the first step to the worker. Only Active flows can be triggered.
            </p>

            <div className="mb-4">
              <label className="label-base">Trigger payload (JSON)</label>
              <textarea
                value={payload}
                onChange={(event) => setPayload(event.target.value)}
                className={`w-full bg-surface-container-lowest border rounded p-3 text-on-surface-variant font-code-block text-code-block h-40 focus:outline-none transition-colors ${
                  payloadInvalid ? 'border-error' : 'border-surface-container-high focus:border-primary-container'
                }`}
              />
              {payloadInvalid && <p className="text-xs text-error mt-1">Payload is not valid JSON</p>}
            </div>

            <div className="mb-4">
              <label className="label-base">Idempotency key (optional)</label>
              <input
                type="text"
                value={idempotencyKey}
                onChange={(event) => setIdempotencyKey(event.target.value)}
                placeholder="Re-using a key returns the original execution"
                className="input-base font-code-block"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={closeEmitModal}
                className="px-4 py-2 rounded border border-surface-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleEmit}
                disabled={emitMutation.isPending || payloadInvalid}
                className="px-4 py-2 rounded bg-primary-container hover:bg-inverse-primary text-on-primary-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center gap-2 cursor-pointer"
              >
                {emitMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Queueing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Trigger now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TestResultPanel: React.FC<{ result: TestRunResult }> = ({ result }) => (
  <div className="mb-4 rounded border border-surface-container-high bg-surface-container-lowest">
    <div className="p-3 border-b border-surface-container-high flex items-center justify-between text-sm">
      <span
        className={`font-medium ${
          result.status === 'success'
            ? 'text-[#22c55e]'
            : result.status === 'partial'
              ? 'text-amber-400'
              : 'text-error'
        }`}
      >
        {result.status === 'success' ? 'All steps succeeded' : `Run ${result.status}`}
      </span>
      <span className="text-on-surface-variant font-code-block text-xs">
        {result.executedSteps}/{result.totalSteps} steps · {result.duration}
      </span>
    </div>

    <div className="divide-y divide-surface-container-high max-h-64 overflow-y-auto">
      {result.steps.map((step) => (
        <div key={step.stepId} className="p-3 text-sm">
          <div className="flex items-center gap-2">
            {step.status === 'success' && <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />}
            {step.status === 'failed' && <AlertCircle className="w-4 h-4 text-error shrink-0" />}
            {step.status === 'skipped' && <MinusCircle className="w-4 h-4 text-on-surface-variant shrink-0" />}
            <span className="text-on-surface font-medium truncate">{step.name ?? step.stepId}</span>
            <span className="text-on-surface-variant font-code-block text-xs ml-auto shrink-0">
              {step.duration}
            </span>
          </div>

          <p className="text-xs text-on-surface-variant font-code-block mt-1">
            {step.integrationKey}:{step.operationKey ?? '—'}
          </p>

          {step.error && (
            <pre className="mt-2 p-2 rounded bg-error/10 border border-error/30 text-error text-xs whitespace-pre-wrap">
              {step.error}
            </pre>
          )}

          {step.outputPayload && step.status === 'success' && (
            <pre className="mt-2 p-2 rounded bg-surface-container border border-surface-container-high text-on-surface-variant text-xs overflow-x-auto max-h-32">
              {step.outputPayload}
            </pre>
          )}
        </div>
      ))}
    </div>
  </div>
);
