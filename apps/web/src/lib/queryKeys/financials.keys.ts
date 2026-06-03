export const financialKeys = {
  all:       ['financials']                                                                         as const,
  dashboard: ()           => [...financialKeys.all, 'dashboard']                                   as const,
  invoices: {
<<<<<<< HEAD
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
=======
    lists:   () => [...financialKeys.all, 'invoices', 'list']             as const,
    list:    (params?: unknown) => [...financialKeys.invoices.lists(), params] as const,
    detail:  (id: string) => [...financialKeys.all, 'invoices', 'detail', id] as const,
  },
  payments: {
    lists:   () => [...financialKeys.all, 'payments', 'list']             as const,
    list:    (params?: unknown) => [...financialKeys.payments.lists(), params] as const,
    detail:  (id: string) => [...financialKeys.all, 'payments', 'detail', id] as const,
  },
  expenses: {
    lists:   () => [...financialKeys.all, 'expenses', 'list']             as const,
    list:    (params?: unknown) => [...financialKeys.expenses.lists(), params] as const,
    detail:  (id: string) => [...financialKeys.all, 'expenses', 'detail', id] as const,
>>>>>>> d852c2e (final)
  },
};
