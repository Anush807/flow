import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteFlowMutation, useFlowsQuery } from '../api/flowApi';
import { useFlowStore } from '../store/useFlowStore';
import { StatusBadge } from '../components/StatusBadge';
import { apiErrorMessage } from '../lib/axios';
import type { Flow, FlowStatus } from '../types';
import {
  ArrowRight,
  Clock,
  Edit2,
  Filter,
  GitBranch,
  GitFork,
  Loader2,
  Play,
  Plus,
  Search,
  SortAsc,
  Terminal,
  Trash2,
  Webhook,
  Zap,
} from 'lucide-react';

const STATUS_FILTERS: Array<FlowStatus | 'all'> = [
  'all',
  'active',
  'failing',
  'draft',
  'paused',
  'archived',
];

export const FlowsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, openTestModal, openEmitModal, addToast } =
    useFlowStore();

  const [sortBy, setSortBy] = useState<'name' | 'updatedAt' | 'nodeCount' | 'executionCount'>('updatedAt');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { data: flows, isLoading, error } = useFlowsQuery(searchTerm, statusFilter);
  const deleteMutation = useDeleteFlowMutation();

  const handleDelete = async (event: React.MouseEvent, flow: Flow) => {
    event.stopPropagation();

    // The server refuses to delete a flow with runs still in flight, but the
    // history it *does* remove is gone for good – so this asks properly.
    const confirmed = confirm(
      `Delete "${flow.name}"?\n\nThis also deletes its ${flow.executionCount} execution record(s). ` +
        `To keep the history, set the flow to Archived instead.`,
    );
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(flow.id);
      addToast(`Flow "${flow.name}" deleted`, 'success');
    } catch (err) {
      addToast(apiErrorMessage(err, 'Failed to delete flow'), 'error');
    }
  };

  const activeCount = flows?.filter((flow) => flow.status === 'active' || flow.status === 'failing').length ?? 0;

  const sortedFlows = React.useMemo(() => {
    if (!flows) return [];
    return [...flows].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'nodeCount') return b.nodeCount - a.nodeCount;
      if (sortBy === 'executionCount') return b.executionCount - a.executionCount;
      return b.updatedAtIso.localeCompare(a.updatedAtIso);
    });
  }, [flows, sortBy]);

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-y-auto">
      <header className="h-20 shrink-0 border-b border-surface-variant flex items-center justify-between px-container-padding bg-background/80 backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="font-page-title text-page-title text-on-surface font-bold tracking-tight">Flows</h2>
          <div className="h-6 w-px bg-surface-variant" />
          <span className="text-on-surface-variant font-body-base text-body-base">
            {isLoading ? 'Loading...' : `${activeCount} active`}
          </span>
        </div>

        <button
          onClick={() => navigate('/flows/new')}
          className="bg-primary-container text-on-primary-container hover:bg-inverse-primary active:scale-95 transition-all duration-200 rounded-DEFAULT px-4 py-2 flex items-center gap-2 font-medium shadow-[0_0_15px_rgba(37,99,235,0.25)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Flow</span>
        </button>
      </header>

      <div className="flex-1 p-container-padding">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-gutter flex flex-wrap items-center justify-between gap-gutter">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, description, id, event or webhook key..."
                className="w-full bg-surface-container border border-surface-container-high text-on-surface rounded-DEFAULT py-2 pl-10 pr-4 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all font-body-base text-body-base placeholder:text-on-surface-variant"
              />
            </div>

            <div className="flex gap-2 relative">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowFilterDropdown(!showFilterDropdown);
                    setShowSortDropdown(false);
                  }}
                  className={`px-3 py-1.5 rounded-DEFAULT border bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
                    statusFilter !== 'all' ? 'border-primary text-primary' : 'border-surface-variant'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter {statusFilter !== 'all' ? `(${statusFilter})` : ''}</span>
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface-container border border-surface-container-high rounded-xl shadow-2xl z-30 py-2">
                    <div className="px-3 py-1 text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
                      Filter by status
                    </div>
                    {STATUS_FILTERS.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors capitalize cursor-pointer ${
                          statusFilter === status
                            ? 'bg-primary-container/20 text-primary font-semibold'
                            : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
                    setShowFilterDropdown(false);
                  }}
                  className="px-3 py-1.5 rounded-DEFAULT border border-surface-variant bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer"
                >
                  <SortAsc className="w-4 h-4" />
                  <span>Sort</span>
                </button>

                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface-container border border-surface-container-high rounded-xl shadow-2xl z-30 py-2">
                    <div className="px-3 py-1 text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
                      Sort flows by
                    </div>
                    {[
                      { label: 'Recently updated', value: 'updatedAt' },
                      { label: 'Flow name', value: 'name' },
                      { label: 'Step count', value: 'nodeCount' },
                      { label: 'Run count', value: 'executionCount' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value as typeof sortBy);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                          sortBy === option.value
                            ? 'bg-primary-container/20 text-primary font-semibold'
                            : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error ? (
            <div className="p-8 rounded-xl border border-error/30 bg-error/10 text-error text-sm">
              {apiErrorMessage(error, 'Failed to load flows')}
            </div>
          ) : isLoading ? (
            <div className="p-16 flex justify-center items-center text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
              Loading automation flows...
            </div>
          ) : sortedFlows.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-surface-container-high rounded-xl bg-surface-container/30 h-64">
              <GitFork className="w-12 h-12 text-outline mb-4" />
              <h3 className="font-card-title text-card-title text-on-surface mb-2">No flows found</h3>
              <p className="text-on-surface-variant text-sm mb-6 max-w-sm">
                Nothing matches the current search or status filter.
              </p>
              <button
                onClick={() => navigate('/flows/new')}
                className="bg-primary-container text-on-primary-container hover:bg-inverse-primary rounded-DEFAULT px-4 py-2 font-medium transition-colors cursor-pointer"
              >
                Create your first flow
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-gutter">
              {sortedFlows.map((flow) => {
                const isFailing = flow.status === 'failing';

                return (
                  <div
                    key={flow.id}
                    onClick={() => navigate(`/flows/${flow.id}`)}
                    className={`group bg-surface-container border border-surface-container-high rounded-xl p-5 hover:shadow-[0_0_20px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col relative overflow-hidden cursor-pointer ${
                      isFailing ? 'hover:border-error' : 'hover:border-primary-container'
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[3px] transition-opacity opacity-0 group-hover:opacity-100 ${
                        isFailing ? 'bg-error' : 'bg-primary-container'
                      }`}
                    />

                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div className="min-w-0">
                        <h3 className="font-card-title text-card-title text-on-surface mb-1 group-hover:text-primary transition-colors truncate">
                          {flow.name}
                        </h3>
                        <p className="text-on-surface-variant text-sm line-clamp-1">
                          {flow.description || 'No description'}
                        </p>
                      </div>
                      <StatusBadge status={flow.status} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-5 flex-1">
                      <div className="min-w-0">
                        <span className="text-xs text-on-surface-variant block mb-1">Trigger</span>
                        <div className="bg-surface-container-lowest border border-surface-container-high rounded p-1.5 flex items-center gap-2 overflow-hidden">
                          <Webhook className="w-4 h-4 text-tertiary shrink-0" />
                          <span className="font-code-block text-code-block text-outline truncate">
                            {flow.eventKey ?? (flow.webhookKey ? `webhook: ${flow.webhookKey}` : 'manual only')}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-on-surface-variant block mb-1">Last execution</span>
                        <div className="flex items-center gap-2 h-[34px]">
                          <span className="text-sm font-medium text-on-surface">{flow.lastExecutionTime}</span>
                          {flow.lastExecutionStatus === 'success' && (
                            <span className="text-xs text-[#4ade80] font-medium">Success</span>
                          )}
                          {flow.lastExecutionStatus === 'failed' && (
                            <span className="text-xs text-error font-medium">Failed</span>
                          )}
                          {flow.lastExecutionStatus === 'running' && (
                            <span className="text-xs text-primary font-medium">Running</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-surface-container-high pt-4 mt-auto">
                      <div className="flex items-center gap-4 text-xs text-on-surface-variant font-medium">
                        <span className="flex items-center gap-1.5">
                          <GitFork className="w-4 h-4" /> {flow.nodeCount} steps
                        </span>
                        {flow.hasBranches && (
                          <span className="flex items-center gap-1.5 text-tertiary" title="This flow branches">
                            <GitBranch className="w-4 h-4" /> branched
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> {flow.updatedAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            openTestModal(flow);
                          }}
                          className="p-1.5 rounded text-on-surface-variant hover:text-[#22c55e] hover:bg-[#22c55e]/10 transition-colors cursor-pointer"
                          title="Dry run (writes nothing)"
                        >
                          <Play className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            openEmitModal(flow);
                          }}
                          className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors cursor-pointer"
                          title="Trigger for real"
                        >
                          <Zap className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/flows/${flow.id}/edit`);
                          }}
                          className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
                          title="Edit flow"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(event) => void handleDelete(event, flow)}
                          className="p-1.5 rounded text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                          title="Delete flow"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/flows/${flow.id}`);
                          }}
                          className="px-3 py-1.5 rounded bg-surface-container-highest text-primary font-medium text-sm hover:bg-surface-bright transition-colors flex items-center gap-1.5 cursor-pointer ml-1"
                        >
                          <span>{isFailing ? 'View logs' : 'Open'}</span>
                          {isFailing ? <Terminal className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
