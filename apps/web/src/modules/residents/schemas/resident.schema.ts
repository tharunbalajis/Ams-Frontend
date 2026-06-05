import { z } from 'zod';

export const createResidentSchema = z.object({
  full_name:     z.string().min(1, 'Full name is required'),
  mobile_primary: z.string().min(10, 'Mobile number is required'),
  unit_id:       z.string().min(1, 'Unit is required'),
  move_in_date:  z.string().min(1, 'Move-in date is required'),
  resident_type: z.enum(['OWNER', 'TENANT', 'FAMILY']).optional(),
  relationship:  z.enum(['PRIMARY', 'SPOUSE', 'CHILD', 'PARENT', 'DEPENDENT']).optional(),
  email:         z.string().email().optional().or(z.literal('')),
  mobile_secondary: z.string().optional(),
});

export const updateResidentSchema = createResidentSchema.partial();

export type CreateResidentFormValues = z.infer<typeof createResidentSchema>;
export type UpdateResidentFormValues = z.infer<typeof updateResidentSchema>;
