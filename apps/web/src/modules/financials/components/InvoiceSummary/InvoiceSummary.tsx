import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { INVOICE_STATUS_COLOR } from '../../constants/invoice.constants';
import type { Invoice, InvoiceStatus } from '../../types/invoice.types';

export interface InvoiceSummaryProps {
  invoice:          Invoice;
  onRecordPayment?: () => void;
  onCancel?:        () => void;
}

export function InvoiceSummary({ invoice, onRecordPayment, onCancel }: InvoiceSummaryProps) {
  const statusVariant = INVOICE_STATUS_COLOR[invoice.status] as 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{invoice.invoiceNumber}</CardTitle>
          <p className="text-sm text-muted-foreground">{invoice.residentName} · Unit {invoice.unitNumber}</p>
        </div>
        <Badge variant={statusVariant}>{invoice.status.replace('_', ' ')}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-sm text-muted-foreground">Invoice Date</p><p className="font-medium">{formatDate(invoice.invoiceDate)}</p></div>
          <div><p className="text-sm text-muted-foreground">Due Date</p><p className="font-medium">{formatDate(invoice.dueDate)}</p></div>
          <div><p className="text-sm text-muted-foreground">Type</p><p className="font-medium capitalize">{invoice.type.replace('_', ' ')}</p></div>
        </div>

        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Description</th>
                <th className="px-4 py-2 text-right font-medium">Amount</th>
                <th className="px-4 py-2 text-right font-medium">Tax</th>
                <th className="px-4 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-right">₹{item.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{item.taxRate}%</td>
                  <td className="px-4 py-2 text-right">₹{item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t bg-muted/30">
              <tr>
                <td colSpan={3} className="px-4 py-2 text-right font-semibold">Total</td>
                <td className="px-4 py-2 text-right font-bold">₹{invoice.totalAmount.toLocaleString()}</td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-2 text-right">Paid</td>
                <td className="px-4 py-2 text-right text-green-600">₹{invoice.paidAmount.toLocaleString()}</td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-2 text-right font-semibold text-destructive">Balance Due</td>
                <td className="px-4 py-2 text-right font-bold text-destructive">₹{invoice.balanceDue.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {(onRecordPayment || onCancel) && invoice.balanceDue > 0 && (
          <div className="flex justify-end gap-3">
            {onCancel && invoice.status === 'pending' && (
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
