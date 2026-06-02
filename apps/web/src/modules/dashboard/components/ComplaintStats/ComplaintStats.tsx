import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function ComplaintStats() {
  const { data, isLoading } = useDashboardMetrics();
  const m = data?.data?.complaints;

  return (
    <MetricCard
      title="Open Complaints"
      value={m?.open ?? '—'}
      description={m ? `${m.inProgress} in progress · ${m.resolved} resolved` : undefined}
      trend={m?.trend ? { value: m.trend.value, direction: m.trend.direction, label: m.trend.period } : undefined}
      loading={isLoading}
    />
  );
}
