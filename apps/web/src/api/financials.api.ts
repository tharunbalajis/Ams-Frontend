import apiClient from './client';
import type { Invoice } from '@/modules/financials/types/invoice.types';
import type { MaintenanceHead } from '@/modules/financials/types/maintenance.types';
import type { Expense } from '@/modules/financials/types/expense.types';

export const financialsApi = {
  getDashboard: () => apiClient.get('/finance/dashboard'),
  getInvoices: (params?: { society_id?: number; status?: string; unit_id?: number }) =>
    apiClient.get<Invoice[]>('/invoices', { params }),
  getInvoiceById: (id: string) => apiClient.get<Invoice>(`/invoices/${id}`),
  createInvoice: (data: {
    unit_id: number; resident_id: string;
    billing_period: string;
    invoice_date: string; due_date: string;
    line_items: Array<{
      maintenance_head_id: string; description: string;
      quantity: number; rate: number; gst_rate: number;
    }>;
  }) => apiClient.post<Invoice>('/invoices', data),
  getPaymentsByInvoice: (id: string) => apiClient.get(`/invoices/${id}/payments`),
  recordPayment: (id: string, data: {
    amount: number; payment_mode: string; idempotency_key: string;
  }) => apiClient.post(`/invoices/${id}/payments`, data),
  getMaintenanceHeads: () => apiClient.get<MaintenanceHead[]>('/maintenance-heads'),
  createMaintenanceHead: (data: {
    head_name: string; head_type: string; calculation_basis: string;
    amount: number; frequency: string; gst_applicable?: boolean; gst_rate?: number;
  }) => apiClient.post<MaintenanceHead>('/maintenance-heads', data),
  updateMaintenanceHead: (id: string, data: Partial<MaintenanceHead>) =>
    apiClient.put<MaintenanceHead>(`/maintenance-heads/${id}`, data),
  deleteMaintenanceHead: (id: string) => apiClient.delete(`/maintenance-heads/${id}`),
  getExpenseCategories: () => apiClient.get('/expense-categories'),
  createExpenseCategory: (data: { society_id: number; category_name: string }) =>
    apiClient.post('/expense-categories', data),
  getExpenses: (params?: { society_id?: number; status?: string }) =>
    apiClient.get<Expense[]>('/expenses', { params }),
  createExpense: (data: {
    category_id: string; expense_date: string; description: string;
    amount: number; gst_amount?: number;
  }) => apiClient.post<Expense>('/expenses', data),
  approveExpense: (id: string) => apiClient.put(`/expenses/${id}/approve`, {}),
};
