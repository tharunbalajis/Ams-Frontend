import type { InvoiceStatus } from '../types/invoice.types';

export const INVOICE_STATUS_OPTIONS: { label: string; value: InvoiceStatus }[] = [
  { label: 'Pending',   value: 'PENDING' },
  { label: 'Paid',      value: 'PAID' },
  { label: 'Overdue',   value: 'OVERDUE' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

export const INVOICE_STATUS_COLOR: Record<InvoiceStatus, string> = {
  PENDING:   'warning',
  PAID:      'success',
  OVERDUE:   'destructive',
  CANCELLED: 'outline',
};

export const INVOICE_TYPE_OPTIONS: { label: string; value: string }[] = [];

export const FINANCIAL_ROUTES = {
  DASHBOARD:      '/financials',
  INVOICES:       '/financials/invoices',
  INVOICE_DETAIL: '/financials/invoices/:id',
  PAYMENTS:       '/financials/payments',
  EXPENSES:       '/financials/expenses',
  HEADS:          '/financials/heads',
} as const;

export const FINANCIAL_PAGE_SIZE = 20;
