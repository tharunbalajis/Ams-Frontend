// Dashboard module public API — only import from here, never from sub-paths

// Page — consumed by the router
export { DashboardPage } from './pages/DashboardPage';

// Hooks — for use by app shell if needed
export { useDashboard }        from './hooks/useDashboard';
export { useDashboardMetrics } from './hooks/useDashboardMetrics';

// Types
export type {
  DashboardSummary,
  DashboardFilters,
  DashboardPeriod,
  QuickAction,
}                                from './types/dashboard.types';
export type {
  TrendValue,
  ResidentMetrics,
  UnitMetrics,
  FinancialMetrics,
  KPIMetric,
}                                from './types/metrics.types';
export type { AnalyticsSummary } from './types/analytics.types';

// Constants
export { WIDGET_KEYS, QUICK_ACTIONS } from './constants/dashboard.widgets';
export type { WidgetKey }             from './constants/dashboard.widgets';
