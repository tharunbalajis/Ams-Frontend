import type { InvoiceStatus, InvoiceType } from '../types/invoice.types';

export const INVOICE_STATUS_OPTIONS: { label: string; value: InvoiceStatus }[] = [
  { label: 'Draft',          value: 'draft' },
  { label: 'Pending',        value: 'pending' },
  { label: 'Partially Paid', value: 'partially_paid' },
  { label: 'Paid',           value: 'paid' },
  { label: 'Overdue',        value: 'overdue' },
  { label: 'Cancelled',      value: 'cancelled' },
];

export const INVOICE_STATUS_COLOR: Record<InvoiceStatus, string> = {
  draft:          'secondary',
  pending:        'warning',
  partially_paid: 'warning',
  paid:           'success',
  overdue:        'destructive',
  cancelled:      'outline',
};

export const INVOICE_TYPE_OPTIONS: { label: string; value: InvoiceType }[] = [
  { label: 'Monthly Maintenance',  value: 'maintenance' },
  { label: 'Special Assessment',   value: 'special_assessment' },
  { label: 'Penalty',              value: 'penalty' },
  { label: 'Late Fee',             value: 'late_fee' },
  { label: 'Miscellaneous',        value: 'miscellaneous' },
];

export const FINANCIAL_ROUTES = {
  DASHBOARD:  '/financials',
  INVOICES:   '/financials/invoices',
  INVOICE_DETAIL: '/financials/invoices/:id',
  PAYMENTS:   '/financials/payments',
  EXPENSES:   '/financials/expenses',
  COLLECTIONS:'/financials/collections',
  DEFAULTERS: '/financials/defaulters',
  REPORTS:    '/financials/reports',
  BUDGETS:    '/financials/budgets',
} as const;

export const FINANCIAL_PAGE_SIZE = 20;
