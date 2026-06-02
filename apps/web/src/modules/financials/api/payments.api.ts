import type { AxiosResponse } from 'axios';
import { financialsApi as globalApi } from '@/api/financials.api';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { Payment, PaymentListItem, CreatePaymentPayload, PaymentFiltersParams } from '../types/payment.types';

export const paymentsApi = {
  getAll: (params?: PaymentFiltersParams): Promise<AxiosResponse<ApiListResponse<PaymentListItem>>> =>
    globalApi.getPayments(params) as Promise<AxiosResponse<ApiListResponse<PaymentListItem>>>,

  getById: (id: string): Promise<AxiosResponse<ApiResponse<Payment>>> =>
    globalApi.getPaymentById(id) as Promise<AxiosResponse<ApiResponse<Payment>>>,

  create: (payload: CreatePaymentPayload): Promise<AxiosResponse<ApiResponse<Payment>>> =>
    globalApi.createPayment(payload) as Promise<AxiosResponse<ApiResponse<Payment>>>,

  getByInvoice: (invoiceId: string): Promise<AxiosResponse<ApiListResponse<PaymentListItem>>> =>
    globalApi.getPayments({ invoiceId }) as Promise<AxiosResponse<ApiListResponse<PaymentListItem>>>,
};
