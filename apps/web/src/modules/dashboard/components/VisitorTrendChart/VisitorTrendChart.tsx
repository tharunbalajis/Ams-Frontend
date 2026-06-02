import { Card, CardContent, CardHeader, CardTitle, LineChart } from '@ams/ui';
import { useAnalytics } from '../../hooks/useAnalytics';

export function VisitorTrendChart() {
  const { data } = useAnalytics();
  const chartData = data?.data?.visitorTrend ?? [];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Visitor Traffic</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <LineChart
          data={chartData}
          series={[{ dataKey: 'value', name: 'Visitors' }]}
          xAxisKey="date"
          height={180}
          showLegend={false}
          className="px-2"
        />
      </CardContent>
    </Card>
  );
}
