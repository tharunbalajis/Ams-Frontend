export type ExpenseStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Expense {
  id:           string;
  society_id:   number;
  category_id:  string;
  expense_date: string;
  description:  string;
  amount:       number;
  gst_amount:   number;
  status:       ExpenseStatus;
  is_active:    boolean;
  created_at:   string;
}

export type ExpenseListItem = Expense;

export interface CreateExpensePayload {
  category_id:  string;
  expense_date: string;
  description:  string;
  amount:       number;
  gst_amount?:  number;
}

export type UpdateExpensePayload = Partial<CreateExpensePayload>;

export interface ExpenseFiltersParams {
  society_id?: number;
  status?:     ExpenseStatus;
  search?:     string;
  page?:       number;
  limit?:      number;
}
