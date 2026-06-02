import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type SLAStatus = 'on_track' | 'at_risk' | 'breached' | 'met';

export interface SLA {
  id:              ID;
  complaintId:     ID;
  startTime:       Timestamp;
  dueTime:         Timestamp;
  status:          SLAStatus;
  remainingMinutes: Nullable<number>;
  breachedAt:      Nullable<Timestamp>;
  metAt:           Nullable<Timestamp>;
  pausedAt:        Nullable<Timestamp>;
  totalPausedMinutes: number;
  targetHours:     number;
}

export interface SLAPolicy {
  priority:    string;
  targetHours: number;
  warningAt:   number;
}
