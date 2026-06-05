import { z } from 'zod';

export const createUnitSchema = z.object({
  unit_number:   z.string().min(1, 'Unit number is required'),
  unit_type:     z.enum(['STUDIO', '1BHK', '2BHK', '3BHK']),
  block_id:      z.string().optional(),
  floor_number:  z.string().optional(),
  ownership_type: z.enum(['OWNED', 'RENTED', 'VACANT']).optional(),
  super_built_up: z.string().optional(),
  carpet_area:   z.string().optional(),
  parking_slots: z.string().optional(),
});

export const updateUnitSchema = createUnitSchema.partial();

export type CreateUnitFormValues = z.infer<typeof createUnitSchema>;
export type UpdateUnitFormValues = z.infer<typeof updateUnitSchema>;
