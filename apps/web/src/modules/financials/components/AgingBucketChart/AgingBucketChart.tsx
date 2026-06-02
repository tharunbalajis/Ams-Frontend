import { BarChart } from '@ams/ui';
import type { AgingBucket } from '../../types/collection.types';

export interface AgingBucketChartProps {
  data:     AgingBucket[];
  loading?: boolean;
}

export function AgingBucketChart({ data, loading }: AgingBucketChartProps) {
  return (
    <BarChart
      data={data.map((d) => ({ name: d.label, value: d.amount, count: d.count }))}
      xKey="name"
      yKey="value"
      loading={loading}
    />
  );
}
