import { z } from 'zod';

export const createUnitSchema = z.object({
  unitNumber:    z.string().min(1),
  block:         z.string().min(1),
  floor:         z.number().int().min(0),
  type:          z.enum(['STUDIO', '1BHK', '2BHK', '3BHK', '4BHK', 'PENTHOUSE', 'DUPLEX', 'COMMERCIAL']),
  squareFeet:    z.number().positive(),
  ownershipType: z.enum(['OWNED', 'RENTED', 'LEASED']),
  description:   z.string().optional(),
});

export const updateUnitSchema = createUnitSchema.partial();

export type CreateUnitFormValues = z.infer<typeof createUnitSchema>;
export type UpdateUnitFormValues = z.infer<typeof updateUnitSchema>;
