import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function VisitorStats() {
  const { data, isLoading } = useDashboardMetrics();
  const m = data?.data?.visitors;

  return (
    <MetricCard
      title="Active Visitors"
      value={m?.active ?? '—'}
      description={m ? `${m.today} check-ins today` : undefined}
      trend={m?.trend ? { value: m.trend.value, direction: m.trend.direction, label: m.trend.period } : undefined}
      loading={isLoading}
    />
  );
}
