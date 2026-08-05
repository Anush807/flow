import React from 'react';
import { CheckCircle2, AlertCircle, FileEdit, PauseCircle, Clock, RefreshCw } from 'lucide-react';
import type { ExecutionStatus, FlowStatus } from '../types';

interface StatusBadgeProps {
  status: FlowStatus | ExecutionStatus | string;
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', showIcon = true }) => {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case 'active':
      return (
        <span className={`bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-medium text-xs border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)] shrink-0 ${className}`}>
          {showIcon && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
          Active
        </span>
      );

    case 'success':
      return (
        <span className={`bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-medium text-xs border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)] shrink-0 ${className}`}>
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5" />}
          Success
        </span>
      );

    case 'failing':
    case 'failed':
    case 'error':
      return (
        <span className={`bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-medium text-xs border border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.2)] shrink-0 ${className}`}>
          {showIcon && <AlertCircle className="w-3.5 h-3.5" />}
          {normalized === 'failing' ? 'Failing' : 'Failed'}
        </span>
      );

    case 'warning':
      return (
        <span className={`bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-medium text-xs border border-amber-500/20 shrink-0 ${className}`}>
          {showIcon && <AlertCircle className="w-3.5 h-3.5" />}
          Warning
        </span>
      );

    case 'draft':
      return (
        <span className={`bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-medium text-xs border border-slate-700 shrink-0 ${className}`}>
          {showIcon && <FileEdit className="w-3.5 h-3.5" />}
          Draft
        </span>
      );

    case 'paused':
      return (
        <span className={`bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-medium text-xs border border-slate-700 shrink-0 ${className}`}>
          {showIcon && <PauseCircle className="w-3.5 h-3.5" />}
          Paused
        </span>
      );

    case 'running':
      return (
        <span className={`bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-medium text-xs border border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.2)] shrink-0 ${className}`}>
          {showIcon && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
          Running
        </span>
      );

    case 'pending':
    default:
      return (
        <span className={`bg-slate-800/80 text-slate-400 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-medium text-xs border border-slate-700 shrink-0 ${className}`}>
          {showIcon && <Clock className="w-3.5 h-3.5" />}
          {status}
        </span>
      );
  }
};
