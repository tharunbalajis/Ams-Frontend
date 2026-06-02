import { useState } from 'react';
import { Breadcrumbs, PageHeader } from '@ams/ui';
import { ComplaintAnalytics } from '../components/ComplaintAnalytics';
import { useComplaintAnalytics } from '../hooks/useComplaintAnalytics';
import { COMPLAINT_ROUTES } from '../constants/complaint.constants';

export function ComplaintDashboardPage() {
  const [dateRange, setDateRange] = useState<{ dateFrom?: string; dateTo?: string }>({});

  const { data, isLoading } = useComplaintAnalytics(dateRange);

  const emptyAnalytics = {
    total: 0, open: 0, resolved: 0, closed: 0,
    escalated: 0, slaBreaches: 0, avgResolutionTimeHours: 0,
    byCategory: [], byPriority: [], resolutionTrend: [],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Complaint Analytics"
        description="Insights into complaint trends, SLA performance, and resolution metrics"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',   href: '/dashboard' },
            { label: 'Complaints',  href: COMPLAINT_ROUTES.LIST },
            { label: 'Analytics' },
          ]} />
        }
      />

      <div className="flex gap-3">
        <input
          type="date"
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={dateRange.dateFrom ?? ''}
          onChange={(e) => setDateRange((r) => ({ ...r, dateFrom: e.target.value }))}
        />
        <span className="self-center text-sm text-muted-foreground">to</span>
        <input
          type="date"
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={dateRange.dateTo ?? ''}
          onChange={(e) => setDateRange((r) => ({ ...r, dateTo: e.target.value }))}
        />
      </div>

      <ComplaintAnalytics
        data={data?.data ?? emptyAnalytics}
        loading={isLoading}
      />
    </div>
  );
}
