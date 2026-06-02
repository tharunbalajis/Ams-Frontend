import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function StaffStats() {
  const { data, isLoading } = useDashboardMetrics();
  const m = data?.data?.staff;

  return (
    <MetricCard
      title="Active Staff"
      value={m?.active ?? '—'}
      description={m ? `${m.total} total · ${m.onLeave} on leave` : undefined}
      trend={m?.trend ? { value: m.trend.value, direction: m.trend.direction, label: m.trend.period } : undefined}
      loading={isLoading}
    />
  );
}
