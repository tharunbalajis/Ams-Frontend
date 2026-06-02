import { z } from 'zod';

export const petSchema = z.object({
  name:              z.string(),
  type:              z.enum(['dog', 'cat', 'bird', 'other']),
  breed:             z.string(),
  vaccinationStatus: z.enum(['vaccinated', 'not_vaccinated', 'expired']),
  vaccineExpiry:     z.string().optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;
