import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, Dialog, DialogContent, DialogHeader, DialogTitle, PageHeader } from '@ams/ui';
import { useMutation } from '@tanstack/react-query';
import { InvoiceTable }   from '../components/InvoiceTable';
import { InvoiceForm }    from '../components/InvoiceForm';
import { FinancialFilters } from '../components/FinancialFilters';
import { useInvoices }    from '../hooks/useInvoices';
import { invoicesApi }    from '../api/invoices.api';
import { queryClient }    from '@/lib/queryClient';
import { financialKeys }  from '@/lib';
import { usePagination }  from '@/hooks/usePagination';
import { useDebounce }    from '@/hooks/useDebounce';
import { FINANCIAL_ROUTES, INVOICE_STATUS_OPTIONS, INVOICE_TYPE_OPTIONS } from '../constants/invoice.constants';
import type { InvoiceFiltersParams } from '../types/invoice.types';
import type { CreateInvoiceFormValues } from '../schemas/invoice.schema';

export function InvoiceListPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<InvoiceFiltersParams>>({});
  const [showForm, setShowForm] = useState(false);
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading } = useInvoices({ ...filters, search: debouncedSearch, page, pageSize });

  const { mutate: createInvoice, isPending } = useMutation({
    mutationFn: (values: CreateInvoiceFormValues) => invoicesApi.create(values),
    onSuccess:  () => { queryClient.invalidateQueries({ queryKey: financialKeys.invoices.lists() }); setShowForm(false); },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Manage maintenance and other resident invoices"
        breadcrumbs={<Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD }, { label: 'Invoices' }]} />}
        actions={<Button onClick={() => setShowForm(true)}>Generate Invoice</Button>}
      />

      <FinancialFilters
        filters={filters}
        onChange={(f) => { setFilters(f as Partial<InvoiceFiltersParams>); reset(); }}
        statusOptions={INVOICE_STATUS_OPTIONS}
        typeOptions={INVOICE_TYPE_OPTIONS}
        searchPlaceholder="Search invoices..."
      />

      <InvoiceTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
        onRecordPayment={(id) => void navigate(FINANCIAL_ROUTES.INVOICE_DETAIL.replace(':id', id))}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Generate Invoice</DialogTitle></DialogHeader>
          <InvoiceForm onSubmit={(v) => createInvoice(v)} onCancel={() => setShowForm(false)} isPending={isPending} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
