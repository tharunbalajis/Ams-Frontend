import { z } from 'zod';

export const resetPasswordSchema = z.object({
  token:           z.string(),
  password:        z.string(),
  confirmPassword: z.string(),
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
