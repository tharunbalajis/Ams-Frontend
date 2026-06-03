import { BarChart, LoadingState } from '@ams/ui';
import type { AgingBucket } from '../../types/collection.types';

export interface AgingBucketChartProps {
  data:     AgingBucket[];
  loading?: boolean;
}

export function AgingBucketChart({ data, loading }: AgingBucketChartProps) {
  if (loading) return <LoadingState />;
  return (
    <BarChart
      data={data.map((d) => ({ name: d.label, value: d.amount, count: d.count }))}
      xAxisKey="name"
      series={[{ dataKey: 'value', name: 'Amount' }]}
    />
  );
}
