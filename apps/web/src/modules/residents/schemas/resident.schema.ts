import { z } from 'zod';

const emergencyContactSchema = z.object({
  name:         z.string(),
  relationship: z.string(),
  phone:        z.string(),
  email:        z.string().optional(),
});

export const createResidentSchema = z.object({
  type:             z.enum(['owner', 'tenant']),
  firstName:        z.string(),
  lastName:         z.string(),
  email:            z.string(),
  phone:            z.string(),
  dateOfBirth:      z.string().optional(),
  gender:           z.enum(['male', 'female', 'other']).optional(),
  unitId:           z.string(),
  emergencyContact: emergencyContactSchema,
});

export const updateResidentSchema = createResidentSchema.partial().omit({ unitId: true });

export type CreateResidentFormValues = z.infer<typeof createResidentSchema>;
export type UpdateResidentFormValues = z.infer<typeof updateResidentSchema>;
export type EmergencyContactFormValues = z.infer<typeof emergencyContactSchema>;
