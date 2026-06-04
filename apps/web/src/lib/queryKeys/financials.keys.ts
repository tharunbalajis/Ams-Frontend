export const financialKeys = {
  all: ['financials'] as const,

  dashboard: () =>
    [...financialKeys.all, 'dashboard'] as const,

  invoices: {
    all: () =>
      [...financialKeys.all, 'invoices'] as const,

    lists: () =>
      [...financialKeys.invoices.all(), 'list'] as const,

    list: (params?: unknown) =>
      [...financialKeys.invoices.lists(), params] as const,

    details: () =>
      [...financialKeys.invoices.all(), 'detail'] as const,

    detail: (id: string) =>
      [...financialKeys.invoices.details(), id] as const,

    payments: (invoiceId: string) =>
      [...financialKeys.invoices.detail(invoiceId), 'payments'] as const,
  },

  payments: {
    all: () =>
      [...financialKeys.all, 'payments'] as const,

    lists: () =>
      [...financialKeys.payments.all(), 'list'] as const,

    list: (params?: unknown) =>
      [...financialKeys.payments.lists(), params] as const,

    details: () =>
      [...financialKeys.payments.all(), 'detail'] as const,

    detail: (id: string) =>
      [...financialKeys.payments.details(), id] as const,
  },

  expenses: {
    all: () =>
      [...financialKeys.all, 'expenses'] as const,

    lists: () =>
      [...financialKeys.expenses.all(), 'list'] as const,

    list: (params?: unknown) =>
      [...financialKeys.expenses.lists(), params] as const,

    details: () =>
      [...financialKeys.expenses.all(), 'detail'] as const,

    detail: (id: string) =>
      [...financialKeys.expenses.details(), id] as const,
  },

  heads: {
    all: () =>
      [...financialKeys.all, 'heads'] as const,

    lists: () =>
      [...financialKeys.heads.all(), 'list'] as const,

    list: (params?: unknown) =>
      [...financialKeys.heads.lists(), params] as const,

    details: () =>
      [...financialKeys.heads.all(), 'detail'] as const,

    detail: (id: string) =>
      [...financialKeys.heads.details(), id] as const,
  },
};
