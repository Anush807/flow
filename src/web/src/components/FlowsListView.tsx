/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Webhook, Database, Mail, Key, Clock, Settings2, Trash2, Eye, Edit, HelpCircle } from 'lucide-react';
import { Flow, FlowStatus } from '../types';

interface FlowsListViewProps {
  flows: Flow[];
  onSelectFlow: (flow: Flow) => void;
  onEditFlow: (flow: Flow) => void;
  onDeleteFlow: (flowId: string) => void;
}

export default function FlowsListView({
  flows,
  onSelectFlow,
  onEditFlow,
  onDeleteFlow
}: FlowsListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FlowStatus | 'All'>('All');

  const filteredFlows = flows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          flow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          flow.eventKey.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : flow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getFlowIcon = (iconType: Flow['icon']) => {
    switch (iconType) {
      case 'webhook':
        return <Webhook className="w-5 h-5 text-[#dfb7ff]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#9a8ca2]" />;
      case 'mail':
        return <Mail className="w-5 h-5 text-[#ffb95f]" />;
      default:
        return <Webhook className="w-5 h-5 text-[#dfb7ff]" />;
    }
  };

  const getStatusBadge = (status: FlowStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            Active
          </span>
        );
      case 'Draft':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-500/20 bg-gray-500/10 text-gray-400">
            Draft
          </span>
        );
      case 'Paused':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-amber-500/20 bg-amber-500/10 text-amber-400">
            Paused
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden">
      {/* Header component */}
      <header className="flex justify-between items-center h-20 px-6 border-b border-[#2A2A2A] bg-[#131313]/80 backdrop-blur-md z-40 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#e5e2e1] tracking-tight">Flows</h1>
          <p className="text-xs text-[#d1c1d9] mt-1">Manage and monitor your automation pipelines.</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Filters */}
          <div className="flex bg-[#1c1b1b] p-1 rounded-lg border border-[#2A2A2A] text-xs">
            {(['All', 'Active', 'Paused', 'Draft'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  statusFilter === filter
                    ? 'bg-[#9D00FF] text-white font-medium'
                    : 'text-[#d1c1d9] hover:text-[#e5e2e1]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d1c1d9] w-4 h-4" />
            <input
              type="text"
              placeholder="Search flows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#201f1f] border border-[#2A2A2A] rounded-full py-1.5 pl-9 pr-4 text-xs text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all w-64 placeholder-on-surface-variant"
            />
          </div>
        </div>
      </header>

      {/* Main Grid View Scrollable container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFlows.length > 0 ? (
            filteredFlows.map((flow) => (
              <div
                key={flow.id}
                className="bg-[#201f1f] rounded-lg border border-[#2a2a2a] hover:border-[#9D00FF] hover:ring-1 hover:ring-[#9D00FF] transition-all duration-200 p-5 flex flex-col group relative overflow-hidden h-[260px]"
              >
                {/* Decorative glowing gradient path top-right */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#9D00FF]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-300"></div>

                {/* Card Icon & Badge */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 rounded bg-[#2a2a2a] flex items-center justify-center border border-[#393939]">
                    {getFlowIcon(flow.icon)}
                  </div>
                  {getStatusBadge(flow.status)}
                </div>

                {/* Content Section */}
                <div className="relative z-10 mb-4 flex-grow cursor-pointer" onClick={() => onSelectFlow(flow)}>
                  <h3 className="text-base font-bold text-[#e5e2e1] mb-1 group-hover:text-[#dfb7ff] transition-colors line-clamp-1">
                    {flow.name}
                  </h3>
                  <p className="text-xs text-[#d1c1d9] line-clamp-2 leading-relaxed">
                    {flow.description}
                  </p>
                </div>

                {/* Trigger key & details bottom section */}
                <div className="mt-auto space-y-3 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#d1c1d9]" />
                    <code className="font-mono text-[11px] text-[#dfb7ff] bg-[#131313] px-2 py-0.5 rounded border border-[#2a2a2a] truncate max-w-full">
                      {flow.eventKey}
                    </code>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#d1c1d9] border-t border-[#2a2a2a] pt-3">
                    <div className="flex items-center gap-1">
                      <Settings2 className="w-3.5 h-3.5" />
                      <span>{flow.steps.length} {flow.steps.length === 1 ? 'Step' : 'Steps'}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{flow.lastRun}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Hover Overlay (matches image details exactly) */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#201f1f] via-[#201f1f]/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex justify-end gap-2 items-end z-20 h-1/2">
                  <button
                    onClick={() => onSelectFlow(flow)}
                    className="w-8 h-8 rounded bg-[#393939] hover:bg-[#2a2a2a] text-white flex items-center justify-center transition-colors border border-[#2a2a2a] cursor-pointer"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 text-[#dfb7ff]" />
                  </button>
                  <button
                    onClick={() => onEditFlow(flow)}
                    className="w-8 h-8 rounded bg-[#393939] hover:bg-[#2a2a2a] text-white flex items-center justify-center transition-colors border border-[#2a2a2a] cursor-pointer"
                    title="Edit Flow"
                  >
                    <Edit className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button
                    onClick={() => onDeleteFlow(flow.id)}
                    className="w-8 h-8 rounded bg-[#393939] hover:bg-[#93000a] text-white flex items-center justify-center transition-colors border border-[#2a2a2a] cursor-pointer"
                    title="Delete Flow"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-[#2a2a2a] rounded-lg bg-[#1F1F1F]">
              <Database className="w-12 h-12 text-[#6B7280] mb-3" />
              <p className="text-[#e5e2e1] font-semibold text-sm">No automation flows found</p>
              <p className="text-[#d1c1d9] text-xs mt-1">Clear your search filters or create a new flow to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
