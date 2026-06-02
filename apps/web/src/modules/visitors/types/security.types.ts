import type { ID, Timestamp } from '@/types/common.types';

export type VerificationMethod = 'qr' | 'otp' | 'manual' | 'pre_approved';
export type VerificationStatus = 'pending' | 'verified' | 'failed' | 'expired';

export interface SecurityVerification {
  id:               ID;
  visitorId:        ID;
  method:           VerificationMethod;
  status:           VerificationStatus;
  verifiedBy:       string;
  verifiedAt:       Timestamp;
  gateNumber:       string;
  notes?:           string;
}

export interface GuestVerification {
  visitorId:  ID;
  code:       string;
  expiresAt:  string;
  method:     'qr' | 'otp';
  isUsed:     boolean;
}
