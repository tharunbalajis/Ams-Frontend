import { MetricCard } from '@ams/ui';
import { formatCurrency } from '@/utils/formatCurrency';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';

export function FinancialStats() {
  const { data, isLoading } = useDashboardMetrics();
  const m = data?.data?.financials;

  return (
    <MetricCard
      title="Monthly Collection"
      value={m ? formatCurrency(m.monthlyCollection) : '—'}
      description={m ? `${m.collectionRate}% collection rate` : undefined}
      trend={m?.trend ? { value: m.trend.value, direction: m.trend.direction, label: m.trend.period } : undefined}
      loading={isLoading}
    />
  );
}
