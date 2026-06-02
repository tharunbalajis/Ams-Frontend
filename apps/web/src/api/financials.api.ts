import apiClient from './client';

// Financials API — placeholder definitions
// Aligns with backend: modules/financials
// Implement in Phase 2

const BASE = '/financials';

export const financialsApi = {
  // Invoices
  getInvoices: (params?: unknown) => apiClient.get(`${BASE}/invoices`, { params }),
  getInvoiceById: (id: string) => apiClient.get(`${BASE}/invoices/${id}`),
  createInvoice: (payload: unknown) => apiClient.post(`${BASE}/invoices`, payload),
  updateInvoice: (id: string, payload: unknown) =>
    apiClient.patch(`${BASE}/invoices/${id}`, payload),

  // Payments
  getPayments: (params?: unknown) => apiClient.get(`${BASE}/payments`, { params }),
  getPaymentById: (id: string) => apiClient.get(`${BASE}/payments/${id}`),
  createPayment: (payload: unknown) => apiClient.post(`${BASE}/payments`, payload),

  // Expenses
  getExpenses: (params?: unknown) => apiClient.get(`${BASE}/expenses`, { params }),
  getExpenseById: (id: string) => apiClient.get(`${BASE}/expenses/${id}`),
  createExpense: (payload: unknown) => apiClient.post(`${BASE}/expenses`, payload),
  updateExpense: (id: string, payload: unknown) =>
    apiClient.patch(`${BASE}/expenses/${id}`, payload),

  // Summary
  getSummary: (params?: unknown) => apiClient.get(`${BASE}/summary`, { params }),
};
