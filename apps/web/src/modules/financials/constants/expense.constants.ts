import type { ExpenseCategory, ExpenseStatus } from '../types/expense.types';

export const EXPENSE_CATEGORY_OPTIONS: { label: string; value: ExpenseCategory }[] = [
  { label: 'Maintenance',  value: 'maintenance' },
  { label: 'Utilities',    value: 'utilities' },
  { label: 'Security',     value: 'security' },
  { label: 'Housekeeping', value: 'housekeeping' },
  { label: 'Repairs',      value: 'repairs' },
  { label: 'Admin',        value: 'admin' },
  { label: 'Landscaping',  value: 'landscaping' },
  { label: 'Amenities',    value: 'amenities' },
  { label: 'Insurance',    value: 'insurance' },
  { label: 'Other',        value: 'other' },
];

export const EXPENSE_STATUS_OPTIONS: { label: string; value: ExpenseStatus }[] = [
  { label: 'Draft',            value: 'draft' },
  { label: 'Pending Approval', value: 'pending_approval' },
  { label: 'Approved',         value: 'approved' },
  { label: 'Paid',             value: 'paid' },
  { label: 'Rejected',         value: 'rejected' },
];

export const EXPENSE_STATUS_COLOR: Record<ExpenseStatus, string> = {
  draft:            'secondary',
  pending_approval: 'warning',
  approved:         'success',
  paid:             'success',
  rejected:         'destructive',
};
