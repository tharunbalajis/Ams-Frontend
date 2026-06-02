import { z } from 'zod';

export const createUnitSchema = z.object({
  unitNumber:    z.string().min(1),
  block:         z.string().min(1),
  floor:         z.number().int().min(0),
  type:          z.enum(['studio', '1bhk', '2bhk', '3bhk', '4bhk', 'penthouse', 'commercial']),
  squareFeet:    z.number().positive(),
  ownershipType: z.enum(['owned', 'rented', 'leased']),
  description:   z.string().optional(),
});

export const updateUnitSchema = createUnitSchema.partial();

export type CreateUnitFormValues = z.infer<typeof createUnitSchema>;
export type UpdateUnitFormValues = z.infer<typeof updateUnitSchema>;
