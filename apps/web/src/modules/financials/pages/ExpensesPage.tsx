import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumbs, Button, Dialog, DialogContent, DialogHeader, DialogTitle, PageHeader } from '@ams/ui';
import { ExpenseTable }      from '../components/ExpenseTable';
import { ExpenseForm }       from '../components/ExpenseForm';
import { FinancialFilters }  from '../components/FinancialFilters';
import { useExpenses }       from '../hooks/useExpenses';
import { expensesApi }       from '../api/expenses.api';
import { queryClient }       from '@/lib/queryClient';
import { financialKeys }     from '@/lib';
import { usePagination }     from '@/hooks/usePagination';
import { FINANCIAL_ROUTES }  from '../constants/invoice.constants';
import { EXPENSE_CATEGORY_OPTIONS, EXPENSE_STATUS_OPTIONS } from '../constants/expense.constants';
import type { ExpenseFiltersParams } from '../types/expense.types';
import type { CreateExpenseFormValues } from '../schemas/expense.schema';

export function ExpensesPage() {
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<ExpenseFiltersParams>>({});
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useExpenses({ ...filters, page, pageSize });

  const { mutate: createExpense, isPending } = useMutation({
    mutationFn: (values: CreateExpenseFormValues) => expensesApi.create(values),
    onSuccess:  () => { queryClient.invalidateQueries({ queryKey: financialKeys.expenses.lists() }); setShowForm(false); },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Track and approve operational expenses"
        breadcrumbs={<Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD }, { label: 'Expenses' }]} />}
        actions={<Button onClick={() => setShowForm(true)}>Add Expense</Button>}
      />

      <FinancialFilters
        filters={filters}
        onChange={(f) => { setFilters(f as Partial<ExpenseFiltersParams>); reset(); }}
        statusOptions={EXPENSE_STATUS_OPTIONS}
        typeOptions={EXPENSE_CATEGORY_OPTIONS}
        searchPlaceholder="Search expenses..."
      />

      <ExpenseTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Add Expense</DialogTitle></DialogHeader>
          <ExpenseForm onSubmit={(v) => createExpense(v)} onCancel={() => setShowForm(false)} isPending={isPending} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
