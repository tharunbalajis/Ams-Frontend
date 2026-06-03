import { z } from 'zod';

export const createSOSSchema = z.object({
  type:        z.enum(['MEDICAL', 'FIRE', 'SECURITY', 'INTRUSION', 'OTHER']),
  location:    z.string().min(1),
  description: z.string().optional(),
});

export const resolveSOSSchema = z.object({
  status:          z.enum(['ACKNOWLEDGED', 'RESOLVED', 'FALSE_ALARM']),
  resolutionNotes: z.string().optional(),
});

export type CreateSOSFormValues  = z.infer<typeof createSOSSchema>;
export type ResolveSOSFormValues = z.infer<typeof resolveSOSSchema>;
