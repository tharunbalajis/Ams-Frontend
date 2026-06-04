import { useState } from 'react';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { ExpenseTable }    from '../components/ExpenseTable';
import { ExpenseForm }     from '../components/ExpenseForm';
import { FinancialFilters } from '../components/FinancialFilters';
import { useExpenses, useCreateExpense, useApproveExpense, useRejectExpense } from '../hooks/useExpenses';
import { usePagination }   from '@/hooks/usePagination';
import { FINANCIAL_ROUTES } from '../constants/invoice.constants';
import { EXPENSE_STATUS_OPTIONS } from '../constants/expense.constants';
import type { ExpenseFiltersParams }   from '../types/expense.types';
import type { CreateExpenseFormValues } from '../schemas/expense.schema';

export function ExpensesPage() {
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters,  setFilters]  = useState<Partial<ExpenseFiltersParams>>({});
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading }                           = useExpenses({ ...filters, page, limit: pageSize });
  const { mutate: createExpense, isPending: creating } = useCreateExpense();
  const { mutate: approveExpense }                     = useApproveExpense();
  const { mutate: rejectExpense }                      = useRejectExpense();

  const handleCreate = (values: CreateExpenseFormValues) => {
    createExpense(values, { onSuccess: () => setShowForm(false) });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Track and approve operational expenses"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD },
            { label: 'Expenses' },
          ]} />
        }
        actions={<Button onClick={() => setShowForm(true)}>Add Expense</Button>}
      />

      <FinancialFilters
        filters={filters}
        onChange={(f) => { setFilters(f as Partial<ExpenseFiltersParams>); reset(); }}
        statusOptions={EXPENSE_STATUS_OPTIONS}
        searchPlaceholder="Search expenses..."
      />

      <ExpenseTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
        onApprove={(id) => approveExpense(id)}
        onReject={(id) => rejectExpense({ id })}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Add Expense</h2>
            <ExpenseForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              isPending={creating}
            />
          </div>
        </div>
      )}
    </div>
  );
}
