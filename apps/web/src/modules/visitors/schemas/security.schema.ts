import { z } from 'zod';

export const otpVerificationSchema = z.object({
  visitorId: z.string().min(1),
  otp:       z.string().length(6),
});

export const qrVerificationSchema = z.object({
  qrCode: z.string().min(1),
  gateId: z.string().optional(),
});

export type OTPVerificationFormValues = z.infer<typeof otpVerificationSchema>;
export type QRVerificationFormValues  = z.infer<typeof qrVerificationSchema>;
