import { z } from 'zod';

const lineItemSchema = z.object({
  maintenance_head_id: z.string().min(1, 'Head ID required'),
  description:         z.string().min(1),
  quantity:            z.number().positive().default(1),
  rate:                z.number().positive(),
  gst_rate:            z.number().min(0).max(28).default(0),
});

export const createInvoiceSchema = z.object({
  unit_id:        z.string().min(1, 'Unit ID is required'),
  resident_id:    z.string().min(1, 'Resident ID is required'),
  billing_period: z.string().regex(/^[A-Z]{3}-[0-9]{4}$/, 'Format: JUN-2026'),
  invoice_date:   z.string().min(1),
  due_date:       z.string().min(1),
  line_items:     z.array(lineItemSchema).min(1, 'At least one line item required'),
});

export const updateInvoiceSchema = z.object({
  due_date: z.string().optional(),
});

export type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceFormValues = z.infer<typeof updateInvoiceSchema>;
