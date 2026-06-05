import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { InvoiceTable }    from '../components/InvoiceTable';
import { FinancialFilters } from '../components/FinancialFilters';
import { useInvoices }     from '../hooks/useInvoices';
import { usePagination }   from '@/hooks/usePagination';
import {
  FINANCIAL_ROUTES,
  INVOICE_STATUS_OPTIONS,
} from '../constants/invoice.constants';
import type { InvoiceFiltersParams } from '../types/invoice.types';

export function InvoiceListPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<InvoiceFiltersParams>>({});

  const { data, isLoading } = useInvoices(filters);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Manage maintenance and other resident invoices"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD },
            { label: 'Invoices' },
          ]} />
        }
      />

      <FinancialFilters
        filters={filters}
        onChange={(f) => { setFilters(f as Partial<InvoiceFiltersParams>); reset(); }}
        statusOptions={INVOICE_STATUS_OPTIONS}
        typeOptions={[]}
        searchPlaceholder="Search invoices..."
      />

      <InvoiceTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
        onRecordPayment={(id) => void navigate(FINANCIAL_ROUTES.INVOICE_DETAIL.replace(':id', id))}
      />
    </div>
  );
}
