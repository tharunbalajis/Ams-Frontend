import { z } from 'zod';

export const assignmentSchema = z.object({
  assignedToId:            z.string().min(1),
  teamId:                  z.string().optional(),
  expectedResolutionDate:  z.string().optional(),
  notes:                   z.string().optional(),
});

export type AssignmentFormValues = z.infer<typeof assignmentSchema>;
