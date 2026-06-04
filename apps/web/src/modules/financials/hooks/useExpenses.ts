import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financialKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { expensesApi } from '../api/expenses.api';
import { toast } from '@/utils/toast';
import type { ExpenseFiltersParams, CreateExpensePayload, UpdateExpensePayload } from '../types/expense.types';

export function useExpenses(params?: ExpenseFiltersParams) {
  return useQuery({
    queryKey:  financialKeys.expenses.list(params),
    queryFn:   () => expensesApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useExpense(id: string) {
  return useQuery({
    queryKey:  financialKeys.expenses.detail(id),
    queryFn:   () => expensesApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateExpensePayload) => expensesApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: financialKeys.expenses.all() });
      toast.success('Expense recorded.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateExpense(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateExpensePayload) => expensesApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: financialKeys.expenses.detail(id) });
      void queryClient.invalidateQueries({ queryKey: financialKeys.expenses.all() });
      toast.success('Expense updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useApproveExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expensesApi.approve(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: financialKeys.expenses.detail(id) });
      void queryClient.invalidateQueries({ queryKey: financialKeys.expenses.all() });
      toast.success('Expense approved.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useRejectExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => expensesApi.reject(id, reason),
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: financialKeys.expenses.detail(id) });
      void queryClient.invalidateQueries({ queryKey: financialKeys.expenses.all() });
      toast.success('Expense rejected.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}
