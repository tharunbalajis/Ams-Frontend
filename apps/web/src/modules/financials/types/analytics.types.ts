export interface FinancialKPI {
  totalRevenue:         number;
  totalExpenses:        number;
  netSurplus:           number;
  outstandingDues:      number;
  collectionRate:       number;
  defaulterCount:       number;
  monthlyRevenue:       number;
  monthlyExpenses:      number;
}

export interface TrendPoint {
  period: string;
  value:  number;
}

export interface FinancialAnalytics {
  kpi:                FinancialKPI;
  revenueTrend:       TrendPoint[];
  expenseTrend:       TrendPoint[];
  collectionTrend:    TrendPoint[];
  agingBuckets:       { label: string; amount: number; count: number }[];
  expenseBreakdown:   { category: string; amount: number }[];
}
