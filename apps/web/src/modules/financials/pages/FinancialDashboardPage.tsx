import { useState } from 'react';
import { Breadcrumbs, PageHeader } from '@ams/ui';
import { FinancialOverview }   from '../components/FinancialOverview';
import { useFinancialAnalytics } from '../hooks/useFinancialAnalytics';
import { FINANCIAL_ROUTES }    from '../constants/invoice.constants';

const EMPTY_ANALYTICS = {
  kpi: { totalRevenue: 0, totalExpenses: 0, netSurplus: 0, outstandingDues: 0, collectionRate: 0, defaulterCount: 0, monthlyRevenue: 0, monthlyExpenses: 0 },
  revenueTrend: [], expenseTrend: [], collectionTrend: [], agingBuckets: [], expenseBreakdown: [],
};

export function FinancialDashboardPage() {
  const [dateRange, setDateRange] = useState<{ dateFrom?: string; dateTo?: string }>({});
  const { data, isLoading } = useFinancialAnalytics(dateRange);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Overview"
        description="Revenue, expenses, collections, and outstanding dues"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Financials' },
          ]} />
        }
      />

      <div className="flex gap-3">
        <input type="date" className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" value={dateRange.dateFrom ?? ''} onChange={(e) => setDateRange((r) => ({ ...r, dateFrom: e.target.value }))} />
        <span className="self-center text-sm text-muted-foreground">to</span>
        <input type="date" className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" value={dateRange.dateTo ?? ''} onChange={(e) => setDateRange((r) => ({ ...r, dateTo: e.target.value }))} />
      </div>

      <FinancialOverview analytics={data?.data ?? EMPTY_ANALYTICS} loading={isLoading} />
    </div>
  );
}
