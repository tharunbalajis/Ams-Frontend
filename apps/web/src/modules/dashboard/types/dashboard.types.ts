import type {
  ResidentMetrics,
  UnitMetrics,
  VisitorMetrics,
  ComplaintMetrics,
  FinancialMetrics,
  StaffMetrics,
  AssetMetrics,
  MeetingMetrics,
} from './metrics.types';

export type DashboardPeriod = 'today' | 'week' | 'month' | 'quarter' | 'year';

export interface DashboardFilters {
  period?:   DashboardPeriod;
  dateFrom?: string;
  dateTo?:   string;
}

export interface DashboardSummary {
  residents:  ResidentMetrics;
  units:      UnitMetrics;
  visitors:   VisitorMetrics;
  complaints: ComplaintMetrics;
  financials: FinancialMetrics;
  staff:      StaffMetrics;
  assets:     AssetMetrics;
  meetings:   MeetingMetrics;
}

export interface QuickAction {
  key:          string;
  label:        string;
  description?: string;
  href:         string;
  permission?:  string;
}
