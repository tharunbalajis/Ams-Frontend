import { z } from 'zod';

export const createNoticeSchema = z.object({
  title:        z.string().min(1).max(255),
  description:  z.string().min(1),
  created_by:   z.string().uuid(),
  notice_type:  z.enum(['GENERAL', 'EMERGENCY', 'MAINTENANCE']).optional(),
});

export const updateNoticeSchema = createNoticeSchema.partial();

export type CreateNoticeFormValues = z.infer<typeof createNoticeSchema>;
export type UpdateNoticeFormValues = z.infer<typeof updateNoticeSchema>;
