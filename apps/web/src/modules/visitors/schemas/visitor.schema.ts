import { z } from 'zod';

export const createVisitorSchema = z.object({
  name:              z.string().min(1),
  mobile:            z.string().min(10),
  type:              z.enum(['guest', 'delivery', 'service_provider', 'vendor', 'maintenance', 'emergency']),
  purposeOfVisit:    z.string().min(1),
  residentId:        z.string().min(1),
  vehicleNumber:     z.string().optional(),
  idProof:           z.string().optional(),
  expectedEntryTime: z.string().min(1),
  expectedExitTime:  z.string().optional(),
});

export const preApproveVisitorSchema = z.object({
  visitorName:   z.string().min(1),
  visitorMobile: z.string().min(10),
  residentId:    z.string().min(1),
  validUntil:    z.string().min(1),
});

export type CreateVisitorFormValues    = z.infer<typeof createVisitorSchema>;
export type PreApproveVisitorFormValues = z.infer<typeof preApproveVisitorSchema>;
