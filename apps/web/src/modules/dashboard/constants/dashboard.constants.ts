export const DASHBOARD_REFRESH_INTERVAL = 1000 * 60 * 5; // 5 min
export const DEFAULT_PERIOD = 'month' as const;
export const KPI_CARD_COUNT = 8;

export const PERIOD_OPTIONS = [
  { label: 'Today',   value: 'today'   },
  { label: 'Week',    value: 'week'    },
  { label: 'Month',   value: 'month'   },
  { label: 'Quarter', value: 'quarter' },
  { label: 'Year',    value: 'year'    },
] as const;
