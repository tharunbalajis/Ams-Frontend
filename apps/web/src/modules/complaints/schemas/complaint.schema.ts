import { z } from 'zod';

export const createComplaintSchema = z.object({
  title:         z.string().min(5),
  category:      z.enum(['maintenance', 'electrical', 'plumbing', 'security', 'housekeeping', 'parking', 'noise', 'amenities', 'other']),
  type:          z.enum(['general', 'urgent', 'repeat', 'anonymous']),
  priority:      z.enum(['low', 'medium', 'high', 'critical']),
  description:   z.string().min(10),
  residentId:    z.string().min(1),
  complaintDate: z.string().min(1),
  attachments:   z.array(z.string()).optional(),
  tags:          z.array(z.string()).optional(),
});

export const updateComplaintSchema = createComplaintSchema.partial().extend({
  status: z.enum(['open', 'assigned', 'in_progress', 'on_hold', 'resolved', 'closed', 'escalated']).optional(),
});

export type CreateComplaintFormValues = z.infer<typeof createComplaintSchema>;
export type UpdateComplaintFormValues = z.infer<typeof updateComplaintSchema>;
