import type { ID, Nullable, Timestamp } from '@/types/common.types';
import type { VisitorType } from './visitor.types';

export type InviteStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'USED';

export interface Invite {
  id:            ID;
  residentId:    ID;
  residentName:  string;
  unitNumber:    string;
  visitorName:   string;
  visitorMobile: string;
  visitorType:   VisitorType;
  validFrom:     string;
  validUntil:    string;
  status:        InviteStatus;
  qrCode:        Nullable<string>;
  createdAt:     Timestamp;
  updatedAt:     Timestamp;
}

export interface CreateInvitePayload {
  visitorName:   string;
  visitorMobile: string;
  visitorType:   VisitorType;
  validFrom:     string;
  validUntil:    string;
}
