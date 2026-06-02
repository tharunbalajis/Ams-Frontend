import { LineChart } from '@ams/ui';
import type { TrendPoint } from '../../types/analytics.types';

export interface CollectionTrendChartProps {
  data:     TrendPoint[];
  loading?: boolean;
}

export function CollectionTrendChart({ data, loading }: CollectionTrendChartProps) {
  return (
    <LineChart
      data={data.map((d) => ({ name: d.period, value: d.value }))}
      xKey="name"
      yKey="value"
      loading={loading}
    />
  );
}
