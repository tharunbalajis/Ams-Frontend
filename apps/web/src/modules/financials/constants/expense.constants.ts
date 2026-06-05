import type { ExpenseStatus } from '../types/expense.types';

export const EXPENSE_STATUS_OPTIONS: { label: string; value: ExpenseStatus }[] = [
  { label: 'Pending',  value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
];

export const EXPENSE_STATUS_COLOR: Record<ExpenseStatus, string> = {
  PENDING:  'warning',
  APPROVED: 'success',
  REJECTED: 'destructive',
};
