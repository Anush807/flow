/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Network, Plus, ShieldCheck } from 'lucide-react';

interface SideNavBarProps {
  currentView: 'dashboard' | 'flows' | 'create' | 'detail';
  onNavigate: (view: 'dashboard' | 'flows' | 'create') => void;
}

export default function SideNavBar({ currentView, onNavigate }: SideNavBarProps) {
  return (
    <nav className="fixed left-0 top-0 h-screen w-[240px] flex flex-col p-4 bg-[#201f1f] border-r border-[#4e4356]/30 z-50">
      {/* Brand logo */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[#9D00FF] flex items-center justify-center text-white font-bold">
          <Network className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-xl font-bold text-[#dfb7ff] tracking-tight">FlowEngine</div>
          <div className="text-[11px] text-[#d1c1d9] font-mono leading-tight">Automation Engine</div>
        </div>
      </div>

      {/* CTA: Create New Flow */}
      <button
        onClick={() => onNavigate('create')}
        className="w-full bg-[#9D00FF] hover:bg-[#8c00e5] text-white font-medium text-sm py-2.5 px-4 rounded-lg mb-6 transition-all duration-150 hover:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Create New Flow</span>
      </button>

      {/* Navigation Links */}
      <ul className="flex-1 space-y-2">
        <li>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center gap-3 p-2.5 rounded-lg font-medium text-sm transition-all duration-150 cursor-pointer ${
              currentView === 'dashboard'
                ? 'text-[#dfb7ff] bg-[#2a2a2a] border-r-2 border-[#9D00FF]'
                : 'text-[#d1c1d9] hover:text-[#e5e2e1] hover:bg-[#2a2a2a]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onNavigate('flows')}
            className={`w-full flex items-center gap-3 p-2.5 rounded-lg font-medium text-sm transition-all duration-150 cursor-pointer ${
              currentView === 'flows' || currentView === 'detail'
                ? 'text-[#dfb7ff] bg-[#2a2a2a] border-r-2 border-[#9D00FF]'
                : 'text-[#d1c1d9] hover:text-[#e5e2e1] hover:bg-[#2a2a2a]'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Flows</span>
          </button>
        </li>
      </ul>

      {/* User Profile Footer */}
      <div className="mt-auto border-t border-[#2a2a2a] pt-4 flex items-center gap-3">
        <div className="relative">
          <img
            alt="User Profile"
            className="w-8 h-8 rounded-full object-cover border border-[#2a2a2a]"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBldPI4apjflMptwMOoNSMSEwmU1tH_Z3QuT9mNA9JMx6Uxrf3nJcymjO_WRJY8vWROVFHyRI-SZjqZqHYmmwgDkPzpEULvUvm8PuZDIg-NlrNHm-7P2aF3HDXIaUiRH-JNWX5QrXrFWd0XhF224HNmSwMSYBPCsLV2vbq9bTex5QJYAeFmW-oXVcHfFBsFlPoU1k-nOAqISCYm1tDzP-l4akAVZ-QZI_Lw05dDj3DtS9Bs5L2U9drku2ocqnX7JplutrLhpqa2SFg"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#201f1f]"></div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-[#e5e2e1] truncate">Admin User</span>
          <span className="text-[10px] text-[#d1c1d9] font-mono truncate">admin@flowengine.io</span>
        </div>
      </div>
    </nav>
  );
}
