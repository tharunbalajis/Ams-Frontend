export interface TrendDataPoint {
  date:  string;
  value: number;
  [key: string]: string | number;
}

export interface OccupancyDataPoint {
  month:    string;
  occupied: number;
  vacant:   number;
  total:    number;
  [key: string]: string | number;
}

export interface CollectionDataPoint {
  month:     string;
  collected: number;
  pending:   number;
  overdue:   number;
  [key: string]: string | number;
}

export interface AnalyticsSummary {
  residentTrend:   TrendDataPoint[];
  complaintTrend:  TrendDataPoint[];
  collectionTrend: CollectionDataPoint[];
  occupancyTrend:  OccupancyDataPoint[];
  visitorTrend:    TrendDataPoint[];
}
