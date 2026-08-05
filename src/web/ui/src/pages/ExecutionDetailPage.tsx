import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExecutionDetailQuery, useRerunExecutionMutation } from '../api/flowApi';
import { useFlowStore } from '../store/useFlowStore';
import { StatusBadge } from '../components/StatusBadge';
import { JsonBlock } from '../components/JsonBlock';
import { apiErrorMessage } from '../lib/axios';
import {
  AlertCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Cloud,
  GitBranch,
  Loader2,
  RotateCw,
  Webhook,
} from 'lucide-react';

export const ExecutionDetailPage: React.FC = () => {
  const { exeId } = useParams<{ exeId: string }>();
  const navigate = useNavigate();
  const { addToast } = useFlowStore();

  const [isPayloadOpen, setIsPayloadOpen] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const { data: execution, isLoading } = useExecutionDetailQuery(exeId);
  const rerunMutation = useRerunExecutionMutation();

  const handleRerun = async () => {
    if (!exeId) return;
    try {
      const result = await rerunMutation.mutateAsync(exeId);
      const created = result.execution;
      addToast('Re-run queued as a new execution', 'success');
      if (created) navigate(`/executions/${created.id}`);
    } catch (error) {
      addToast(apiErrorMessage(error, 'Failed to re-run execution'), 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-background p-container-padding flex justify-center items-center text-on-surface-variant">
        <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
        Loading execution logs...
      </div>
    );
  }

  if (!execution) {
    return (
      <div className="flex-1 min-h-screen bg-background p-container-padding flex flex-col justify-center items-center">
        <AlertCircle className="w-12 h-12 text-error mb-4" />
        <h2 className="font-page-title text-card-title text-on-surface mb-2">Execution not found</h2>
        <p className="text-on-surface-variant text-sm mb-6">
          It may have been removed along with its flow.
        </p>
        <button
          onClick={() => navigate('/executions')}
          className="px-4 py-2 rounded bg-primary-container text-on-primary-container hover:bg-inverse-primary transition-colors cursor-pointer"
        >
          Back to executions
        </button>
      </div>
    );
  }

  const inFlight = execution.status === 'pending' || execution.status === 'running';

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-background p-container-padding lg:px-[80px] pt-[40px]">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/executions')}
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-label-nav text-label-nav">Back to executions</span>
          </button>
          <h2 className="font-page-title text-page-title text-on-surface">Execution details</h2>
          {inFlight && (
            <p className="text-sm text-primary mt-1 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Live — steps appear as the worker creates them
            </p>
          )}
        </div>

        <button
          onClick={handleRerun}
          disabled={rerunMutation.isPending}
          title="Runs the flow's current definition again with this trigger payload"
          className="level-1-surface px-4 py-2 rounded-DEFAULT font-label-nav text-label-nav text-on-surface hover:border-primary transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-4 h-4 ${rerunMutation.isPending ? 'animate-spin text-primary' : ''}`} />
          <span>Re-run</span>
        </button>
      </header>

      {/* Metadata */}
      <section className="level-1-surface rounded-DEFAULT p-gutter mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="min-w-0">
            <p className="text-on-surface-variant text-sm mb-1">Execution ID</p>
            <p className="font-code-block text-code-block text-on-surface truncate" title={execution.id}>
              {execution.id}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-on-surface-variant text-sm mb-1">Flow</p>
            <button
              onClick={() => navigate(`/flows/${execution.flowId}`)}
              className="font-card-title text-card-title text-on-surface hover:text-primary transition-colors cursor-pointer truncate block max-w-full text-left"
            >
              {execution.flowName}
            </button>
          </div>

          <div>
            <p className="text-on-surface-variant text-sm mb-1">Status</p>
            <StatusBadge status={execution.status} />
          </div>

          <div>
            <p className="text-on-surface-variant text-sm mb-1">Duration</p>
            <p className="text-body-base text-on-surface">
              {execution.duration}
              <span className="text-on-surface-variant text-sm"> · started {execution.triggeredAt}</span>
            </p>
          </div>
        </div>

        {execution.errorMessage && (
          <div className="mt-4 rounded border border-error/30 bg-error/10 p-3 text-error text-sm font-mono whitespace-pre-wrap">
            {execution.errorMessage}
          </div>
        )}
      </section>

      {/* Trigger payload */}
      <section className="level-1-surface rounded-DEFAULT mb-8 overflow-hidden">
        <div
          onClick={() => setIsPayloadOpen(!isPayloadOpen)}
          className="p-4 border-b border-surface-variant flex justify-between items-center cursor-pointer bg-surface hover:bg-surface-container-highest transition-colors"
        >
          <h3 className="font-card-title text-card-title text-on-surface flex items-center gap-2">
            <Webhook className="w-4 h-4 text-tertiary" />
            <span>Trigger payload</span>
          </h3>
          {isPayloadOpen ? (
            <ChevronUp className="w-5 h-5 text-on-surface-variant" />
          ) : (
            <ChevronDown className="w-5 h-5 text-on-surface-variant" />
          )}
        </div>

        {isPayloadOpen && (
          <div className="p-4 bg-surface-container-lowest">
            <JsonBlock content={execution.triggerPayload} maxHeight="max-h-96" />
          </div>
        )}
      </section>

      <h3 className="font-section-heading text-section-heading text-on-surface mb-6 border-b border-surface-variant pb-2">
        Steps ({execution.steps.length})
      </h3>

      <div className="relative ml-4 pl-8 border-l border-surface-variant space-y-6 pb-12">
        {execution.steps.length === 0 ? (
          <div className="p-4 text-on-surface-variant">
            No step has been claimed yet — the first one is queued.
          </div>
        ) : (
          execution.steps.map((step) => {
            // Failed steps default to open: that is what the page is for.
            const isOpen = expandedSteps[step.id] ?? step.status === 'failed';

            return (
              <div key={step.id} className={`relative ${step.status === 'pending' ? 'opacity-60' : ''}`}>
                <div
                  className={`absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-background border-2 flex items-center justify-center z-10 ${
                    step.status === 'success'
                      ? 'border-[#22C55E]'
                      : step.status === 'failed'
                        ? 'border-error shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                        : step.status === 'running'
                          ? 'border-primary'
                          : 'border-surface-variant'
                  }`}
                >
                  {step.status === 'success' && <div className="w-2 h-2 rounded-full bg-[#22C55E]" />}
                  {step.status === 'failed' && <div className="w-2 h-2 rounded-full bg-error" />}
                  {step.status === 'running' && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>

                <div
                  className={`level-1-surface rounded-DEFAULT p-4 transition-colors ${
                    step.status === 'failed' ? 'border-l-4 border-l-error' : ''
                  }`}
                >
                  <div
                    onClick={() =>
                      setExpandedSteps((current) => ({ ...current, [step.id]: !isOpen }))
                    }
                    className="flex justify-between items-start cursor-pointer select-none gap-3"
                  >
                    <div className="min-w-0">
                      <h4 className="font-card-title text-card-title text-on-surface mb-1 flex items-center gap-2 flex-wrap">
                        {step.name}
                        <span
                          className={`text-xs font-mono ${
                            step.status === 'failed' ? 'text-error' : 'text-[#22C55E]'
                          }`}
                        >
                          {step.duration}
                        </span>
                        {step.retryCount > 0 && (
                          <span className="text-xs text-amber-400 font-mono">
                            {step.retryCount} retr{step.retryCount === 1 ? 'y' : 'ies'}
                          </span>
                        )}
                        {step.depth > 0 && (
                          <span
                            className="text-xs text-tertiary flex items-center gap-1"
                            title={`Branch ${step.branchIndex}`}
                          >
                            <GitBranch className="w-3 h-3" /> branch {step.branchIndex}
                          </span>
                        )}
                      </h4>

                      <div className="flex gap-2 text-xs flex-wrap">
                        <span className="bg-surface-dim px-2 py-1 rounded text-on-surface-variant border border-surface-variant flex items-center gap-1 font-code-block">
                          <Cloud className="w-3 h-3" /> {step.integrationKey}
                        </span>
                        <span className="bg-surface-dim px-2 py-1 rounded text-on-surface-variant border border-surface-variant font-code-block">
                          {step.operationKey || '—'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={step.status} />
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-on-surface-variant" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 space-y-4 pt-3 border-t border-surface-container-high">
                      {step.errorMessage && (
                        <div className="bg-error/10 border border-error/30 rounded p-3 text-error text-sm font-mono whitespace-pre-wrap">
                          {step.errorMessage}
                        </div>
                      )}

                      <div>
                        <p className="text-on-surface-variant text-xs mb-2 font-mono uppercase tracking-wider">
                          Step definition (as configured)
                        </p>
                        <JsonBlock
                          content={step.inputMapping !== '{}' ? step.inputMapping : step.configPayload}
                        />
                      </div>

                      {step.outputPayload && (
                        <div>
                          <p className="text-on-surface-variant text-xs mb-2 font-mono uppercase tracking-wider">
                            Output
                          </p>
                          <JsonBlock content={step.outputPayload} />
                        </div>
                      )}

                      {step.startedAt && (
                        <p className="text-xs text-on-surface-variant font-mono">
                          {new Date(step.startedAt).toLocaleString()}
                          {step.finishedAt && ` → ${new Date(step.finishedAt).toLocaleString()}`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
