import { KPIWidget, BarChart, PieChart } from '@ams/ui';
import type { ComplaintAnalytics as ComplaintAnalyticsData } from '../../types/analytics.types';

export interface ComplaintAnalyticsProps {
  data:     ComplaintAnalyticsData;
  loading?: boolean;
}

export function ComplaintAnalytics({ data, loading }: ComplaintAnalyticsProps) {
  const kpis = [
    { title: 'Total',          value: data.total },
    { title: 'Open',           value: data.open },
    { title: 'In Progress',    value: data.inProgress },
    { title: 'Resolved',       value: data.resolved },
    { title: 'Closed',         value: data.closed },
    { title: 'Avg Resolution', value: `${data.avgResolutionTimeHours.toFixed(1)}h` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <KPIWidget key={kpi.title} title={kpi.title} value={kpi.value} loading={loading} />
        ))}
      </div>

      {data.byCategory.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold">By Category</h3>
            <PieChart
              data={data.byCategory.map((c) => ({ name: c.category, value: c.count }))}
              height={200}
            />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">By Priority</h3>
            <BarChart
              data={data.byPriority.map((p) => ({ priority: p.priority, count: p.count }))}
              series={[{ dataKey: 'count', name: 'Complaints' }]}
              xAxisKey="priority"
              height={200}
            />
          </div>
        </div>
      )}

      {data.resolutionTrend.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold">Resolution Trend</h3>
          <BarChart
            data={data.resolutionTrend.map((t) => ({ date: t.date, count: t.count }))}
            series={[{ dataKey: 'count', name: 'Resolved' }]}
            xAxisKey="date"
            height={200}
          />
        </div>
      )}
    </div>
  );
}
