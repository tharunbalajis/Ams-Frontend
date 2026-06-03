import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type SOSAlertType   = 'MEDICAL' | 'FIRE' | 'SECURITY' | 'INTRUSION' | 'OTHER';
export type SOSAlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED' | 'FALSE_ALARM';

export interface SOSAlert {
  id:              ID;
  type:            SOSAlertType;
  status:          SOSAlertStatus;
  raisedBy:        string;
  raisedById:      ID;
  location:        string;
  description:     Nullable<string>;
  acknowledgedBy:  Nullable<string>;
  acknowledgedAt:  Nullable<Timestamp>;
  resolvedBy:      Nullable<string>;
  resolvedAt:      Nullable<Timestamp>;
  resolutionNotes: Nullable<string>;
  createdAt:       Timestamp;
  updatedAt:       Timestamp;
}

export interface CreateSOSAlertPayload {
  type:         SOSAlertType;
  location:     string;
  description?: string;
}

export interface ResolveSOSAlertPayload {
  status:           SOSAlertStatus;
  resolutionNotes?: string;
}
