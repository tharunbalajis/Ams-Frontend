import { LineChart } from '@ams/ui';
import type { TrendPoint } from '../../types/analytics.types';

export interface RevenueTrendChartProps {
  data:     TrendPoint[];
  loading?: boolean;
}

export function RevenueTrendChart({ data, loading }: RevenueTrendChartProps) {
  return (
    <LineChart
      data={data.map((d) => ({ name: d.period, value: d.value }))}
      xKey="name"
      yKey="value"
      loading={loading}
    />
  );
}
