import { z } from 'zod';

export const createComplianceSchema = z.object({
  society_id:     z.number().int().positive(),
  document_name:  z.string().min(1).max(255),
  document_type:  z.enum(['REGISTRATION', 'LICENSE', 'NOC', 'AUDIT']),
  expiry_date:    z.string().optional(),
  storage_url:    z.string().url().optional().or(z.literal('')),
  status:         z.enum(['valid', 'expiring_soon', 'expired']).optional(),
});

export const updateComplianceSchema = createComplianceSchema.partial();

export type CreateComplianceFormValues = z.infer<typeof createComplianceSchema>;
export type UpdateComplianceFormValues = z.infer<typeof updateComplianceSchema>;
