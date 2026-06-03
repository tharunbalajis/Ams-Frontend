import { z } from 'zod';

const emergencyContactSchema = z.object({
  name:         z.string().min(1),
  relationship: z.string().min(1),
  phone:        z.string().min(10),
  email:        z.string().email().optional(),
});

export const createResidentSchema = z.object({
  type:             z.enum(['OWNER', 'TENANT']),
  firstName:        z.string().min(1),
  lastName:         z.string().min(1),
  email:            z.string().email(),
  phone:            z.string().min(10),
  unitId:           z.string().min(1),
  dateOfBirth:      z.string().optional(),
  gender:           z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  emergencyContact: emergencyContactSchema.optional(),
});

export const updateResidentSchema = createResidentSchema.partial().omit({ unitId: true });

export type CreateResidentFormValues  = z.infer<typeof createResidentSchema>;
export type UpdateResidentFormValues  = z.infer<typeof updateResidentSchema>;
export type EmergencyContactFormValues = z.infer<typeof emergencyContactSchema>;
