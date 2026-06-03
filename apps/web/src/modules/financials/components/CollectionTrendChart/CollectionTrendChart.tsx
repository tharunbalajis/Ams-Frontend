import { LineChart, LoadingState } from '@ams/ui';
import type { TrendPoint } from '../../types/analytics.types';

export interface CollectionTrendChartProps {
  data:     TrendPoint[];
  loading?: boolean;
}

export function CollectionTrendChart({ data, loading }: CollectionTrendChartProps) {
  if (loading) return <LoadingState />;
  return (
    <LineChart
      data={data.map((d) => ({ name: d.period, value: d.value }))}
      xAxisKey="name"
      series={[{ dataKey: 'value', name: 'Collections' }]}
    />
  );
}
