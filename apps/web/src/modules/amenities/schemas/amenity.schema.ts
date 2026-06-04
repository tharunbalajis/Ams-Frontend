import { z } from 'zod';

export const createAmenitySchema = z.object({
  society_id:  z.number().int().positive(),
  name:        z.string().min(1).max(150),
  description: z.string().optional(),
  is_active:   z.boolean().optional(),
});

export const updateAmenitySchema = createAmenitySchema.partial();

export type CreateAmenityFormValues = z.infer<typeof createAmenitySchema>;
export type UpdateAmenityFormValues = z.infer<typeof updateAmenitySchema>;
