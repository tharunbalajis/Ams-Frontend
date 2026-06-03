import type { InvoiceStatus, InvoiceType } from '../types/invoice.types';

export const INVOICE_STATUS_OPTIONS: { label: string; value: InvoiceStatus }[] = [
  { label: 'Draft',          value: 'DRAFT' },
  { label: 'Pending',        value: 'PENDING' },
  { label: 'Partially Paid', value: 'PARTIALLY_PAID' },
  { label: 'Paid',           value: 'PAID' },
  { label: 'Overdue',        value: 'OVERDUE' },
  { label: 'Cancelled',      value: 'CANCELLED' },
];

export const INVOICE_STATUS_COLOR: Record<InvoiceStatus, string> = {
  DRAFT:          'secondary',
  PENDING:        'warning',
  PARTIALLY_PAID: 'warning',
  PAID:           'success',
  OVERDUE:        'destructive',
  CANCELLED:      'outline',
};

export const INVOICE_TYPE_OPTIONS: { label: string; value: InvoiceType }[] = [
  { label: 'Monthly Maintenance', value: 'MAINTENANCE' },
  { label: 'Special Assessment',  value: 'SPECIAL_ASSESSMENT' },
  { label: 'Penalty',             value: 'PENALTY' },
  { label: 'Late Fee',            value: 'LATE_FEE' },
  { label: 'Miscellaneous',       value: 'MISCELLANEOUS' },
];

export const FINANCIAL_ROUTES = {
  DASHBOARD:      '/financials',
  INVOICES:       '/financials/invoices',
  INVOICE_DETAIL: '/financials/invoices/:id',
  PAYMENTS:       '/financials/payments',
  EXPENSES:       '/financials/expenses',
  HEADS:          '/financials/heads',
} as const;

export const FINANCIAL_PAGE_SIZE = 20;
