import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { InvoiceTable }    from '../components/InvoiceTable';
import { InvoiceForm }     from '../components/InvoiceForm';
import { FinancialFilters } from '../components/FinancialFilters';
import { useInvoices, useCreateInvoice } from '../hooks/useInvoices';
import { usePagination }   from '@/hooks/usePagination';
import { useDebounce }     from '@/hooks/useDebounce';
import {
  FINANCIAL_ROUTES,
  INVOICE_STATUS_OPTIONS,
  INVOICE_TYPE_OPTIONS,
} from '../constants/invoice.constants';
import type { InvoiceFiltersParams }   from '../types/invoice.types';
=======
import { Breadcrumbs, Button, Modal, ModalContent, ModalHeader, ModalTitle, PageHeader } from '@ams/ui';
import { useMutation } from '@tanstack/react-query';
import { InvoiceTable }   from '../components/InvoiceTable';
import { InvoiceForm }    from '../components/InvoiceForm';
import { FinancialFilters } from '../components/FinancialFilters';
import { useInvoices }    from '../hooks/useInvoices';
import { invoicesApi }    from '../api/invoices.api';
import { queryClient }    from '@/lib/queryClient';
import { financialKeys }  from '@/lib/index';
import { usePagination }  from '@/hooks/usePagination';
import { useDebounce }    from '@/hooks/useDebounce';
import { FINANCIAL_ROUTES, INVOICE_STATUS_OPTIONS, INVOICE_TYPE_OPTIONS } from '../constants/invoice.constants';
import type { InvoiceFiltersParams } from '../types/invoice.types';
>>>>>>> d852c2e (final)
import type { CreateInvoiceFormValues } from '../schemas/invoice.schema';

export function InvoiceListPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters,  setFilters]  = useState<Partial<InvoiceFiltersParams>>({});
  const [showForm, setShowForm] = useState(false);
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading } = useInvoices({ ...filters, search: debouncedSearch, page, limit: pageSize });
  const { mutate: createInvoice, isPending } = useCreateInvoice();

<<<<<<< HEAD
  const handleCreate = (values: CreateInvoiceFormValues) => {
    createInvoice(values, { onSuccess: () => setShowForm(false) });
  };
=======
  const { mutate: createInvoice, isPending } = useMutation({
    mutationFn: (values: CreateInvoiceFormValues) => invoicesApi.create({
      ...values,
      lineItems: values.lineItems.map((item) => {
        const taxAmount = item.amount * item.taxRate / 100;
        return { ...item, taxAmount, total: item.amount + taxAmount };
      }),
    }),
    onSuccess:  () => { queryClient.invalidateQueries({ queryKey: financialKeys.invoices.lists() }); setShowForm(false); },
  });
>>>>>>> d852c2e (final)

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

<<<<<<< HEAD
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Generate Invoice</h2>
            <InvoiceForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              isPending={isPending}
            />
          </div>
        </div>
      )}
=======
      <Modal open={showForm} onOpenChange={setShowForm}>
        <ModalContent className="max-w-2xl">
          <ModalHeader><ModalTitle>Generate Invoice</ModalTitle></ModalHeader>
          <InvoiceForm onSubmit={(v) => createInvoice(v)} onCancel={() => setShowForm(false)} isPending={isPending} />
        </ModalContent>
      </Modal>
>>>>>>> d852c2e (final)
    </div>
  );
}
