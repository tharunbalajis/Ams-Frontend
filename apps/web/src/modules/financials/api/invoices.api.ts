import apiClient from '@/api/client';
import { adaptListResponse } from '@/api/utils';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Invoice,
  CreateInvoicePayload,
  UpdateInvoicePayload,
  InvoiceFiltersParams,
  InvoicePaymentRecord,
} from '../types/invoice.types';

const BASE = '/invoices';

export const invoicesApi = {
  getAll: (params?: InvoiceFiltersParams) =>
    apiClient.get(BASE, { params }).then((r) => adaptListResponse<Invoice>(r.data)),

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
