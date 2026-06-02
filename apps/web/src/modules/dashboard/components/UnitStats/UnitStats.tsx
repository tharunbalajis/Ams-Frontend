import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function UnitStats() {
  const { data, isLoading } = useDashboardMetrics();
  const m = data?.data?.units;

  return (
    <MetricCard
      title="Occupied Units"
      value={m ? `${m.occupied} / ${m.total}` : '—'}
      description={m ? `${m.occupancy}% occupancy rate` : undefined}
      trend={m?.trend ? { value: m.trend.value, direction: m.trend.direction, label: m.trend.period } : undefined}
      loading={isLoading}
    />
  );
}
