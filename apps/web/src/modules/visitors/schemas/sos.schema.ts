import { z } from 'zod';

export const createSOSSchema = z.object({
  type:        z.enum(['medical', 'fire', 'security', 'intrusion', 'other']),
  location:    z.string().min(1),
  description: z.string().optional(),
});

export const resolveSOSSchema = z.object({
  status:           z.enum(['resolved', 'false_alarm']),
  resolutionNotes:  z.string().optional(),
});

export type CreateSOSFormValues  = z.infer<typeof createSOSSchema>;
export type ResolveSOSFormValues = z.infer<typeof resolveSOSSchema>;
