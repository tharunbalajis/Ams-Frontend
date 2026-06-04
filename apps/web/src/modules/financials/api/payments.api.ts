import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { Payment, PaymentListItem, CreatePaymentPayload, PaymentFiltersParams } from '../types/payment.types';

// Payments are nested under invoices: /invoices/:id/payments
// There is no standalone /payments route in the backend.

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return { data: arr, meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false }, success: true };
}

export const paymentsApi = {
  getAll: (params?: PaymentFiltersParams) => {
    const invoiceId = (params as { invoiceId?: string })?.invoiceId;
    if (invoiceId) {
      return apiClient.get<PaymentListItem[]>(`/invoices/${invoiceId}/payments`, { params }).then((r) => wrapArray(r.data));
    }
    // Fallback: no top-level payments endpoint — return empty
    return Promise.resolve(wrapArray<PaymentListItem>([]));
  },

  getById: (id: string) =>
    apiClient.get<Payment>(`/invoices/${id}/payments`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Payment>),

  create: (payload: CreatePaymentPayload) => {
    const invoiceId = payload.invoiceId;
    return apiClient.post<Payment>(`/invoices/${invoiceId}/payments`, {
      amount:           payload.amount,
      payment_mode:     payload.method,
      idempotency_key:  `${invoiceId}-${Date.now()}`,
    }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Payment>);
  },
};
