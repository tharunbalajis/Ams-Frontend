import { Breadcrumbs, PageHeader } from '@ams/ui';
import { DefaultersTable }   from '../components/DefaultersTable';
import { AgingBucketChart }  from '../components/AgingBucketChart';
import { useDefaulters }     from '../hooks/useDefaulters';
import { usePagination }     from '@/hooks/usePagination';
import { FINANCIAL_ROUTES }  from '../constants/invoice.constants';

export function DefaultersPage() {
  const { page, pageSize } = usePagination(1, 50);

  const { data, isLoading } = useDefaulters({ page, pageSize });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Defaulters"
        description="Residents with outstanding dues and overdue invoices"
        breadcrumbs={<Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD }, { label: 'Defaulters' }]} />}
      />

      <div className="max-w-2xl">
        <h3 className="mb-3 text-sm font-semibold">Outstanding Dues by Age</h3>
        <AgingBucketChart data={[]} loading={isLoading} />
      </div>

      <DefaultersTable
        data={data?.data ?? []}
        loading={isLoading}
      />
    </div>
  );
}
