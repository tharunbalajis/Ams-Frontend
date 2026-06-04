import { BarChart } from '@ams/ui';
import type { TrendPoint } from '../../types/analytics.types';

export interface ExpenseTrendChartProps {
  data:     TrendPoint[];
  loading?: boolean;
}

export function ExpenseTrendChart({ data, loading }: ExpenseTrendChartProps) {
  if (loading) return <div className="h-48 animate-pulse rounded-lg bg-muted" />;
  return (
    <BarChart
      data={data.map((d) => ({ period: d.period, value: d.value }))}
      series={[{ dataKey: 'value', name: 'Expenses (₹)' }]}
      xAxisKey="period"
      height={200}
    />
  );
}
