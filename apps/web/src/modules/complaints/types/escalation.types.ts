import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type EscalationLevel  = 1 | 2 | 3;
export type EscalationStatus = 'pending' | 'acknowledged' | 'resolved';

export interface Escalation {
  id:            ID;
  complaintId:   ID;
  level:         EscalationLevel;
  escalatedTo:   string;
  escalatedToId: ID;
  reason:        string;
  status:        EscalationStatus;
  escalatedAt:   Timestamp;
  acknowledgedAt: Nullable<Timestamp>;
  resolvedAt:    Nullable<Timestamp>;
  notes:         Nullable<string>;
}

export interface CreateEscalationPayload {
  complaintId:   ID;
  level:         EscalationLevel;
  escalatedToId: ID;
  reason:        string;
  notes?:        string;
}
