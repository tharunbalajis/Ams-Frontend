import { z } from 'zod';

export const slaPolicySchema = z.object({
  priority:    z.enum(['low', 'medium', 'high', 'critical']),
  targetHours: z.number().positive(),
  warningAt:   z.number().min(0).max(100),
});

export type SLAPolicyFormValues = z.infer<typeof slaPolicySchema>;
