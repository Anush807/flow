/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, Settings, ArrowUpRight, Play } from 'lucide-react';
import { Flow, Execution } from '../types';

interface DashboardViewProps {
  flows: Flow[];
  executions: Execution[];
  onSelectExecution: (execution: Execution) => void;
  onNavigateToFlows: () => void;
  onEmitEvent: (flow: Flow) => void;
}

export default function DashboardView({
  flows,
  executions,
  onSelectExecution,
  onNavigateToFlows,
  onEmitEvent
}: DashboardViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate stats dynamically
  const totalFlows = flows.length;
  const activeFlows = flows.filter(f => f.status === 'Active').length;
  const pausedFlows = flows.filter(f => f.status === 'Paused').length;
  const draftFlows = flows.filter(f => f.status === 'Draft').length;

  const totalExecutionsCount = executions.length + 1280; // static base + local simulation logs
  const successfulExecs = executions.filter(e => e.status === 'Success').length + 1256;
  const successRate = totalExecutionsCount > 0 
    ? ((successfulExecs / totalExecutionsCount) * 100).toFixed(1) 
    : '100.0';

  // Percentages for flow status breakdown
  const activePct = totalFlows > 0 ? Math.round((activeFlows / totalFlows) * 100) : 0;
  const pausedPct = totalFlows > 0 ? Math.round((pausedFlows / totalFlows) * 100) : 0;
  const draftPct = totalFlows > 0 ? Math.round((draftFlows / totalFlows) * 100) : 0;

  // Filter executions for searching flows
  const filteredExecutions = executions.filter(exec =>
    exec.flowName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exec.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="flex justify-between items-center h-16 px-6 bg-[#131313] z-40 border-b border-[#2A2A2A] sticky top-0">
        <div className="text-xl font-semibold text-[#dfb7ff]">Dashboard</div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d1c1d9] w-4 h-4" />
            <input
              type="text"
              placeholder="Search flows or execution ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#171717] border border-[#2A2A2A] rounded-full py-1.5 pl-9 pr-4 text-xs text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all placeholder-[#6B7280] w-64"
            />
          </div>
          <button className="text-[#d1c1d9] hover:text-[#e5e2e1] transition-colors p-2 rounded-full hover:bg-[#201f1f]">
            <Bell className="w-4 h-4" />
          </button>
          <button className="text-[#d1c1d9] hover:text-[#e5e2e1] transition-colors p-2 rounded-full hover:bg-[#201f1f]">
            <Settings className="w-4 h-4" />
          </button>
          <button className="bg-[#9D00FF] hover:bg-[#8c00e5] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer">
            Deploy
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden ml-2 border border-[#2A2A2A]">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE6TBrpxVugaMnGAQv_3hrcl1DaGpDYJlaw0e7yk-TJRRF-OHaWJ0OnE1uvzDdaKCMVadcLl3qPmvrv3OS6V6uS9jwP-51B8uaxd9LEQY7UeEfZzAPh4VJztoPRn5S6bVyfOAcMYVY8to88EOWjcS1gbarPeTKZjIWGihYXCHl-iO0fUePFjz64muMPDHQthn_Cgs-CexYzp-RqywtJD6eNFmWN5fBhUQ3Tyz9w_xGsGUFrzOIjfa-tfBQtbdE0sh9Sze-IZJomCI"
            />
          </div>
        </div>
      </header>

      {/* Main Content Scroll Canvas */}
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1F1F1F] border border-[#2A2A2A] border-l-2 border-l-[#9D00FF] rounded-lg p-4 flex flex-col justify-between">
            <div className="text-[#d1c1d9] text-xs font-medium mb-2">Total Flows</div>
            <div className="text-3xl font-bold text-[#e5e2e1] tracking-tight">{totalFlows}</div>
          </div>
          <div className="bg-[#1F1F1F] border border-[#2A2A2A] border-l-2 border-l-[#22C55E] rounded-lg p-4 flex flex-col justify-between">
            <div className="text-[#d1c1d9] text-xs font-medium mb-2">Active Flows</div>
            <div className="text-3xl font-bold text-[#e5e2e1] tracking-tight">{activeFlows}</div>
          </div>
          <div className="bg-[#1F1F1F] border border-[#2A2A2A] border-l-2 border-l-[#dfb7ff] rounded-lg p-4 flex flex-col justify-between">
            <div className="text-[#d1c1d9] text-xs font-medium mb-2">Total Executions</div>
            <div className="text-3xl font-bold text-[#e5e2e1] tracking-tight">{totalExecutionsCount.toLocaleString()}</div>
          </div>
          <div className="bg-[#1F1F1F] border border-[#2A2A2A] border-l-2 border-l-[#F59E0B] rounded-lg p-4 flex flex-col justify-between">
            <div className="text-[#d1c1d9] text-xs font-medium mb-2">Success Rate</div>
            <div className="text-3xl font-bold text-[#e5e2e1] tracking-tight">{successRate}%</div>
          </div>
        </div>

        {/* Dashboard Bento Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flow Status Breakdown */}
          <div className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#e5e2e1] border-b border-[#2A2A2A] pb-2 mb-4">
                Flow Status
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1 text-[#d1c1d9]">
                    <span>Active ({activeFlows})</span>
                    <span>{activePct}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#131313] rounded-full overflow-hidden">
                    <div className="bar-active h-full rounded-full transition-all duration-500" style={{ width: `${activePct}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 text-[#d1c1d9]">
                    <span>Paused ({pausedFlows})</span>
                    <span>{pausedPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#131313] rounded-full overflow-hidden">
                    <div className="bar-paused h-full rounded-full transition-all duration-500" style={{ width: `${pausedPct}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 text-[#d1c1d9]">
                    <span>Draft ({draftFlows})</span>
                    <span>{draftPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#131313] rounded-full overflow-hidden">
                    <div className="bar-draft h-full rounded-full transition-all duration-500" style={{ width: `${draftPct}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateToFlows}
              className="mt-6 text-xs text-[#dfb7ff] hover:text-[#f1daff] transition-colors flex items-center gap-1 group self-start cursor-pointer"
            >
              <span>Manage all flows</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Recent Executions Table */}
          <div className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg lg:col-span-2 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#2A2A2A] flex justify-between items-center bg-[#1c1b1b]/30">
              <h3 className="text-base font-semibold text-[#e5e2e1]">Recent Executions</h3>
              <button
                onClick={onNavigateToFlows}
                className="text-xs text-[#dfb7ff] hover:text-[#f1daff] transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2A2A2A] text-[#d1c1d9] text-xs bg-[#171717]/80">
                    <th className="p-3 font-medium">Execution ID</th>
                    <th className="p-3 font-medium">Flow Name</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Triggered At</th>
                    <th className="p-3 font-medium">Finished At</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-[#2A2A2A]">
                  {filteredExecutions.length > 0 ? (
                    filteredExecutions.map((exec) => (
                      <tr
                        key={exec.id}
                        onClick={() => onSelectExecution(exec)}
                        className="hover:bg-[#252525] transition-colors cursor-pointer"
                      >
                        <td className="p-3 font-mono text-[#dfb7ff]">{exec.id}</td>
                        <td className="p-3 text-[#e5e2e1] font-medium">{exec.flowName}</td>
                        <td className="p-3">
                          {exec.status === 'Success' ? (
                            <span className="px-2 py-0.5 rounded-full font-medium status-success">Success</span>
                          ) : exec.status === 'Failed' ? (
                            <span className="px-2 py-0.5 rounded-full font-medium status-failed">Failed</span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium status-running flex items-center gap-1.5 w-max">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#9D00FF] animate-pulse"></span>
                              Running
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-[#d1c1d9]">{exec.triggeredAt}</td>
                        <td className="p-3 text-[#d1c1d9]">{exec.finishedAt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#d1c1d9] italic">
                        No executions found matching search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
