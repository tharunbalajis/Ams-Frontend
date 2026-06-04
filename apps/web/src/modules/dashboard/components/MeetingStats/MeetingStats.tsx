import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function MeetingStats() {
  const { isLoading } = useDashboardMetrics();
  return <MetricCard title="—" value="—" loading={isLoading} />;
}
