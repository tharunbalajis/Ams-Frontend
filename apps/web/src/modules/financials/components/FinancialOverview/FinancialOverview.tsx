import { KPISection }        from '../KPISection';
import { RevenueTrendChart }  from '../RevenueTrendChart';
import { ExpenseTrendChart }  from '../ExpenseTrendChart';
import type { FinancialAnalytics } from '../../types/analytics.types';

export interface FinancialOverviewProps {
  analytics: FinancialAnalytics;
  loading?:  boolean;
}

export function FinancialOverview({ analytics, loading }: FinancialOverviewProps) {
  return (
    <div className="space-y-8">
      <KPISection dashboard={analytics.dashboard} loading={loading} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold">Revenue Trend</h3>
          <RevenueTrendChart data={analytics.revenueTrend} loading={loading} />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Expense Trend</h3>
          <ExpenseTrendChart data={analytics.expenseTrend} loading={loading} />
        </div>
      </div>
    </div>
  );
}
