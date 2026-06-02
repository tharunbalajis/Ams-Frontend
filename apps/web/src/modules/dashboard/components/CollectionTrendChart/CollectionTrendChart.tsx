import { BarChart, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { useAnalytics } from '../../hooks/useAnalytics';

export function CollectionTrendChart() {
  const { data } = useAnalytics();
  const chartData = data?.data?.collectionTrend ?? [];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Monthly Collections</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <BarChart
          data={chartData}
          series={[
            { dataKey: 'collected', name: 'Collected' },
            { dataKey: 'pending',   name: 'Pending' },
            { dataKey: 'overdue',   name: 'Overdue' },
          ]}
          xAxisKey="month"
          height={180}
          showLegend={false}
          className="px-2"
        />
      </CardContent>
    </Card>
  );
}
