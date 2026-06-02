import type { BudgetStatus } from '../types/budget.types';

export const BUDGET_STATUS_OPTIONS: { label: string; value: BudgetStatus }[] = [
  { label: 'Active',  value: 'active' },
  { label: 'Draft',   value: 'draft' },
  { label: 'Closed',  value: 'closed' },
  { label: 'Overrun', value: 'overrun' },
];

export const BUDGET_STATUS_COLOR: Record<BudgetStatus, string> = {
  active:  'success',
  draft:   'secondary',
  closed:  'outline',
  overrun: 'destructive',
};

export const BUDGET_UTILIZATION_THRESHOLDS = {
  WARNING:  80,
  CRITICAL: 95,
} as const;
