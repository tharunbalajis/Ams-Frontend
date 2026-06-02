import { z } from 'zod';

export const attendanceSchema = z.object({
  staffId:      z.string().min(1),
  date:         z.string().min(1),
  checkInTime:  z.string().optional(),
  status:       z.enum(['present', 'absent', 'late', 'half_day', 'on_leave']),
  notes:        z.string().optional(),
});

export type AttendanceFormValues = z.infer<typeof attendanceSchema>;
