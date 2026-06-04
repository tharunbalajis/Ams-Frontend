import { z } from 'zod';

export const createStaffSchema = z.object({
  society_id: z.number().int().positive(),
  name:       z.string().min(1).max(150),
  role:       z.enum(['SECURITY', 'HOUSEKEEPING', 'MAINTENANCE', 'VENDOR']),
  mobile:     z.string().min(1).max(15),
  is_active:  z.boolean().optional(),
});

export const updateStaffSchema = createStaffSchema.partial();

export type CreateStaffFormValues = z.infer<typeof createStaffSchema>;
export type UpdateStaffFormValues = z.infer<typeof updateStaffSchema>;
