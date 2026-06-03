import { BarChart, LoadingState } from '@ams/ui';
import type { TrendPoint } from '../../types/analytics.types';

export interface ExpenseTrendChartProps {
  data:     TrendPoint[];
  loading?: boolean;
}

export function ExpenseTrendChart({ data, loading }: ExpenseTrendChartProps) {
<<<<<<< HEAD
  if (loading) return <div className="h-48 animate-pulse rounded-lg bg-muted" />;
  return (
    <BarChart
      data={data.map((d) => ({ period: d.period, value: d.value }))}
      series={[{ dataKey: 'value', name: 'Expenses (₹)' }]}
      xAxisKey="period"
      height={200}
=======
  if (loading) return <LoadingState />;
  return (
    <BarChart
      data={data.map((d) => ({ name: d.period, value: d.value }))}
      xAxisKey="name"
      series={[{ dataKey: 'value', name: 'Expenses' }]}
>>>>>>> d852c2e (final)
    />
  );
}
