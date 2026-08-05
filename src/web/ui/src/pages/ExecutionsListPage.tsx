import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useExecutionsQuery, useFlowsQuery } from '../api/flowApi';
import { StatusBadge } from '../components/StatusBadge';
import { apiErrorMessage } from '../lib/axios';
import { Activity, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const PAGE_SIZE = 25;
const STATUSES = ['all', 'success', 'failed', 'running', 'pending'] as const;

/**
 * The list the prototype never had: executions are the table that actually
 * grows, so this one is server-paginated rather than fetched whole.
 */
export const ExecutionsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const flowId = searchParams.get('flowId') ?? '';
  const status = searchParams.get('status') ?? 'all';
  const [offset, setOffset] = useState(0);

  const { data: flows } = useFlowsQuery();
  const { data, isLoading, error, isFetching } = useExecutionsQuery({
    ...(flowId ? { flowId } : {}),
    status,
    limit: PAGE_SIZE,
    offset,
  });

  const executions = data?.data ?? [];
  const total = data?.pagination?.total ?? executions.length;
  const pageStart = total === 0 ? 0 : offset + 1;
  const pageEnd = Math.min(offset + PAGE_SIZE, total);

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    setOffset(0);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background overflow-y-auto">
      <header className="h-20 shrink-0 border-b border-surface-variant flex items-center justify-between px-container-padding bg-background/80 backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="font-page-title text-page-title text-on-surface font-bold tracking-tight flex items-center gap-3">
            <Activity className="w-6 h-6 text-primary" />
            Executions
          </h2>
          <div className="h-6 w-px bg-surface-variant" />
          <span className="text-on-surface-variant text-body-base">
            {isLoading ? 'Loading...' : `${total.toLocaleString()} total`}
            {isFetching && !isLoading && ' · refreshing'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={flowId}
            onChange={(event) => setFilter('flowId', event.target.value)}
            className="input-base w-56 cursor-pointer"
          >
            <option value="">All flows</option>
            {(flows ?? []).map((flow) => (
              <option key={flow.id} value={flow.id}>
                {flow.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => setFilter('status', event.target.value)}
            className="input-base w-40 capitalize cursor-pointer"
          >
            {STATUSES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="flex-1 p-container-padding">
        <div className="max-w-[1400px] mx-auto bg-surface-container border border-surface-container-high rounded-xl overflow-hidden">
          {error ? (
            <div className="p-8 text-error text-sm">{apiErrorMessage(error, 'Failed to load executions')}</div>
          ) : isLoading ? (
            <div className="p-16 flex justify-center items-center text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
              Loading executions...
            </div>
          ) : executions.length === 0 ? (
            <div className="p-16 text-center text-on-surface-variant text-sm">
              No executions match these filters.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high text-on-surface-variant font-label-nav text-[12px] uppercase tracking-wider">
                  <th className="p-4 font-medium">Execution</th>
                  <th className="p-4 font-medium">Flow</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Steps</th>
                  <th className="p-4 font-medium">Triggered</th>
                  <th className="p-4 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody className="font-body-base text-[14px]">
                {executions.map((execution) => (
                  <tr
                    key={execution.id}
                    onClick={() => navigate(`/executions/${execution.id}`)}
                    className="border-b border-surface-container-high hover:bg-surface-container-high transition-colors cursor-pointer group"
                  >
                    <td className="p-4 font-code-block text-xs text-on-surface-variant group-hover:text-primary transition-colors">
                      {execution.id.slice(0, 8)}
                    </td>
                    <td className="p-4 font-medium text-on-surface">{execution.flowName}</td>
                    <td className="p-4">
                      <StatusBadge status={execution.status} />
                    </td>
                    <td className="p-4 text-on-surface-variant">{execution.stepCount}</td>
                    <td className="p-4 text-on-surface-variant" title={execution.triggeredAtIso}>
                      {execution.triggeredAt}
                    </td>
                    <td className="p-4 text-on-surface-variant font-code-block">{execution.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {total > PAGE_SIZE && (
            <div className="p-4 flex items-center justify-between border-t border-surface-container-high text-sm text-on-surface-variant">
              <span>
                {pageStart}–{pageEnd} of {total.toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
                  disabled={offset === 0}
                  className="px-3 py-1.5 rounded border border-surface-variant hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={() => setOffset(offset + PAGE_SIZE)}
                  disabled={pageEnd >= total}
                  className="px-3 py-1.5 rounded border border-surface-variant hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
