import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { Expense, ExpenseListItem, CreateExpensePayload, UpdateExpensePayload, ExpenseFiltersParams } from '../types/expense.types';

const BASE = '/financials/expenses';

export const expensesApi = {
  getAll: (params?: ExpenseFiltersParams) =>
    apiClient.get<ApiListResponse<ExpenseListItem>>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Expense>>(`${BASE}/${id}`).then((r) => r.data),

  create: (payload: CreateExpensePayload) =>
    apiClient.post<ApiResponse<Expense>>(BASE, payload).then((r) => r.data),

  update: (id: string, payload: UpdateExpensePayload) =>
    apiClient.patch<ApiResponse<Expense>>(`${BASE}/${id}`, payload).then((r) => r.data),

  approve: (id: string) =>
    apiClient.patch<ApiResponse<Expense>>(`${BASE}/${id}/approve`).then((r) => r.data),

  reject: (id: string, reason?: string) =>
    apiClient.patch<ApiResponse<Expense>>(`${BASE}/${id}/reject`, { reason }).then((r) => r.data),

  markPaid: (id: string) =>
    apiClient.patch<ApiResponse<Expense>>(`${BASE}/${id}/mark-paid`).then((r) => r.data),

  uploadReceipt: (id: string, file: File) => {
    const form = new FormData();
    form.append('receipt', file);
    return apiClient.post<ApiResponse<{ url: string }>>(`${BASE}/${id}/receipt`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },
};
