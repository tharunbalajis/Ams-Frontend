import apiClient from '@/api/client';
import { getSocietyId } from '@/utils/getSocietyId';
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

const sid = () => getSocietyId();

export const invoicesApi = {
  getAll: (params?: InvoiceFiltersParams) =>
    apiClient.get(BASE, { params: { society_id: sid(), limit: 20, offset: 0, ...params } }).then((r) => adaptListResponse<Invoice>(r.data)),

  getById: (id: string) =>
    apiClient.get<Invoice>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Invoice>),

  create: (payload: CreateInvoicePayload) =>
    apiClient.post<Invoice>(BASE, { ...payload, society_id: sid() }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Invoice>),

  update: (id: string, payload: UpdateInvoicePayload) =>
    apiClient.put<Invoice>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Invoice>),

  getPayments: (id: string) =>
    apiClient.get<InvoicePaymentRecord[]>(`${BASE}/${id}`).then((r) => ({ data: r.data?.payments || [], success: true })),

  recordPayment: (id: string, data: { amount: number; payment_mode: string; payment_date?: string; notes?: string }) =>
    apiClient.post(`${BASE}/${id}`, data).then((r) => ({ data: r.data, success: true })),
};

export const paymentsApi = {
  getAll: (params?: { limit?: number; offset?: number }) =>
    apiClient.get('/payments', { params: { society_id: sid(), limit: 20, offset: 0, ...params } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/payments', { ...payload, society_id: sid() }).then((r) => r.data),
};

export const expensesApi = {
  getAll: (params?: { limit?: number; offset?: number }) =>
    apiClient.get('/expenses', { params: { society_id: sid(), limit: 20, offset: 0, ...params } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/expenses', { ...payload, society_id: sid() }).then((r) => r.data),

  getCategories: () =>
    apiClient.get('/expense-categories', { params: { society_id: sid() } }).then((r) => adaptListResponse(r.data)),
};

export const maintenanceHeadsApi = {
  getAll: () =>
    apiClient.get('/maintenance-heads', { params: { society_id: sid() } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/maintenance-heads', { ...payload, society_id: sid() }).then((r) => r.data),

  update: (id: string, payload: any) =>
    apiClient.put(`/maintenance-heads/${id}`, payload).then((r) => r.data),
};

// Finance Dashboard - aggregate from invoices + payments + expenses
export const financialsApi = {
  getDashboard: async () => {
    const sid_val = sid();
    const [invoicesRes, paymentsRes, expensesRes] = await Promise.all([
      apiClient.get('/invoices', { params: { society_id: sid_val, limit: 100, offset: 0 } }),
      apiClient.get('/payments', { params: { society_id: sid_val, limit: 100, offset: 0 } }),
      apiClient.get('/expenses', { params: { society_id: sid_val, limit: 100, offset: 0 } }),
    ]);
    return {
      invoices: adaptListResponse(invoicesRes.data),
      payments: adaptListResponse(paymentsRes.data),
      expenses: adaptListResponse(expensesRes.data),
    };
  },
};