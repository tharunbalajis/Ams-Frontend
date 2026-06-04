import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function AssetStats() {
  const { isLoading } = useDashboardMetrics();
  return <MetricCard title="—" value="—" loading={isLoading} />;
}
