import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type SOSAlertType   = 'medical' | 'fire' | 'security' | 'intrusion' | 'other';
export type SOSAlertStatus = 'active' | 'acknowledged' | 'resolved' | 'false_alarm';

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
  type:        SOSAlertType;
  location:    string;
  description?: string;
}

export interface ResolveSOSAlertPayload {
  status:           SOSAlertStatus;
  resolutionNotes?: string;
}
