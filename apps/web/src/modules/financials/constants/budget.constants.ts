export const BUDGET_STATUS_COLOR: Record<string, string> = {
  draft:    'secondary',
  approved: 'outline',
  active:   'success',
  closed:   'secondary',
};

export const BUDGET_UTILIZATION_THRESHOLDS = {
  WARNING:  75,
  CRITICAL: 90,
} as const;
