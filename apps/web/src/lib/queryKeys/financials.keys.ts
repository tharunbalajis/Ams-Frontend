export const financialKeys = {
  all:      ['financials'] as const,
  invoices: {
    lists:   () => [...financialKeys.all, 'invoices', 'list']             as const,
    list:    (params?: Record<string, unknown>) => [...financialKeys.invoices.lists(), params] as const,
    detail:  (id: string) => [...financialKeys.all, 'invoices', 'detail', id] as const,
  },
  payments: {
    lists:   () => [...financialKeys.all, 'payments', 'list']             as const,
    list:    (params?: Record<string, unknown>) => [...financialKeys.payments.lists(), params] as const,
    detail:  (id: string) => [...financialKeys.all, 'payments', 'detail', id] as const,
  },
  expenses: {
    lists:   () => [...financialKeys.all, 'expenses', 'list']             as const,
    list:    (params?: Record<string, unknown>) => [...financialKeys.expenses.lists(), params] as const,
    detail:  (id: string) => [...financialKeys.all, 'expenses', 'detail', id] as const,
  },
  summary:  () => [...financialKeys.all, 'summary'] as const,
};
