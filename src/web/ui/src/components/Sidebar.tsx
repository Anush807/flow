import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  GitFork,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
} from 'lucide-react';
import { useSettingsQuery } from '../api/flowApi';
import { useAuthStore } from '../store/useAuthStore';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'bg-blue-600/10 border-l-2 border-blue-500 text-white'
      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
  }`;

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { data: settings } = useSettingsQuery();
  const clearApiKey = useAuthStore((state) => state.clearApiKey);

  return (
    <nav className="fixed left-0 top-0 h-screen w-sidebar-width border-r border-slate-800 bg-[#080B11] flex flex-col z-50">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <span className="text-white font-bold tracking-tight text-lg italic">FLOW.ENGINE</span>
        </div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
          {settings ? `${settings.environment} · concurrency ${settings.worker.concurrency}` : 'Orchestration console'}
        </p>
      </div>

      <div className="p-4">
        <button
          onClick={() => navigate('/flows/new')}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-3 rounded text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Flow</span>
        </button>
      </div>

      <div className="flex-1 py-2 flex flex-col gap-1 overflow-y-auto">
        <div className="px-4 mb-2">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold px-2 mb-1">
            Navigation
          </p>
        </div>

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/flows" className={linkClass}>
          <GitFork className="w-4 h-4 shrink-0" />
          <span>Flows</span>
        </NavLink>

        <NavLink to="/executions" className={linkClass}>
          <Activity className="w-4 h-4 shrink-0" />
          <span>Executions</span>
        </NavLink>
      </div>

      <div className="mt-auto border-t border-slate-800 py-3 flex flex-col gap-1">
        <NavLink to="/settings" className={linkClass}>
          <Settings className="w-4 h-4 shrink-0" />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/support" className={linkClass}>
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Support</span>
        </NavLink>
      </div>

      {/* Queue depth is the one number worth having on every screen: it says
          whether the worker is keeping up. */}
      <div className="p-4 border-t border-slate-800 bg-[#0A0E14] flex items-center justify-between gap-3">
        <div className="text-xs min-w-0">
          <p className="text-white font-medium truncate">
            {settings?.queue ? `${settings.queue.waiting ?? 0} queued` : 'Queue unavailable'}
          </p>
          <p className="text-slate-500 truncate">
            {settings?.queue ? `${settings.queue.active ?? 0} active · ${settings.queue.failed ?? 0} failed` : 'Redis unreachable'}
          </p>
        </div>

        <button
          onClick={clearApiKey}
          title="Forget API key"
          className="p-1.5 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
