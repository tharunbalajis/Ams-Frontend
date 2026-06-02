import { BarChart, KPIWidget, PieChart } from '@ams/ui';
import type { ComplaintAnalytics as ComplaintAnalyticsData } from '../../types/analytics.types';

export interface ComplaintAnalyticsProps {
  data:     ComplaintAnalyticsData;
  loading?: boolean;
}

export function ComplaintAnalytics({ data, loading }: ComplaintAnalyticsProps) {
  const kpis = [
    { label: 'Total',         value: data.total,                  description: 'All time' },
    { label: 'Open',          value: data.open,                   description: 'Awaiting action' },
    { label: 'Resolved',      value: data.resolved,               description: 'This period' },
    { label: 'SLA Breaches',  value: data.slaBreaches,            description: 'Critical', variant: 'destructive' as const },
    { label: 'Avg Resolution',value: `${data.avgResolutionTimeHours.toFixed(1)}h`, description: 'Hours' },
    { label: 'Escalated',     value: data.escalated,              description: 'Requires attention' },
  ];

  const categoryChartData = data.byCategory.map((c) => ({
    name:  c.category.replace('_', ' '),
    value: c.count,
  }));

  const priorityChartData = data.byPriority.map((p) => ({
    name:  p.priority,
    value: p.count,
  }));

  const trendData = data.resolutionTrend.map((t) => ({
    date:  t.date,
    value: t.count,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <KPIWidget
            key={kpi.label}
            title={kpi.label}
            value={kpi.value}
            description={kpi.description}
            loading={loading}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold">Complaints by Category</h3>
          <PieChart data={categoryChartData} loading={loading} />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Complaints by Priority</h3>
          <BarChart data={priorityChartData} xKey="name" yKey="value" loading={loading} />
        </div>
      </div>

      {trendData.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold">Resolution Trend</h3>
          <BarChart data={trendData} xKey="date" yKey="value" loading={loading} />
        </div>
      )}
    </div>
  );
}
