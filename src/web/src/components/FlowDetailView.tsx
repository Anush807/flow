/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Edit, Play, Calendar, Route, Key, Code, Database, Globe, ChevronRight } from 'lucide-react';
import { Flow, Execution } from '../types';

interface FlowDetailViewProps {
  flow: Flow;
  executions: Execution[];
  onBack: () => void;
  onEdit: (flow: Flow) => void;
  onEmitEvent: (flow: Flow) => void;
  onSelectExecution: (execution: Execution) => void;
}

export default function FlowDetailView({
  flow,
  executions,
  onBack,
  onEdit,
  onEmitEvent,
  onSelectExecution
}: FlowDetailViewProps) {
  // Filter executions for this specific flow
  const flowExecutions = executions.filter(e => e.flowId === flow.id || e.flowName === flow.name);
  const latestRun = flowExecutions[0] || null;

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'Trigger':
        return <Globe className="w-4 h-4 text-[#ffb781]" />;
      case 'Action':
        return <Database className="w-4 h-4 text-[#dfb7ff]" />;
      case 'Transform':
        return <Code className="w-4 h-4 text-[#ffb95f]" />;
      case 'HTTP':
        return <Globe className="w-4 h-4 text-[#dfb7ff]" />;
      default:
        return <Code className="w-4 h-4 text-[#e5e2e1]" />;
    }
  };

  return (
    <div className="flex-grow flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="flex justify-between items-center h-16 px-6 bg-[#131313] border-b border-[#2A2A2A] sticky top-0 z-10">
        <button
          onClick={onBack}
          className="hover:text-[#dfb7ff] text-[#d1c1d9] transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Flows</span>
        </button>
      </header>

      {/* Page Content wrapper */}
      <div className="p-6 flex-1 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-[#2A2A2A] pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#e5e2e1] tracking-tight">{flow.name}</h2>
              {flow.status === 'Active' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active
                </span>
              ) : flow.status === 'Paused' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Paused
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/15 text-gray-400 border border-gray-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  Draft
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#d1c1d9]">
              <div className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" />
                <span className="font-mono text-[#dfb7ff] bg-[#1c1b1b] px-1.5 py-0.5 rounded border border-[#2a2a2a]">{flow.eventKey}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#2A2A2A]"></div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Created {flow.createdDate}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#2A2A2A]"></div>
              <div className="flex items-center gap-1.5">
                <Route className="w-3.5 h-3.5" />
                <span>{flow.steps.length} {flow.steps.length === 1 ? 'Step' : 'Steps'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onEdit(flow)}
              className="px-4 py-2 rounded-lg border border-[#9D00FF]/50 text-[#dfb7ff] font-medium text-xs hover:bg-[#9D00FF]/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Flow</span>
            </button>
            <button
              onClick={() => onEmitEvent(flow)}
              className="px-4 py-2 rounded-lg bg-[#9D00FF] hover:bg-[#8c00e5] text-white font-medium text-xs hover:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(157,0,255,0.25)]"
            >
              <Play className="w-4 h-4" />
              <span>Emit Event</span>
            </button>
          </div>
        </div>

        {/* Bento Grid Layout for Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Steps Definition (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#e5e2e1]">Flow Definition</h3>
              <div className="text-xs text-[#d1c1d9]">
                Execution Mode: <span className="text-[#e5e2e1] font-semibold">Sequential</span>
              </div>
            </div>

            <div className="relative">
              {/* Vertical connecting timeline line */}
              <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-[#2a2a2a] z-0"></div>

              <div className="flex flex-col gap-6 relative z-10">
                {flow.steps.map((step, idx) => (
                  <div key={step.id} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-[#131313] border border-[#2A2A2A] flex items-center justify-center font-bold text-xs text-on-surface group-hover:border-[#9D00FF] transition-colors shrink-0 mt-1 relative z-10 bg-background">
                      <div className="w-7 h-7 rounded-full bg-[#9D00FF]/20 flex items-center justify-center text-[#dfb7ff]">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="flex-1 bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-sm group-hover:border-[#4e4356] transition-colors">
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2A] bg-[#1c1b1b]/40">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#2b2b2b] flex items-center justify-center border border-[#2a2a2a]">
                            {getStepIcon(step.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#e5e2e1] text-xs sm:text-sm">{step.name}</h4>
                            <div className="flex items-center gap-2 text-[10px] sm:text-xs mt-0.5">
                              <span className="px-1.5 py-0.5 rounded bg-[#2a2a2a] text-[#d1c1d9] font-mono">
                                Type: {step.type}
                              </span>
                              {(step.integrationKey || step.operationKey) && (
                                <>
                                  <span className="text-[#2A2A2A]">•</span>
                                  <span className="text-[#d1c1d9] font-mono truncate max-w-[150px] sm:max-w-none">
                                    {step.integrationKey}.{step.operationKey}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Code Block payload display */}
                      <div className="bg-[#0D0D0D] p-3.5 font-mono text-[11px] sm:text-xs text-[#d1c1d9] overflow-x-auto border-t border-black/50 scrollbar-thin">
                        <pre className="text-emerald-400">
                          <code>{step.payload}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Recent Execution Summary (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-base font-semibold text-[#e5e2e1]">Recent Executions</h3>
            
            {latestRun ? (
              <div className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A] bg-[#1c1b1b]/50">
                  <span className="text-xs font-semibold text-[#d1c1d9]">Latest Run</span>
                  {latestRun.status === 'Success' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400">Success</span>
                  ) : latestRun.status === 'Failed' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400">Failed</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#9D00FF]/15 text-[#dfb7ff] animate-pulse">Running</span>
                  )}
                </div>

                <div className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#d1c1d9]">Execution ID</span>
                    <span className="font-mono text-xs text-[#dfb7ff]">{latestRun.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#d1c1d9]">Triggered</span>
                    <span className="text-xs text-[#e5e2e1] font-mono">{latestRun.triggeredAt}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#d1c1d9]">Duration</span>
                    <span className="font-mono text-xs text-[#e5e2e1]">{latestRun.duration}</span>
                  </div>
                </div>

                {/* Executions click list */}
                <div className="border-t border-[#2A2A2A] px-4 py-2 bg-[#171717]/40">
                  <div className="text-[10px] font-bold tracking-wider text-[#d1c1d9] uppercase mb-2">Execution Log</div>
                  <div className="space-y-1 max-h-[160px] overflow-y-auto">
                    {flowExecutions.map(exec => (
                      <button
                        key={exec.id}
                        onClick={() => onSelectExecution(exec)}
                        className="w-full flex items-center justify-between p-2 rounded hover:bg-[#252525] text-left text-xs transition-colors cursor-pointer"
                      >
                        <span className="font-mono text-[#dfb7ff]">{exec.id}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-[#d1c1d9] font-mono">{exec.duration}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#d1c1d9]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectExecution(latestRun)}
                  className="block w-full p-3 text-center text-xs font-semibold text-[#dfb7ff] hover:bg-[#2A2A2A] transition-colors border-t border-[#2A2A2A] cursor-pointer"
                >
                  Inspect Latest Execution Payload →
                </button>
              </div>
            ) : (
              <div className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl p-6 text-center text-[#d1c1d9] italic text-xs">
                No executions recorded for this flow yet. Emit an event to trigger a simulator run!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
