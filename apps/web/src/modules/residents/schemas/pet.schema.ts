import { z } from 'zod';

export const petSchema = z.object({
  name:              z.string().min(1),
  type:              z.enum(['DOG', 'CAT', 'BIRD', 'RABBIT', 'FISH', 'OTHER']),
  breed:             z.string().min(1),
  vaccinationStatus: z.enum(['VACCINATED', 'NOT_VACCINATED', 'EXPIRED']),
  vaccineExpiry:     z.string().optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;
