import type { AxiosResponse } from 'axios';
import { financialsApi as globalApi } from '@/api/financials.api';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Invoice,
  InvoiceListItem,
  CreateInvoicePayload,
  UpdateInvoicePayload,
  InvoiceFiltersParams,
} from '../types/invoice.types';

export const invoicesApi = {
  getAll: (params?: InvoiceFiltersParams): Promise<AxiosResponse<ApiListResponse<InvoiceListItem>>> =>
    globalApi.getInvoices(params) as Promise<AxiosResponse<ApiListResponse<InvoiceListItem>>>,

  getById: (id: string): Promise<AxiosResponse<ApiResponse<Invoice>>> =>
    globalApi.getInvoiceById(id) as Promise<AxiosResponse<ApiResponse<Invoice>>>,

  create: (payload: CreateInvoicePayload): Promise<AxiosResponse<ApiResponse<Invoice>>> =>
    globalApi.createInvoice(payload) as Promise<AxiosResponse<ApiResponse<Invoice>>>,

  update: (id: string, payload: UpdateInvoicePayload): Promise<AxiosResponse<ApiResponse<Invoice>>> =>
    globalApi.updateInvoice(id, payload) as Promise<AxiosResponse<ApiResponse<Invoice>>>,
};
