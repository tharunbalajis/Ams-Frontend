import type { VerificationMethod, VerificationStatus } from '../types/security.types';

export const VERIFICATION_METHOD_OPTIONS: { label: string; value: VerificationMethod }[] = [
  { label: 'QR Code',      value: 'QR' },
  { label: 'OTP',          value: 'OTP' },
  { label: 'Manual',       value: 'MANUAL' },
  { label: 'Pre-Approved', value: 'PRE_APPROVED' },
];

export const VERIFICATION_STATUS_COLOR: Record<VerificationStatus, string> = {
  PENDING:  'warning',
  VERIFIED: 'success',
  FAILED:   'destructive',
  EXPIRED:  'secondary',
};

export const OTP_EXPIRY_MINUTES = 10;
export const QR_EXPIRY_HOURS    = 24;
