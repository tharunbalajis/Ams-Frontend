import { z } from 'zod';

export const createResidentSchema = z.object({
  full_name:      z.string().min(1, 'Full name is required'),
  mobile_primary: z.string().min(10, 'Mobile number is required'),
  unit_id:        z.coerce.number({ invalid_type_error: 'Unit is required' }).positive('Unit is required'),
  resident_type:  z.enum(['OWNER', 'TENANT'], { required_error: 'Resident type is required' }),
  move_in_date:   z.string().min(1, 'Move-in date is required'),
  move_out_date:  z.string().optional(),
  email:          z.string().email('Invalid email').optional().or(z.literal('')),
}).refine(
  (data) => data.resident_type !== 'TENANT' || (!!data.move_out_date && data.move_out_date.length > 0),
  { message: 'Move-out date is required for tenants', path: ['move_out_date'] }
);

export const updateResidentSchema = z.object({
  full_name:      z.string().min(1).optional(),
  mobile_primary: z.string().min(10).optional(),
  resident_type:  z.enum(['OWNER', 'TENANT']).optional(),
  move_in_date:   z.string().optional(),
  move_out_date:  z.string().optional(),
  email:          z.string().email().optional().or(z.literal('')),
});

export type CreateResidentFormValues = z.infer<typeof createResidentSchema>;
export type UpdateResidentFormValues = z.infer<typeof updateResidentSchema>;
