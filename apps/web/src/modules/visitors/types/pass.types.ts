import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type PassStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED';

export interface VisitorPass {
  id:            ID;
  visitorId:     ID;
  visitorName:   string;
  unitNumber:    string;
  issueDate:     string;
  expiryDate:    Nullable<string>;
  status:        PassStatus;
  qrCode:        string;
  issuedBy:      string;
  createdAt:     Timestamp;
}
