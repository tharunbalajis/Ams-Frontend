import { useState } from 'react';
import { useNavigate }           from 'react-router-dom';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { FinancialOverview }     from '../components/FinancialOverview';
import { useFinancialAnalytics } from '../hooks/useFinancialAnalytics';
<<<<<<< HEAD
import { FINANCIAL_ROUTES }      from '../constants/invoice.constants';
=======
>>>>>>> d852c2e (final)

const EMPTY_ANALYTICS = {
  dashboard:        { totalRevenue: 0, totalExpenses: 0, netSurplus: 0, outstandingDues: 0, collectionRate: 0, pendingInvoices: 0, overdueInvoices: 0 },
  revenueTrend:     [],
  expenseTrend:     [],
  expenseBreakdown: [],
};

export function FinancialDashboardPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ dateFrom?: string; dateTo?: string }>({});
  const { data, isLoading } = useFinancialAnalytics(dateRange);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Overview"
        description="Revenue, expenses, and outstanding dues"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Financials' },
          ]} />
        }
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void navigate(FINANCIAL_ROUTES.INVOICES)}>
              Invoices
            </Button>
            <Button variant="outline" onClick={() => void navigate(FINANCIAL_ROUTES.EXPENSES)}>
              Expenses
            </Button>
            <Button onClick={() => void navigate(FINANCIAL_ROUTES.PAYMENTS)}>
              Payments
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
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

      <FinancialOverview analytics={data?.data ?? EMPTY_ANALYTICS} loading={isLoading} />
    </div>
  );
}
