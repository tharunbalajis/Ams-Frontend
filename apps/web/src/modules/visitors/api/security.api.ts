import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { SecurityVerification, GuestVerification } from '../types/security.types';
import type { VerificationResult, QRVerificationPayload, OTPVerificationPayload } from '../types/verification.types';

const BASE = '/visitors/security';

export const securityApi = {
  verifyQR: (payload: QRVerificationPayload) =>
    apiClient.post<ApiResponse<VerificationResult>>(`${BASE}/verify/qr`, payload).then((r) => r.data),

  verifyOTP: (payload: OTPVerificationPayload) =>
    apiClient.post<ApiResponse<VerificationResult>>(`${BASE}/verify/otp`, payload).then((r) => r.data),

  generateOTP: (visitorId: string) =>
    apiClient.post<ApiResponse<GuestVerification>>(`${BASE}/otp/${visitorId}`).then((r) => r.data),

  generateQR: (visitorId: string) =>
    apiClient.post<ApiResponse<GuestVerification>>(`${BASE}/qr/${visitorId}`).then((r) => r.data),

  getVerification: (visitorId: string) =>
    apiClient.get<ApiResponse<SecurityVerification>>(`${BASE}/verifications/${visitorId}`).then((r) => r.data),
};
