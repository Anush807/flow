import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExecutionsQuery, useStatsQuery } from '../api/flowApi';
import { StatusBadge } from '../components/StatusBadge';
import { AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

const BREAKDOWN_COLORS: Record<string, string> = {
  active: '#10B981',
  draft: '#F59E0B',
  paused: '#6B7280',
  archived: '#374151',
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useStatsQuery();
  const { data: executions, isLoading: execsLoading } = useExecutionsQuery({ limit: 8 });

  const recent = executions?.data ?? [];
  const breakdown = stats?.breakdown;
  const breakdownTotal = breakdown
    ? breakdown.active + breakdown.draft + breakdown.paused + breakdown.archived
    : 0;

  const share = (count: number) => (breakdownTotal === 0 ? 0 : (count / breakdownTotal) * 100);

  return (
    <div className="flex-1 min-h-screen bg-background p-container-padding overflow-y-auto">
      <header className="mb-8 flex items-end justify-between">
        <h2 className="font-page-title text-page-title text-on-surface">Dashboard Overview</h2>
        {stats && stats.recentFailures > 0 && (
          <button
            onClick={() => navigate('/executions?status=failed')}
            className="flex items-center gap-2 text-sm text-error hover:text-error/80 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            {stats.recentFailures} failed run{stats.recentFailures === 1 ? '' : 's'} in the last 24h
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
        <StatCard label="Total Flows" value={statsLoading ? '…' : (stats?.totalFlows ?? 0).toLocaleString()} />
        <StatCard label="Active Flows" value={statsLoading ? '…' : (stats?.activeFlows ?? 0).toLocaleString()} />
        <StatCard
          label="Total Executions"
          value={statsLoading ? '…' : (stats?.totalExecutions ?? 0).toLocaleString()}
        />
        <StatCard
          label="Success Rate"
          value={
            statsLoading
              ? '…'
              : stats?.successRate === null || stats?.successRate === undefined
                ? 'No runs yet'
                : `${stats.successRate.toFixed(1)}%`
          }
          {...(stats
            ? { hint: `${stats.successfulExecutions} ok · ${stats.failedExecutions} failed` }
            : {})}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter mb-8">
        {/* Flow status breakdown – counts, not the invented percentages the
            prototype shipped with. */}
        <div className="xl:col-span-1 bg-surface-container border border-surface-container-high rounded-xl p-container-padding flex flex-col justify-between">
          <div>
            <h3 className="font-card-title text-card-title text-on-surface mb-6">Flow Status Breakdown</h3>

            <div className="w-full h-8 flex rounded-DEFAULT overflow-hidden mb-6 bg-surface-container-high">
              {breakdown &&
                (Object.keys(BREAKDOWN_COLORS) as Array<keyof typeof breakdown>).map((key) => {
                  const percent = share(breakdown[key]);
                  if (percent === 0) return null;
                  return (
                    <div
                      key={key}
                      className="transition-all"
                      style={{ width: `${percent}%`, backgroundColor: BREAKDOWN_COLORS[key] }}
                      title={`${key}: ${breakdown[key]}`}
                    />
                  );
                })}
            </div>

            <div className="flex flex-col gap-stack-gap font-body-base text-[14px]">
              {breakdown &&
                (Object.keys(BREAKDOWN_COLORS) as Array<keyof typeof breakdown>).map((key) => (
                  <div key={key} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: BREAKDOWN_COLORS[key] }}
                      />
                      <span className="text-on-surface-variant capitalize">{key}</span>
                    </div>
                    <span className="font-medium text-on-surface">
                      {breakdown[key]}
                      <span className="text-on-surface-variant text-xs ml-2">
                        {share(breakdown[key]).toFixed(0)}%
                      </span>
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-container-high flex justify-between items-center text-xs text-on-surface-variant">
            <span>{stats?.runningExecutions ?? 0} execution(s) running</span>
            <button
              onClick={() => navigate('/flows')}
              className="text-primary hover:text-primary-fixed-dim transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              Manage Flows <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent executions */}
        <div className="xl:col-span-2 bg-surface-container border border-surface-container-high rounded-xl overflow-hidden flex flex-col">
          <div className="p-container-padding border-b border-surface-container-high flex justify-between items-center">
            <h3 className="font-card-title text-card-title text-on-surface">Recent Executions</h3>
            <button
              onClick={() => navigate('/executions')}
              className="text-primary hover:text-primary-fixed-dim font-label-nav text-label-nav transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            {execsLoading ? (
              <div className="p-12 flex justify-center items-center text-on-surface-variant">
                <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
                Loading executions...
              </div>
            ) : recent.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant text-sm">
                Nothing has run yet. Trigger a flow to see it here.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-surface-container-high text-on-surface-variant font-label-nav text-[12px] uppercase tracking-wider">
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">Flow</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Triggered</th>
                    <th className="p-4 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="font-body-base text-[14px]">
                  {recent.slice(0, 6).map((execution) => (
                    <tr
                      key={execution.id}
                      onClick={() => navigate(`/executions/${execution.id}`)}
                      className="border-b border-surface-container-high hover:bg-surface-container-high transition-colors cursor-pointer group"
                    >
                      <td className="p-4 font-code-block text-xs text-on-surface-variant group-hover:text-primary-fixed transition-colors">
                        {execution.id.slice(0, 8)}
                      </td>
                      <td className="p-4 font-medium text-on-surface">{execution.flowName}</td>
                      <td className="p-4">
                        <StatusBadge status={execution.status} />
                      </td>
                      <td className="p-4 text-on-surface-variant">{execution.triggeredAt}</td>
                      <td className="p-4 text-on-surface-variant font-code-block">{execution.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; hint?: string }> = ({ label, value, hint }) => (
  <div className="bg-surface-container border border-surface-container-high border-l-[3px] border-l-primary-container p-5 rounded-lg flex flex-col gap-2">
    <span className="font-label-nav text-[14px] font-[500] text-on-surface-variant">{label}</span>
    <span className="font-stat-number text-stat-number text-on-surface">{value}</span>
    {hint && <span className="text-xs text-on-surface-variant">{hint}</span>}
  </div>
);
