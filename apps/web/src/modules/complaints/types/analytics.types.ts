export interface CategoryStat {
  category: string;
  count:    number;
  resolved: number;
}

export interface PriorityStat {
  priority: string;
  count:    number;
  breached: number;
}

export interface ComplaintAnalytics {
  total:                  number;
  open:                   number;
  assigned:               number;
  inProgress:             number;
  resolved:               number;
  closed:                 number;
  avgResolutionTimeHours: number;
  byCategory:             CategoryStat[];
  byPriority:             PriorityStat[];
  resolutionTrend:        { date: string; count: number }[];
}
