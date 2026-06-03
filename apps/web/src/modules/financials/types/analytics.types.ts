export interface FinancialDashboard {
  totalRevenue:    number;
  totalExpenses:   number;
  netSurplus:      number;
  outstandingDues: number;
  collectionRate:  number;
  pendingInvoices: number;
  overdueInvoices: number;
}

export interface TrendPoint {
  period: string;
  value:  number;
}

export interface ExpenseBreakdown {
  headName: string;
  amount:   number;
}

export interface FinancialAnalytics {
  dashboard:        FinancialDashboard;
  revenueTrend:     TrendPoint[];
  expenseTrend:     TrendPoint[];
  expenseBreakdown: ExpenseBreakdown[];
}
