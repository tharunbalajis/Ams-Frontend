import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Invoice,
  CreateInvoicePayload,
  UpdateInvoicePayload,
  InvoiceFiltersParams,
  InvoicePaymentRecord,
} from '../types/invoice.types';

const BASE = '/invoices';

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return { data: arr, meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false }, success: true };
}

export const invoicesApi = {
  getAll: (params?: InvoiceFiltersParams) =>
    apiClient.get<Invoice[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getById: (id: string) =>
    apiClient.get<Invoice>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Invoice>),

  create: (payload: CreateInvoicePayload) =>
    apiClient.post<Invoice>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Invoice>),

  update: (id: string, payload: UpdateInvoicePayload) =>
    apiClient.put<Invoice>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Invoice>),

  getPayments: (id: string) =>
    apiClient.get<InvoicePaymentRecord[]>(`${BASE}/${id}/payments`).then((r) => ({ data: r.data, success: true })),

  recordPayment: (id: string, data: { amount: number; payment_mode: string; idempotency_key: string }) =>
    apiClient.post(`${BASE}/${id}/payments`, data).then((r) => ({ data: r.data, success: true })),
};
