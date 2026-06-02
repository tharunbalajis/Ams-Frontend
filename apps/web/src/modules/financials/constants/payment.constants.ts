import type { PaymentMethod, PaymentStatus } from '../types/payment.types';

export const PAYMENT_METHOD_OPTIONS: { label: string; value: PaymentMethod }[] = [
  { label: 'Cash',           value: 'cash' },
  { label: 'UPI',            value: 'upi' },
  { label: 'Bank Transfer',  value: 'bank_transfer' },
  { label: 'Cheque',         value: 'cheque' },
  { label: 'Card',           value: 'card' },
  { label: 'Online Gateway', value: 'online_gateway' },
];

export const PAYMENT_STATUS_OPTIONS: { label: string; value: PaymentStatus }[] = [
  { label: 'Pending',   value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Failed',    value: 'failed' },
  { label: 'Refunded',  value: 'refunded' },
  { label: 'Cancelled', value: 'cancelled' },
];

export const PAYMENT_STATUS_COLOR: Record<PaymentStatus, string> = {
  pending:   'warning',
  completed: 'success',
  failed:    'destructive',
  refunded:  'secondary',
  cancelled: 'outline',
};
