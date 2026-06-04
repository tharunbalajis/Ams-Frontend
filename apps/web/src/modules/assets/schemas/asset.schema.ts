import { z } from 'zod';

export const createAssetSchema = z.object({
  society_id:         z.number().int().positive(),
  asset_name:         z.string().min(1).max(150),
  asset_type:         z.string().min(1).max(50),
  status:             z.enum(['operational', 'under_maintenance', 'retired']).optional(),
  next_service_date:  z.string().optional(),
});

export const updateAssetSchema = createAssetSchema.partial();

export type CreateAssetFormValues = z.infer<typeof createAssetSchema>;
export type UpdateAssetFormValues = z.infer<typeof updateAssetSchema>;
