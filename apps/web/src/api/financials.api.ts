import apiClient from './client';

export const financialsApi = {
  // Invoices: /invoices (NOT /financials/invoices)
  getInvoices:        (params?: unknown) => apiClient.get('/invoices', { params }),
  getInvoiceById:     (id: string)       => apiClient.get(`/invoices/${id}`),
  createInvoice:      (payload: unknown) => apiClient.post('/invoices', payload),
  updateInvoice:      (id: string, payload: unknown) => apiClient.put(`/invoices/${id}`, payload),
  getInvoicePayments: (id: string)       => apiClient.get(`/invoices/${id}/payments`),
  recordPayment:      (id: string, payload: unknown) => apiClient.post(`/invoices/${id}/payments`, payload),

  // Expenses: /expenses (NOT /financials/expenses)
  getExpenses:        (params?: unknown) => apiClient.get('/expenses', { params }),
  getExpenseById:     (id: string)       => apiClient.get(`/expenses/${id}`),
  createExpense:      (payload: unknown) => apiClient.post('/expenses', payload),
  updateExpense:      (id: string, payload: unknown) => apiClient.put(`/expenses/${id}`, payload),
  approveExpense:     (id: string)       => apiClient.put(`/expenses/${id}/approve`, {}),

  // Maintenance heads: /maintenance-heads (NOT /financials/heads)
  getHeads:           (params?: unknown) => apiClient.get('/maintenance-heads', { params }),
  getHeadById:        (id: string)       => apiClient.get(`/maintenance-heads/${id}`),
  createHead:         (payload: unknown) => apiClient.post('/maintenance-heads', payload),
  updateHead:         (id: string, payload: unknown) => apiClient.put(`/maintenance-heads/${id}`, payload),
  deleteHead:         (id: string)       => apiClient.delete(`/maintenance-heads/${id}`),

  // Dashboard: /finance/dashboard
  getDashboard:       (params?: unknown) => apiClient.get('/finance/dashboard', { params }),
};
