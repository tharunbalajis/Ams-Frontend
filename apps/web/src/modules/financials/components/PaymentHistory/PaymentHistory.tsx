import { Badge } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { PAYMENT_STATUS_COLOR } from '../../constants/payment.constants';
import type { PaymentListItem, PaymentStatus } from '../../types/payment.types';

export interface PaymentHistoryProps {
  payments: PaymentListItem[];
  loading?: boolean;
}

export function PaymentHistory({ payments, loading }: PaymentHistoryProps) {
  if (loading) return <p className="text-sm text-muted-foreground">Loading payments…</p>;
  if (payments.length === 0) return <p className="text-sm text-muted-foreground">No payments recorded.</p>;

  return (
    <ul className="divide-y">
      {payments.map((p) => {
        const statusVariant = PAYMENT_STATUS_COLOR[p.status as PaymentStatus] as 'success' | 'destructive' | 'warning' | 'secondary' | 'outline';
        return (
          <li key={p.id} className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">{p.paymentNumber}</p>
              <p className="text-xs text-muted-foreground">{formatDate(p.paymentDate)} · {p.method.replace('_', ' ')}</p>
              {p.transactionRef && <p className="text-xs text-muted-foreground">Ref: {p.transactionRef}</p>}
            </div>
            <div className="text-right">
              <p className="font-semibold">₹{p.amount.toLocaleString()}</p>
              <Badge variant={statusVariant}>{p.status}</Badge>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
