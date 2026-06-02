import { BarChart, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { useAnalytics } from '../../hooks/useAnalytics';

export function OccupancyChart() {
  const { data } = useAnalytics();
  const chartData = data?.data?.occupancyTrend ?? [];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Unit Occupancy</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <BarChart
          data={chartData}
          series={[
            { dataKey: 'occupied', name: 'Occupied' },
            { dataKey: 'vacant',   name: 'Vacant' },
          ]}
          xAxisKey="month"
          height={180}
          stacked
          showLegend={false}
          className="px-2"
        />
      </CardContent>
    </Card>
  );
}
