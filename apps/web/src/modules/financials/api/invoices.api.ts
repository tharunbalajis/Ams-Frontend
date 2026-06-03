import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Invoice,
  InvoiceListItem,
  CreateInvoicePayload,
  UpdateInvoicePayload,
  InvoiceFiltersParams,
  InvoicePaymentRecord,
} from '../types/invoice.types';

const BASE = '/financials/invoices';

export const invoicesApi = {
  getAll: (params?: InvoiceFiltersParams) =>
    apiClient.get<ApiListResponse<InvoiceListItem>>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Invoice>>(`${BASE}/${id}`).then((r) => r.data),

  create: (payload: CreateInvoicePayload) =>
    apiClient.post<ApiResponse<Invoice>>(BASE, payload).then((r) => r.data),

  update: (id: string, payload: UpdateInvoicePayload) =>
    apiClient.patch<ApiResponse<Invoice>>(`${BASE}/${id}`, payload).then((r) => r.data),

  cancel: (id: string) =>
    apiClient.patch<ApiResponse<Invoice>>(`${BASE}/${id}/cancel`).then((r) => r.data),

  getPayments: (id: string) =>
    apiClient.get<ApiResponse<InvoicePaymentRecord>>(`${BASE}/${id}/payments`).then((r) => r.data),
};
