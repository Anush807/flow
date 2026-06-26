/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Play, Copy, ChevronDown, ChevronUp, Globe, Database, HelpCircle, Terminal } from 'lucide-react';
import { Execution, ExecutionStep } from '../types';

interface ExecutionDetailModalProps {
  execution: Execution | null;
  onClose: () => void;
}

export default function ExecutionDetailModal({
  execution,
  onClose
}: ExecutionDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    'ex_step_2': true // expand second node by default like in the mockup
  });

  if (!execution) return null;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(execution.triggerPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const getStepIcon = (type: string) => {
    if (type.includes('Trigger') || type.includes('Webhook')) {
      return <Globe className="w-5 h-5 text-[#dfb7ff]" />;
    } else if (type.includes('Action') || type.includes('Platform')) {
      return <Database className="w-5 h-5 text-[#ffb95f]" />;
    } else {
      return <Terminal className="w-5 h-5 text-[#dfb7ff]" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-end z-[100] animate-fade-in">
      {/* Right sliding panel */}
      <div className="bg-[#131313] w-full max-w-4xl h-full border-l border-[#2A2A2A] flex flex-col shadow-2xl relative overflow-hidden animate-slide-in">
        {/* TopAppBar */}
        <header className="h-16 px-6 border-b border-[#2A2A2A] flex justify-between items-center bg-[#171717] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-[#d1c1d9] hover:text-[#e5e2e1] transition-colors p-1.5 rounded-full hover:bg-[#201f1f] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-5 w-px bg-[#2A2A2A]"></div>
            <div>
              <h2 className="text-sm font-bold text-[#e5e2e1]">{execution.flowName}</h2>
              <div className="text-[10px] font-mono text-[#d1c1d9]">Exec ID: {execution.id}</div>
            </div>
          </div>
          <button className="bg-[#9D00FF] hover:bg-[#8c00e5] text-white text-xs px-4 py-1.5 rounded-lg font-semibold transition-all cursor-pointer">
            Deploy
          </button>
        </header>

        {/* Scrollable Container Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Metadata Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Status & Timing Card */}
            <div className="md:col-span-4 bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 mb-3">
                <span className="text-sm font-semibold text-[#e5e2e1]">Execution Status</span>
                {execution.status === 'Success' ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Success
                  </span>
                ) : execution.status === 'Failed' ? (
                  <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-semibold border border-red-500/30 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Failed
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#9D00FF]/15 text-[#dfb7ff] text-xs font-semibold border border-[#9D00FF]/30 flex items-center gap-1 animate-pulse">
                    <Play className="w-3.5 h-3.5 rotate-90" />
                    Running
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                <div>
                  <div className="text-[10px] text-[#d1c1d9] uppercase tracking-wider mb-0.5">Started At</div>
                  <div className="font-mono text-xs text-[#e5e2e1]">{execution.triggeredAt}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#d1c1d9] uppercase tracking-wider mb-0.5">Finished At</div>
                  <div className="font-mono text-xs text-[#e5e2e1]">{execution.finishedAt}</div>
                </div>
                <div className="col-span-2 pt-2 border-t border-[#2A2A2A]/40">
                  <div className="text-[10px] text-[#d1c1d9] uppercase tracking-wider mb-0.5">Total Duration</div>
                  <div className="text-3xl font-bold text-[#dfb7ff] tracking-tight">{execution.duration}</div>
                </div>
              </div>
            </div>

            {/* Trigger Payload Card */}
            <div className="md:col-span-8 bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-[#1c1b1b]/60 border-b border-[#2A2A2A]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#d1c1d9]" />
                  <span className="text-xs font-semibold text-[#e5e2e1]">Trigger Payload</span>
                </div>
                <button
                  onClick={handleCopyPayload}
                  className="text-xs text-[#dfb7ff] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-[#0D0D0D] p-4 flex-1 overflow-x-auto font-mono text-xs text-[#d1c1d9] max-h-[160px] scrollbar-thin">
                <pre><code>{execution.triggerPayload}</code></pre>
              </div>
            </div>
          </div>

          {/* Execution Steps Timeline */}
          <div className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl p-5 md:p-6">
            <h3 className="text-base font-semibold text-[#e5e2e1] border-b border-[#2A2A2A] pb-3 mb-6">
              Execution Steps
            </h3>
            
            <div className="relative pl-6 space-y-6">
              {/* Vertical timeline connector */}
              <div className="absolute left-2.5 top-5 bottom-5 w-0.5 bg-[#2a2a2a] z-0"></div>

              {execution.steps.map((step, idx) => {
                const isExpanded = !!expandedSteps[step.id];
                return (
                  <div key={step.id} className="relative flex gap-4 w-full group">
                    {/* Circle Node Badge */}
                    <div className="relative z-10 w-9 h-9 rounded-full bg-[#131313] border-2 border-[#9D00FF] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(157,0,255,0.15)]">
                      {getStepIcon(step.type)}
                    </div>

                    {/* Step Card component */}
                    <div className="flex-1 bg-[#0D0D0D] border border-[#2a2a2a] hover:border-[#4e4356] rounded-xl overflow-hidden transition-all duration-150">
                      <div
                        onClick={() => step.outputPayload && toggleStepExpansion(step.id)}
                        className={`p-4 flex items-start justify-between bg-[#161616]/40 ${step.outputPayload ? 'cursor-pointer' : ''}`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                            <h4 className="font-semibold text-sm text-[#e5e2e1]">{step.name}</h4>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-[#201f1f] text-[#d1c1d9] border border-[#2A2A2A]">
                              {step.type}
                            </span>
                          </div>
                          <div className="font-mono text-[10px] text-[#d1c1d9] leading-none">
                            Started {step.startedAt} • {step.duration}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {step.status === 'Success' ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold uppercase">
                              Success
                            </span>
                          ) : step.status === 'Failed' ? (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold uppercase">
                              Failed
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-[#9D00FF]/10 text-[#dfb7ff] border border-[#9D00FF]/20 text-[10px] font-semibold uppercase animate-pulse">
                              Running
                            </span>
                          )}

                          {step.outputPayload && (
                            <button className="text-[#d1c1d9] hover:text-[#dfb7ff]">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Collapsible output block */}
                      {step.outputPayload && isExpanded && (
                        <div className="p-4 bg-[#080808] border-t border-[#2A2A2A] animate-fade-in font-mono text-[11px] text-[#d1c1d9] scrollbar-thin overflow-x-auto">
                          <div className="text-[10px] text-[#dfb7ff] mb-2 uppercase font-semibold tracking-wider">Output Payload</div>
                          <pre><code>{step.outputPayload}</code></pre>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
