import { useState } from 'react';
import { Breadcrumbs, PageHeader } from '@ams/ui';
import { PaymentTable }      from '../components/PaymentTable';
import { FinancialFilters }  from '../components/FinancialFilters';
import { usePayments }       from '../hooks/usePayments';
import { usePagination }     from '@/hooks/usePagination';
import { useDebounce }       from '@/hooks/useDebounce';
import { FINANCIAL_ROUTES }  from '../constants/invoice.constants';
import { PAYMENT_METHOD_OPTIONS, PAYMENT_STATUS_OPTIONS } from '../constants/payment.constants';
import type { PaymentFiltersParams } from '../types/payment.types';

export function PaymentsPage() {
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<PaymentFiltersParams>>({});
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading } = usePayments({ ...filters, search: debouncedSearch, page, pageSize } as never);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="All payment transactions and receipts"
        breadcrumbs={<Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD }, { label: 'Payments' }]} />}
      />

      <FinancialFilters
        filters={filters}
        onChange={(f) => { setFilters(f as Partial<PaymentFiltersParams>); reset(); }}
        statusOptions={PAYMENT_STATUS_OPTIONS}
        typeOptions={PAYMENT_METHOD_OPTIONS}
        searchPlaceholder="Search payments..."
      />

      <PaymentTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />
    </div>
  );
}
