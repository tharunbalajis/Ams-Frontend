import { z } from 'zod';

export const resolutionSchema = z.object({
  resolutionNotes:   z.string().min(10),
  rootCause:         z.string().optional(),
  preventiveMeasure: z.string().optional(),
  closeAfterResolve: z.boolean().default(false),
});

export type ResolutionFormValues = z.infer<typeof resolutionSchema>;
