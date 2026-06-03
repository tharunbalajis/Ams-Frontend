import { LineChart, LoadingState } from '@ams/ui';
import type { TrendPoint } from '../../types/analytics.types';

export interface RevenueTrendChartProps {
  data:     TrendPoint[];
  loading?: boolean;
}

export function RevenueTrendChart({ data, loading }: RevenueTrendChartProps) {
<<<<<<< HEAD
  if (loading) return <div className="h-48 animate-pulse rounded-lg bg-muted" />;
  return (
    <LineChart
      data={data.map((d) => ({ period: d.period, value: d.value }))}
      series={[{ dataKey: 'value', name: 'Revenue (₹)' }]}
      xAxisKey="period"
      height={200}
=======
  if (loading) return <LoadingState />;
  return (
    <LineChart
      data={data.map((d) => ({ name: d.period, value: d.value }))}
      xAxisKey="name"
      series={[{ dataKey: 'value', name: 'Revenue' }]}
>>>>>>> d852c2e (final)
    />
  );
}
