import { z } from 'zod';

export const createPaymentSchema = z.object({
  invoiceId:      z.string().min(1),
  paymentDate:    z.string().min(1),
  method:         z.enum(['CASH', 'UPI', 'BANK_TRANSFER', 'CHEQUE', 'CARD', 'ONLINE_GATEWAY']),
  amount:         z.number().positive(),
  transactionRef: z.string().optional(),
  remarks:        z.string().optional(),
});

export type CreatePaymentFormValues = z.infer<typeof createPaymentSchema>;
