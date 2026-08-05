import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFlowDetailQuery } from '../api/flowApi';
import { useFlowStore } from '../store/useFlowStore';
import { StatusBadge } from '../components/StatusBadge';
import { JsonBlock } from '../components/JsonBlock';
import { apiErrorMessage } from '../lib/axios';
import {
  AlertCircle,
  ArrowLeft,
  Copy,
  Edit,
  GitBranch,
  GitFork,
  Loader2,
  Play,
  Webhook,
  Zap,
} from 'lucide-react';

export const FlowDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openTestModal, openEmitModal, addToast } = useFlowStore();

  const { data: flow, isLoading, error } = useFlowDetailQuery(id);

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-background p-container-padding flex justify-center items-center text-on-surface-variant">
        <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
        Loading flow configuration...
      </div>
    );
  }

  if (error || !flow) {
    return (
      <div className="flex-1 min-h-screen bg-background p-container-padding flex flex-col justify-center items-center">
        <AlertCircle className="w-12 h-12 text-error mb-4" />
        <h2 className="font-page-title text-card-title text-on-surface mb-2">Flow not found</h2>
        <p className="text-on-surface-variant text-sm mb-6">
          {error ? apiErrorMessage(error) : 'The requested flow does not exist or was deleted.'}
        </p>
        <button
          onClick={() => navigate('/flows')}
          className="px-4 py-2 rounded bg-primary-container text-on-primary-container hover:bg-inverse-primary transition-colors cursor-pointer"
        >
          Back to flows
        </button>
      </div>
    );
  }

  const webhookUrl = flow.webhookKey ? `${window.location.origin}/webhooks/${flow.webhookKey}` : null;

  return (
    <div className="flex-1 min-h-screen bg-background p-container-padding flex flex-col gap-6 overflow-y-auto">
      <div>
        <button
          onClick={() => navigate('/flows')}
          className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to flows</span>
        </button>
      </div>

      {/* Header */}
      <section className="bg-surface-container border border-surface-container-high rounded-lg p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-[24px] font-[700] tracking-tight text-on-surface">{flow.name}</h2>
            <StatusBadge status={flow.status} />
          </div>

          {flow.description && <p className="text-sm text-on-surface-variant">{flow.description}</p>}

          <div className="flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
            <span className="flex items-center gap-1 bg-surface-container-lowest border border-surface-container-high px-2 py-0.5 rounded font-code-block text-code-block text-outline">
              <Webhook className="w-3.5 h-3.5 text-tertiary" />
              {flow.eventKey ?? 'no event key'}
            </span>
            <span>•</span>
            <span>Last run: {flow.lastExecutionTime}</span>
            <span>•</span>
            <span className="font-code-block text-xs">{flow.id}</span>
          </div>

          {webhookUrl && (
            <button
              onClick={() => {
                void navigator.clipboard.writeText(webhookUrl);
                addToast('Webhook URL copied', 'success');
              }}
              className="self-start flex items-center gap-2 text-xs font-code-block text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Public ingress URL for this flow"
            >
              <Copy className="w-3.5 h-3.5" />
              {webhookUrl}
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate(`/flows/${flow.id}/edit`)}
            className="px-4 py-2 rounded border border-surface-container-high bg-surface hover:border-primary transition-colors text-on-surface flex items-center gap-2 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => openTestModal(flow)}
            className="px-4 py-2 rounded border border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Dry run</span>
          </button>

          <button
            onClick={() => openEmitModal(flow)}
            disabled={flow.status === 'draft' || flow.status === 'archived' || flow.status === 'paused'}
            title={
              flow.status === 'active' || flow.status === 'failing'
                ? 'Trigger a real execution'
                : 'Only Active flows can be triggered'
            }
            className="px-4 py-2 rounded bg-primary-container text-on-primary-container hover:bg-inverse-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.25)]"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Trigger</span>
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Steps */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="font-section-heading text-section-heading text-on-surface flex items-center gap-2">
            <GitFork className="w-5 h-5 text-primary" />
            <span>Steps</span>
            <span className="text-sm text-on-surface-variant font-normal">({flow.nodeCount})</span>
          </h3>

          {flow.hasBranches && (
            <div className="flex items-start gap-2 rounded border border-tertiary/30 bg-tertiary/10 p-3 text-sm text-tertiary">
              <GitBranch className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                This flow branches. Steps are listed in execution order, indented by branch depth; the
                editor works on a single line of steps and would flatten the branch structure.
              </span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {flow.steps.length > 0 ? (
              flow.steps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative flex gap-4 group"
                  style={{ marginLeft: `${step.depth * 24}px` }}
                >
                  <div className="w-10 shrink-0 flex justify-center pt-4">
                    <div
                      className={`w-8 h-8 rounded-full border-2 bg-background text-on-surface flex items-center justify-center font-bold text-sm ${
                        step.type === 'Trigger' ? 'border-tertiary' : 'border-primary'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1 bg-surface-container border border-surface-container-high rounded p-4 flex flex-col gap-3 group-hover:border-primary-container/50 transition-colors border-l-[3px] border-l-primary-container min-w-0">
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0">
                        <h4 className="font-card-title text-card-title text-on-surface truncate">{step.name}</h4>
                        <p className="text-sm text-on-surface-variant mt-1 font-code-block">
                          {step.integrationKey}:{step.operationKey || '—'}
                        </p>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest border border-surface-container-high text-xs text-on-surface-variant flex items-center gap-1.5 font-code-block shrink-0">
                        {step.depth > 0 && <GitBranch className="w-3.5 h-3.5 text-tertiary" />}
                        {step.type}
                      </span>
                    </div>

                    <div>
                      <p className="text-on-surface-variant text-xs mb-1 uppercase tracking-wider">
                        {step.inputMapping !== '{}' ? 'Input mapping' : 'Config payload'}
                      </p>
                      <JsonBlock
                        content={step.inputMapping !== '{}' ? step.inputMapping : step.configPayload}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-on-surface-variant bg-surface-container rounded-lg border border-surface-container-high">
                No steps defined yet. Use "Edit" to add them.
              </div>
            )}
          </div>
        </div>

        {/* Runs + metrics */}
        <div className="flex flex-col gap-6">
          <h3 className="font-section-heading text-section-heading text-on-surface flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Recent executions</span>
          </h3>

          <div className="bg-surface-container border border-surface-container-high rounded-lg overflow-hidden flex flex-col">
            <div className="p-3 border-b border-surface-container-high bg-surface-container-low grid grid-cols-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              <div>Status</div>
              <div>Duration</div>
              <div className="text-right">When</div>
            </div>

            {flow.recentExecutions.length === 0 ? (
              <div className="p-6 text-center text-sm text-on-surface-variant">No runs yet.</div>
            ) : (
              flow.recentExecutions.map((execution) => (
                <div
                  key={execution.id}
                  onClick={() => navigate(`/executions/${execution.id}`)}
                  className="p-3 border-b border-surface-container-high grid grid-cols-3 items-center text-sm hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  <StatusBadge status={execution.status} />
                  <div className="text-on-surface-variant font-code-block text-xs">{execution.duration}</div>
                  <div className="text-right text-on-surface-variant text-xs">{execution.triggeredAt}</div>
                </div>
              ))
            )}

            <button
              onClick={() => navigate(`/executions?flowId=${flow.id}`)}
              className="p-3 text-center bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="text-sm text-primary font-medium">
                View all {flow.executionCount} execution(s)
              </span>
            </button>
          </div>

          <div className="bg-surface-container border border-surface-container-high rounded-lg p-5 flex flex-col gap-4 mt-auto">
            <h4 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
              Metrics (last {flow.metrics.windowHours}h)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-stat-number text-stat-number text-on-surface">
                  {flow.metrics.totalRuns.toLocaleString()}
                </span>
                <span className="text-xs text-on-surface-variant">Runs</span>
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className={`font-stat-number text-stat-number ${
                    flow.metrics.successRate === null
                      ? 'text-on-surface-variant'
                      : flow.metrics.successRate >= 99
                        ? 'text-[#22c55e]'
                        : flow.metrics.successRate >= 90
                          ? 'text-amber-400'
                          : 'text-error'
                  }`}
                >
                  {flow.metrics.successRate === null ? '—' : `${flow.metrics.successRate.toFixed(1)}%`}
                </span>
                <span className="text-xs text-on-surface-variant">Success rate</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-stat-number text-stat-number text-error">{flow.metrics.failedRuns}</span>
                <span className="text-xs text-on-surface-variant">Failed</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-stat-number text-stat-number text-primary">
                  {flow.metrics.runningRuns}
                </span>
                <span className="text-xs text-on-surface-variant">Running</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant border-t border-surface-container-high pt-3">
              {flow.metrics.allTimeRuns.toLocaleString()} runs all time · created {flow.createdAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
