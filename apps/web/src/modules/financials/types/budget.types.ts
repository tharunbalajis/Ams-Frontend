import type { ID, Timestamp } from '@/types/common.types';
import type { ExpenseCategory } from './expense.types';

export type BudgetStatus = 'active' | 'draft' | 'closed' | 'overrun';

export interface BudgetLineItem {
  category:    ExpenseCategory;
  budgeted:    number;
  spent:       number;
  remaining:   number;
  utilization: number;
}

export interface Budget {
  id:          ID;
  period:      string;
  fiscalYear:  string;
  status:      BudgetStatus;
  totalBudget: number;
  totalSpent:  number;
  remaining:   number;
  utilization: number;
  lineItems:   BudgetLineItem[];
  createdAt:   Timestamp;
  updatedAt:   Timestamp;
}
