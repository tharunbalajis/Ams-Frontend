import type { ID, Timestamp } from '@/types/common.types';
import type { OccupancyStatus } from './unit.types';

export interface OccupancyRecord {
  id:         ID;
  unitId:     ID;
  status:     OccupancyStatus;
  startDate:  string;
  endDate?:   string;
  notes?:     string;
  createdBy:  string;
  createdAt:  Timestamp;
  updatedAt:  Timestamp;
}

export interface UpdateOccupancyPayload {
  status:     OccupancyStatus;
  startDate:  string;
  endDate?:   string;
  notes?:     string;
}

export interface OccupancyHistory {
  unitId:  ID;
  records: OccupancyRecord[];
}
