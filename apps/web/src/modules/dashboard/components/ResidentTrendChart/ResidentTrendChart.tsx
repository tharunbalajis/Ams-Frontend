import { Card, CardContent, CardHeader, CardTitle, LineChart } from '@ams/ui';
import { useAnalytics } from '../../hooks/useAnalytics';

export function ResidentTrendChart() {
  const { data } = useAnalytics();
  const chartData = data?.data?.residentTrend ?? [];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Resident Growth</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <LineChart
          data={chartData}
          series={[{ dataKey: 'value', name: 'Residents' }]}
          xAxisKey="date"
          height={180}
          showLegend={false}
          className="px-2"
        />
      </CardContent>
    </Card>
  );
}
