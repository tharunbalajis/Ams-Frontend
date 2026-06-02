import { z } from 'zod';

export const escalationSchema = z.object({
  level:         z.union([z.literal(1), z.literal(2), z.literal(3)]),
  escalatedToId: z.string().min(1),
  reason:        z.string().min(10),
  notes:         z.string().optional(),
});

export type EscalationFormValues = z.infer<typeof escalationSchema>;
