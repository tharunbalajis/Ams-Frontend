import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { Expense, ExpenseListItem, CreateExpensePayload, UpdateExpensePayload, ExpenseFiltersParams } from '../types/expense.types';

// Backend path: /expenses  (NOT /financials/expenses)
const BASE = '/expenses';

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return { data: arr, meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false }, success: true };
}

export const expensesApi = {
  getAll: (params?: ExpenseFiltersParams) =>
    apiClient.get<ExpenseListItem[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getById: (id: string) =>
    apiClient.get<Expense>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Expense>),

  create: (payload: CreateExpensePayload) =>
    apiClient.post<Expense>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Expense>),

  update: (id: string, payload: UpdateExpensePayload) =>
    apiClient.put<Expense>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Expense>),

  approve: (id: string) =>
    apiClient.put<Expense>(`${BASE}/${id}/approve`, {}).then((r) => ({ data: r.data, success: true }) as ApiResponse<Expense>),

  reject: (id: string, reason?: string) =>
    apiClient.put<Expense>(`${BASE}/${id}/reject`, { reason }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Expense>),
};
