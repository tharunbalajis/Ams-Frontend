import { Card, CardContent, CardHeader, CardTitle, LineChart } from '@ams/ui';
import { useAnalytics } from '../../hooks/useAnalytics';

export function ComplaintTrendChart() {
  const { data } = useAnalytics();
  const chartData = data?.data?.complaintTrend ?? [];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Complaint Trend</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <LineChart
          data={chartData}
          series={[{ dataKey: 'value', name: 'Complaints' }]}
          xAxisKey="date"
          height={180}
          showLegend={false}
          className="px-2"
        />
      </CardContent>
    </Card>
  );
}
