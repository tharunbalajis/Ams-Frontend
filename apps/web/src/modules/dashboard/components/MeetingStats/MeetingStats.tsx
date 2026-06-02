import { MetricCard } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function MeetingStats() {
  const { data, isLoading } = useDashboardMetrics();
  const m = data?.data?.meetings;

  return (
    <MetricCard
      title="Upcoming Meetings"
      value={m?.upcoming ?? '—'}
      description={m ? `${m.thisMonth} this month · ${m.completed} completed` : undefined}
      trend={m?.trend ? { value: m.trend.value, direction: m.trend.direction, label: m.trend.period } : undefined}
      loading={isLoading}
    />
  );
}
