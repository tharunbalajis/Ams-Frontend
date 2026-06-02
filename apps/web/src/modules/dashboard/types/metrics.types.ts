export interface TrendValue {
  value:     number;
  direction: 'up' | 'down' | 'neutral';
  period:    string;
}

export interface ResidentMetrics {
  total:    number;
  active:   number;
  new:      number;
  moveIns:  number;
  moveOuts: number;
  trend:    TrendValue;
}

export interface UnitMetrics {
  total:     number;
  occupied:  number;
  vacant:    number;
  occupancy: number;
  trend:     TrendValue;
}

export interface VisitorMetrics {
  total:  number;
  active: number;
  today:  number;
  trend:  TrendValue;
}

export interface ComplaintMetrics {
  total:      number;
  open:       number;
  inProgress: number;
  resolved:   number;
  trend:      TrendValue;
}

export interface FinancialMetrics {
  monthlyCollection: number;
  pendingPayments:   number;
  overdueAmount:     number;
  collectionRate:    number;
  trend:             TrendValue;
}

export interface StaffMetrics {
  total:   number;
  active:  number;
  onLeave: number;
  trend:   TrendValue;
}

export interface AssetMetrics {
  total:       number;
  operational: number;
  maintenance: number;
  retired:     number;
  trend:       TrendValue;
}

export interface MeetingMetrics {
  upcoming:  number;
  thisMonth: number;
  completed: number;
  trend:     TrendValue;
}

export interface KPIMetric {
  key:          string;
  label:        string;
  value:        string | number;
  unit?:        string;
  description?: string;
  trend?:       TrendValue;
  loading?:     boolean;
}
