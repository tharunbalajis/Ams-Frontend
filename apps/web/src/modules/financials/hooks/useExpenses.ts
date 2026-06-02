import { useQuery } from '@tanstack/react-query';
import { financialKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { expensesApi } from '../api/expenses.api';
import type { ExpenseFiltersParams } from '../types/expense.types';

export function useExpenses(params?: ExpenseFiltersParams) {
  return useQuery({
    queryKey:  financialKeys.expenses.list(params),
    queryFn:   () => expensesApi.getAll(params).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
  });
}
