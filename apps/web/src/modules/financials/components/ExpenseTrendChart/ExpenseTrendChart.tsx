import { BarChart } from '@ams/ui';
import type { TrendPoint } from '../../types/analytics.types';

export interface ExpenseTrendChartProps {
  data:     TrendPoint[];
  loading?: boolean;
}

export function ExpenseTrendChart({ data, loading }: ExpenseTrendChartProps) {
  return (
    <BarChart
      data={data.map((d) => ({ name: d.period, value: d.value }))}
      xKey="name"
      yKey="value"
      loading={loading}
    />
  );
}
