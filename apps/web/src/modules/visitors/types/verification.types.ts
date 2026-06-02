import type { ID } from '@/types/common.types';

export interface QRVerificationPayload {
  qrCode:   string;
  gateId?:  string;
}

export interface OTPVerificationPayload {
  visitorId: ID;
  otp:       string;
}

export interface VerificationResult {
  success:     boolean;
  visitorId?:  ID;
  visitorName?: string;
  message:     string;
}
