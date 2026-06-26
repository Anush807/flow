/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, X, Terminal, Server, CheckCircle, AlertTriangle, Loader2, PlayCircle, Key, Cpu } from 'lucide-react';
import { Flow, Execution, ExecutionStep, ExecutionStatus } from '../types';

interface LiveSimulationModalProps {
  flow: Flow | null;
  onClose: () => void;
  onSaveSimulation: (execution: Execution) => void;
}

export default function LiveSimulationModal({
  flow,
  onClose,
  onSaveSimulation
}: LiveSimulationModalProps) {
  const [payload, setPayload] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [stepStatuses, setStepStatuses] = useState<Record<string, 'pending' | 'running' | 'success' | 'failed'>>({});
  const [logs, setLogs] = useState<string[]>([]);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [isFailedFlow, setIsFailedFlow] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  if (!flow) return null;

  // Set default initial payload on mount
  useEffect(() => {
    let defaultPayload = {
      event_id: `evt_${Math.random().toString(36).substring(2, 9)}`,
      type: flow.eventKey,
      data: {
        customer_id: "cus_X789jk",
        plan: "enterprise_tier_2",
        metadata: {
          source: "direct_signup",
          timestamp: new Date().toISOString()
        }
      }
    };
    setPayload(JSON.stringify(defaultPayload, null, 2));

    // Reset simulator states
    setIsRunning(false);
    setCurrentStepIdx(-1);
    setSimulationComplete(false);
    setIsFailedFlow(false);
    setLogs([`Ready to emit event trigger for key: "${flow.eventKey}"`]);
    
    const initialStatuses: typeof stepStatuses = {};
    flow.steps.forEach(s => {
      initialStatuses[s.id] = 'pending';
    });
    setStepStatuses(initialStatuses);
  }, [flow]);

  // Scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  const handleStartSimulation = async () => {
    // Validate trigger payload JSON
    try {
      JSON.parse(payload);
    } catch (err: any) {
      addLog(`❌ Trigger Payload JSON Validation Error: ${err.message}`);
      return;
    }

    setIsRunning(true);
    setSimulationComplete(false);
    setIsFailedFlow(false);
    setLogs([]);
    addLog(`🚀 Emitting trigger event: "${flow.eventKey}"...`);
    addLog(`🔍 Payload read and verified successfully.`);

    const statuses = { ...stepStatuses };
    flow.steps.forEach(s => {
      statuses[s.id] = 'pending';
    });
    setStepStatuses(statuses);

    // Simulate each step in the pipeline
    for (let i = 0; i < flow.steps.length; i++) {
      const step = flow.steps[i];
      setCurrentStepIdx(i);
      
      // Update running status
      setStepStatuses(prev => ({ ...prev, [step.id]: 'running' }));
      addLog(`⚙️ Entering Step ${i + 1}/${flow.steps.length}: "${step.name}" [${step.type}]`);
      addLog(`   ↪ Evaluating input mappings...`);

      // Sleep to simulate network delay
      const stepDelay = step.type === 'HTTP' ? 1200 : step.type === 'Action' ? 1000 : 600;
      await new Promise(resolve => setTimeout(resolve, stepDelay));

      // 5% random failure rate to make simulation authentic!
      const shouldFail = false; // let's default to success unless user creates failed logic

      if (shouldFail) {
        setStepStatuses(prev => ({ ...prev, [step.id]: 'failed' }));
        addLog(`❌ Step "${step.name}" failed with runtime exception.`);
        addLog(`💥 Pipeline terminated with errors.`);
        setIsFailedFlow(true);
        setIsRunning(false);
        setSimulationComplete(true);
        return;
      } else {
        setStepStatuses(prev => ({ ...prev, [step.id]: 'success' }));
        addLog(`✅ Step "${step.name}" completed successfully (+${stepDelay}ms)`);
        if (step.integrationKey) {
          addLog(`   ↪ Synced transaction state with client: ${step.integrationKey}`);
        }
      }
    }

    // Success terminal logs
    addLog(`⭐ Pipeline execution complete!`);
    addLog(`🎉 Automation workflows triggered on client targets.`);
    setIsRunning(false);
    setSimulationComplete(true);

    // Create execution object and append to history
    const totalDuration = (flow.steps.length * 0.95 + Math.random()).toFixed(2) + 's';
    const executionId = `ex_${Math.random().toString(36).substring(2, 9)}`;

    // Build steps history
    const simulationSteps: ExecutionStep[] = flow.steps.map((step, idx) => {
      const durationNum = step.type === 'HTTP' ? 820 : step.type === 'Action' ? 950 : 240;
      return {
        id: `ex_s_${idx}_${Date.now()}`,
        name: step.name,
        type: step.integrationKey ? `${step.integrationKey} Action` : `${step.type} Task`,
        startedAt: new Date(Date.now() - (flow.steps.length - idx) * 2000).toLocaleTimeString(),
        duration: `${durationNum}ms`,
        status: 'Success',
        outputPayload: JSON.stringify({
          status: 200,
          timestamp: new Date().toISOString(),
          data: {
            step_evaluated: step.name,
            resolved: true,
            payload_snapshot: JSON.parse(step.payload)
          }
        }, null, 2)
      };
    });

    const executionSnapshot: Execution = {
      id: executionId,
      flowId: flow.id,
      flowName: flow.name,
      status: 'Success',
      triggeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + `, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      finishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + `, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      duration: totalDuration,
      triggerPayload: payload,
      steps: simulationSteps
    };

    onSaveSimulation(executionSnapshot);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[110] p-4 animate-fade-in">
      <div className="bg-[#131313] border border-[#2A2A2A] rounded-xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Header bar */}
        <header className="px-6 h-16 border-b border-[#2A2A2A] bg-[#1c1b1b] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-[#dfb7ff]" />
            <div>
              <h3 className="font-semibold text-sm text-[#e5e2e1]">Flow Trigger Simulator</h3>
              <p className="text-[10px] text-[#d1c1d9]">Inject trigger events and monitor active steps live</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#d1c1d9] hover:text-[#e5e2e1] p-1.5 rounded-full hover:bg-[#2A2A2A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content canvas */}
        <div className="flex-grow flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#2A2A2A] overflow-hidden">
          {/* Left panel: Trigger Payload and Node steps progress */}
          <div className="flex-1 flex flex-col p-5 overflow-y-auto space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#dfb7ff] mb-2 uppercase tracking-wider">
                1. Edit Trigger Payload Snapshot
              </label>
              <textarea
                rows={6}
                value={payload}
                disabled={isRunning}
                onChange={(e) => setPayload(e.target.value)}
                className="w-full bg-[#0D0D0D] border border-[#2a2a2a] text-xs font-mono text-[#d1c1d9] p-3 rounded-lg outline-none focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] resize-none"
              />
            </div>

            {/* Dynamic steps map */}
            <div className="flex-grow flex flex-col justify-center">
              <label className="block text-xs font-semibold text-[#dfb7ff] mb-4 uppercase tracking-wider">
                2. Visual Workflow Pipeline Progress
              </label>
              <div className="space-y-3 pl-3">
                {flow.steps.map((step, idx) => {
                  const status = stepStatuses[step.id] || 'pending';
                  const isActive = currentStepIdx === idx;

                  return (
                    <div
                      key={step.id}
                      className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#9D00FF]/5 border-[#9D00FF]'
                          : status === 'success'
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : status === 'failed'
                          ? 'bg-red-500/5 border-red-500/20'
                          : 'bg-[#1c1b1b]/50 border-[#2A2A2A]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            isActive
                              ? 'bg-[#9D00FF] text-white animate-pulse'
                              : status === 'success'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : status === 'failed'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-[#2A2A2A] text-[#d1c1d9]'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#e5e2e1]">{step.name}</div>
                          <div className="text-[10px] font-mono text-[#d1c1d9]">{step.type}</div>
                        </div>
                      </div>

                      {/* Status indicator right side */}
                      <div className="text-[10px] uppercase font-bold tracking-wider">
                        {status === 'pending' && <span className="text-[#6B7280]">Waiting...</span>}
                        {status === 'running' && (
                          <span className="text-[#9D00FF] flex items-center gap-1">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Running
                          </span>
                        )}
                        {status === 'success' && <span className="text-emerald-400 font-bold">✓ Success</span>}
                        {status === 'failed' && <span className="text-red-400 font-bold">✕ Failed</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right panel: Console Terminal Logs output */}
          <div className="flex-1 flex flex-col p-5 bg-[#080808]">
            <div className="flex justify-between items-center border-b border-[#2A2A2A] pb-3 mb-3">
              <div className="flex items-center gap-2 text-[#d1c1d9]">
                <Terminal className="w-4 h-4 text-[#dfb7ff]" />
                <span className="text-xs font-mono">FLOW_CONSOLE_STREAM</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {/* Logs frame content */}
            <div
              ref={logContainerRef}
              className="flex-grow font-mono text-xs text-emerald-400 p-4 bg-[#030303] rounded-lg border border-[#1a1a1a] overflow-y-auto space-y-2 h-[200px]"
            >
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed whitespace-pre-wrap">{log}</div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-1.5 mt-2 opacity-85">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing logic steps...</span>
                </div>
              )}
            </div>

            {/* Run Actions controls bottom */}
            <div className="mt-4 pt-4 border-t border-[#2A2A2A] flex justify-between items-center">
              <div>
                {simulationComplete && (
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Run completed successfully! Log appended.</span>
                  </div>
                )}
              </div>
              <button
                disabled={isRunning}
                onClick={handleStartSimulation}
                className="bg-[#9D00FF] hover:bg-[#8c00e5] disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(157,0,255,0.25)] active:scale-95"
              >
                <Play className="w-4 h-4 text-white" />
                <span>Emit Trigger Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
