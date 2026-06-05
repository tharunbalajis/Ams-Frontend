import { z } from 'zod';

export const createUnitSchema = z.object({
  unit_number:    z.string().min(1, 'Unit number is required'),
  unit_type:      z.enum(['STUDIO', '1BHK', '2BHK', '3BHK', '4BHK', 'COMMERCIAL'], {
    required_error: 'Unit type is required',
  }),
  block_id:       z.coerce.number().positive().optional(),
  floor_number:   z.coerce.number().optional(),
  super_built_up: z.coerce.number().positive().optional(),
  carpet_area:    z.coerce.number().positive().optional(),
  parking_slots:  z.coerce.number().nonnegative().optional(),
});

export const updateUnitSchema = createUnitSchema.partial();

export type CreateUnitFormValues = z.infer<typeof createUnitSchema>;
export type UpdateUnitFormValues = z.infer<typeof updateUnitSchema>;
