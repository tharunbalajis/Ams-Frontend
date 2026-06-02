import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function AssetStats() {
  const { data, isLoading } = useDashboardMetrics();
  const m = data?.data?.assets;

  return (
    <MetricCard
      title="Operational Assets"
      value={m?.operational ?? '—'}
      description={m ? `${m.maintenance} in maintenance` : undefined}
      trend={m?.trend ? { value: m.trend.value, direction: m.trend.direction, label: m.trend.period } : undefined}
      loading={isLoading}
    />
  );
}
