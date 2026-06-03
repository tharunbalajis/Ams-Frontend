import apiClient from './client';

const BASE = '/financials';

export const financialsApi = {
  getInvoices:        (params?: unknown) => apiClient.get(`${BASE}/invoices`, { params }),
  getInvoiceById:     (id: string)       => apiClient.get(`${BASE}/invoices/${id}`),
  createInvoice:      (payload: unknown) => apiClient.post(`${BASE}/invoices`, payload),
  updateInvoice:      (id: string, payload: unknown) =>
    apiClient.patch(`${BASE}/invoices/${id}`, payload),
  getInvoicePayments: (id: string)       => apiClient.get(`${BASE}/invoices/${id}/payments`),

  getPayments:        (params?: unknown) => apiClient.get(`${BASE}/payments`, { params }),
  getPaymentById:     (id: string)       => apiClient.get(`${BASE}/payments/${id}`),
  createPayment:      (payload: unknown) => apiClient.post(`${BASE}/payments`, payload),

  getExpenses:        (params?: unknown) => apiClient.get(`${BASE}/expenses`, { params }),
  getExpenseById:     (id: string)       => apiClient.get(`${BASE}/expenses/${id}`),
  createExpense:      (payload: unknown) => apiClient.post(`${BASE}/expenses`, payload),
  updateExpense:      (id: string, payload: unknown) =>
    apiClient.patch(`${BASE}/expenses/${id}`, payload),

  getHeads:           (params?: unknown) => apiClient.get(`${BASE}/heads`, { params }),
  getHeadById:        (id: string)       => apiClient.get(`${BASE}/heads/${id}`),
  createHead:         (payload: unknown) => apiClient.post(`${BASE}/heads`, payload),
  updateHead:         (id: string, payload: unknown) =>
    apiClient.patch(`${BASE}/heads/${id}`, payload),
  generateInvoices:   (payload: unknown) =>
    apiClient.post(`${BASE}/heads/generate`, payload),

  getDashboard:       (params?: unknown) => apiClient.get(`${BASE}/dashboard`, { params }),
};
