import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { INVOICE_STATUS_COLOR } from '../../constants/invoice.constants';
import type { Invoice } from '../../types/invoice.types';

export interface InvoiceSummaryProps {
  invoice:          Invoice;
  onRecordPayment?: () => void;
  onCancel?:        () => void;
}

export function InvoiceSummary({ invoice, onRecordPayment, onCancel }: InvoiceSummaryProps) {
  const statusVariant = (INVOICE_STATUS_COLOR[invoice.status] ?? 'secondary') as 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  const balance = invoice.total_amount - invoice.paid_amount;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{invoice.invoice_number}</CardTitle>
          <p className="text-sm text-muted-foreground">Unit {invoice.unit_id} · {invoice.billing_period}</p>
        </div>
        <Badge variant={statusVariant}>{invoice.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-sm text-muted-foreground">Invoice Date</p><p className="font-medium">{formatDate(invoice.invoice_date)}</p></div>
          <div><p className="text-sm text-muted-foreground">Due Date</p><p className="font-medium">{formatDate(invoice.due_date)}</p></div>
          <div><p className="text-sm text-muted-foreground">Subtotal</p><p className="font-medium">₹{invoice.subtotal.toLocaleString('en-IN')}</p></div>
          <div><p className="text-sm text-muted-foreground">GST</p><p className="font-medium">₹{invoice.gst_amount.toLocaleString('en-IN')}</p></div>
        </div>

        <div className="rounded-md border">
          <table className="w-full text-sm">
            <tfoot className="border-t bg-muted/30">
              <tr>
                <td colSpan={1} className="px-4 py-2 text-right font-semibold">Total</td>
                <td className="px-4 py-2 text-right font-bold">₹{invoice.total_amount.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td colSpan={1} className="px-4 py-2 text-right">Paid</td>
                <td className="px-4 py-2 text-right text-green-600">₹{invoice.paid_amount.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td colSpan={1} className="px-4 py-2 text-right font-semibold text-destructive">Balance Due</td>
                <td className="px-4 py-2 text-right font-bold text-destructive">₹{balance.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {(onRecordPayment || onCancel) && balance > 0 && (
          <div className="flex justify-end gap-3">
            {onCancel && invoice.status === 'PENDING' && (
              <Button variant="outline" onClick={onCancel}>Cancel Invoice</Button>
            )}
            {onRecordPayment && (
              <Button onClick={onRecordPayment}>Record Payment</Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
