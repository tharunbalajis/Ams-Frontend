import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type ExpenseStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'PAID' | 'REJECTED';

export interface Expense {
  id:            ID;
  expenseNumber: string;
  headId:        ID;
  headName:      string;
  status:        ExpenseStatus;
  vendor:        string;
  expenseDate:   string;
  amount:        number;
  description:   string;
  approvedBy:    Nullable<string>;
  approvedAt:    Nullable<Timestamp>;
  paidAt:        Nullable<Timestamp>;
  receiptUrl:    Nullable<string>;
  createdAt:     Timestamp;
  updatedAt:     Timestamp;
}

export type ExpenseListItem = Pick<
  Expense,
  | 'id'
  | 'expenseNumber'
  | 'headName'
  | 'status'
  | 'vendor'
  | 'expenseDate'
  | 'amount'
  | 'approvedBy'
>;

export interface CreateExpensePayload {
  headId:      ID;
  vendor:      string;
  expenseDate: string;
  amount:      number;
  description: string;
  receiptUrl?: string;
}

export type UpdateExpensePayload = Partial<CreateExpensePayload>;

export interface ExpenseFiltersParams {
  search?:   string;
  headId?:   ID;
  status?:   ExpenseStatus;
  dateFrom?: string;
  dateTo?:   string;
  page?:     number;
  limit?:    number;
}
