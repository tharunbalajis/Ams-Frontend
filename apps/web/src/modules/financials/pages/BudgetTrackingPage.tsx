import { Breadcrumbs, PageHeader } from '@ams/ui';
import { BudgetCard }        from '../components/BudgetCard';
import { useQuery }          from '@tanstack/react-query';
import { STALE_TIME }        from '@/constants/query.constants';
import { FINANCIAL_ROUTES }  from '../constants/invoice.constants';
import type { Budget } from '../types/budget.types';

export function BudgetTrackingPage() {
  const { data, isLoading } = useQuery<{ data: Budget[] }>({
    queryKey:  ['financials', 'budgets'],
    queryFn:   async () => ({ data: [] }),
    staleTime: STALE_TIME.DEFAULT,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget Tracking"
        description="Monitor budget utilization across expense categories"
        breadcrumbs={<Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD }, { label: 'Budgets' }]} />}
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-56 animate-pulse rounded-lg bg-muted" />)}
        </div>
      ) : (data?.data ?? []).length === 0 ? (
        <p className="text-sm text-muted-foreground">No budgets configured.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(data?.data ?? []).map((b) => <BudgetCard key={b.id} budget={b} />)}
        </div>
      )}
    </div>
  );
}
