export type BudgetStatus = 'draft' | 'approved' | 'active' | 'closed';

export interface BudgetLineItem {
  category: string;
  budgeted: number;
  spent:    number;
}

export interface Budget {
  id:          string;
  period:      string;
  fiscalYear:  string;
  status:      BudgetStatus;
  totalBudget: number;
  totalSpent:  number;
  remaining:   number;
  utilization: number;
  lineItems:   BudgetLineItem[];
}
