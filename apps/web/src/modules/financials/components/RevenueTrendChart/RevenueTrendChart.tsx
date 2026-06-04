import { LineChart } from '@ams/ui';
import type { TrendPoint } from '../../types/analytics.types';

export interface RevenueTrendChartProps {
  data:     TrendPoint[];
  loading?: boolean;
}

export function RevenueTrendChart({ data, loading }: RevenueTrendChartProps) {
  if (loading) return <div className="h-48 animate-pulse rounded-lg bg-muted" />;
  return (
    <LineChart
      data={data.map((d) => ({ period: d.period, value: d.value }))}
      series={[{ dataKey: 'value', name: 'Revenue (₹)' }]}
      xAxisKey="period"
      height={200}
    />
  );
}
