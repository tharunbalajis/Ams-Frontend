import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type ExpenseCategory =
  | 'maintenance'
  | 'utilities'
  | 'security'
  | 'housekeeping'
  | 'repairs'
  | 'admin'
  | 'landscaping'
  | 'amenities'
  | 'insurance'
  | 'other';

export type ExpenseStatus = 'draft' | 'pending_approval' | 'approved' | 'paid' | 'rejected';

export interface Expense {
  id:              ID;
  expenseNumber:   string;
  category:        ExpenseCategory;
  status:          ExpenseStatus;
  vendor:          string;
  expenseDate:     string;
  amount:          number;
  description:     string;
  approvedBy:      Nullable<string>;
  approvedAt:      Nullable<Timestamp>;
  paidAt:          Nullable<Timestamp>;
  receiptUrl:      Nullable<string>;
  createdAt:       Timestamp;
  updatedAt:       Timestamp;
}

export type ExpenseListItem = Pick<
  Expense,
  | 'id'
  | 'expenseNumber'
  | 'category'
  | 'status'
  | 'vendor'
  | 'expenseDate'
  | 'amount'
  | 'approvedBy'
>;

export interface CreateExpensePayload {
  category:     ExpenseCategory;
  vendor:       string;
  expenseDate:  string;
  amount:       number;
  description:  string;
  receiptUrl?:  string;
}

export type UpdateExpensePayload = Partial<CreateExpensePayload>;

export interface ExpenseFiltersParams {
  search?:    string;
  category?:  ExpenseCategory;
  status?:    ExpenseStatus;
  dateFrom?:  string;
  dateTo?:    string;
  page?:      number;
  pageSize?:  number;
}
