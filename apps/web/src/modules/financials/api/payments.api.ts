import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { Payment, PaymentListItem, CreatePaymentPayload, PaymentFiltersParams } from '../types/payment.types';

const BASE = '/financials/payments';

export const paymentsApi = {
  getAll: (params?: PaymentFiltersParams) =>
    apiClient.get<ApiListResponse<PaymentListItem>>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Payment>>(`${BASE}/${id}`).then((r) => r.data),

  create: (payload: CreatePaymentPayload) =>
    apiClient.post<ApiResponse<Payment>>(BASE, payload).then((r) => r.data),
};
