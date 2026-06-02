import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function ResidentStats() {
  const { data, isLoading } = useDashboardMetrics();
  const m = data?.data?.residents;

  return (
    <MetricCard
      title="Total Residents"
      value={m?.total ?? '—'}
      description={m ? `${m.active} active · ${m.new} new` : undefined}
      trend={m?.trend ? { value: m.trend.value, direction: m.trend.direction, label: m.trend.period } : undefined}
      loading={isLoading}
    />
  );
}
