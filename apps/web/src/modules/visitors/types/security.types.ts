import type { ID, Timestamp } from '@/types/common.types';

export type VerificationMethod = 'QR' | 'OTP' | 'MANUAL' | 'PRE_APPROVED';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'FAILED' | 'EXPIRED';

export interface SecurityVerification {
  id:         ID;
  visitorId:  ID;
  method:     VerificationMethod;
  status:     VerificationStatus;
  verifiedBy: string;
  verifiedAt: Timestamp;
  gateNumber: string;
  notes?:     string;
}

export interface GuestVerification {
  visitorId: ID;
  code:      string;
  expiresAt: string;
  method:    'QR' | 'OTP';
  isUsed:    boolean;
}
