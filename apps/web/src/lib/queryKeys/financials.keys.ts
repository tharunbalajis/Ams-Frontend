export const financialKeys = {
  all:       ['financials']                                                                         as const,
  dashboard: ()           => [...financialKeys.all, 'dashboard']                                   as const,
  invoices: {
    all:     ()           => [...financialKeys.all, 'invoices']                                    as const,
    lists:   ()           => [...financialKeys.invoices.all(), 'list']                             as const,
    list:    (params?:    Record<string, unknown>) => [...financialKeys.invoices.lists(), params]   as const,
    detail:  (id: string) => [...financialKeys.invoices.all(), 'detail', id]                       as const,
    payments:(id: string) => [...financialKeys.invoices.all(), 'payments', id]                     as const,
  },
  payments: {
    all:     ()           => [...financialKeys.all, 'payments']                                    as const,
    lists:   ()           => [...financialKeys.payments.all(), 'list']                             as const,
    list:    (params?:    Record<string, unknown>) => [...financialKeys.payments.lists(), params]   as const,
    detail:  (id: string) => [...financialKeys.payments.all(), 'detail', id]                       as const,
  },
  expenses: {
    all:     ()           => [...financialKeys.all, 'expenses']                                    as const,
    lists:   ()           => [...financialKeys.expenses.all(), 'list']                             as const,
    list:    (params?:    Record<string, unknown>) => [...financialKeys.expenses.lists(), params]   as const,
    detail:  (id: string) => [...financialKeys.expenses.all(), 'detail', id]                       as const,
  },
  heads: {
    all:     ()           => [...financialKeys.all, 'heads']                                       as const,
    lists:   ()           => [...financialKeys.heads.all(), 'list']                                as const,
    list:    (params?:    Record<string, unknown>) => [...financialKeys.heads.lists(), params]      as const,
    detail:  (id: string) => [...financialKeys.heads.all(), 'detail', id]                          as const,
  },
};
