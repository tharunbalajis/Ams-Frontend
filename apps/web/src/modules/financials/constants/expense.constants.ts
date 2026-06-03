import type { ExpenseStatus } from '../types/expense.types';

export const EXPENSE_STATUS_OPTIONS: { label: string; value: ExpenseStatus }[] = [
  { label: 'Draft',            value: 'DRAFT' },
  { label: 'Pending Approval', value: 'PENDING_APPROVAL' },
  { label: 'Approved',         value: 'APPROVED' },
  { label: 'Paid',             value: 'PAID' },
  { label: 'Rejected',         value: 'REJECTED' },
];

export const EXPENSE_STATUS_COLOR: Record<ExpenseStatus, string> = {
  DRAFT:            'secondary',
  PENDING_APPROVAL: 'warning',
  APPROVED:         'success',
  PAID:             'success',
  REJECTED:         'destructive',
};
