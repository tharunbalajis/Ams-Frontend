import { z } from 'zod';

export const createMeetingSchema = z.object({
  society_id:   z.number().int().positive(),
  title:        z.string().min(1).max(255),
  meeting_type: z.enum(['AGM', 'EGM', 'COMMITTEE']).optional(),
  scheduled_at: z.string().min(1),
  status:       z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).optional(),
});

export const updateMeetingSchema = createMeetingSchema.partial();

export type CreateMeetingFormValues = z.infer<typeof createMeetingSchema>;
export type UpdateMeetingFormValues = z.infer<typeof updateMeetingSchema>;
