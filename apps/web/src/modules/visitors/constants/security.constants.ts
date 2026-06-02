import type { VerificationMethod, VerificationStatus } from '../types/security.types';

export const VERIFICATION_METHOD_OPTIONS: { label: string; value: VerificationMethod }[] = [
  { label: 'QR Code',      value: 'qr' },
  { label: 'OTP',          value: 'otp' },
  { label: 'Manual',       value: 'manual' },
  { label: 'Pre-Approved', value: 'pre_approved' },
];

export const VERIFICATION_STATUS_COLOR: Record<VerificationStatus, string> = {
  pending:  'warning',
  verified: 'success',
  failed:   'destructive',
  expired:  'secondary',
};

export const OTP_EXPIRY_MINUTES = 10;
export const QR_EXPIRY_HOURS    = 24;
