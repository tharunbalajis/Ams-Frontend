import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Breadcrumbs, Card, CardContent, CardHeader, CardTitle,
  ErrorState, LoadingState, PageHeader,
  Button, FormField, Input, SelectField,
} from '@ams/ui';
import { InvoiceSummary } from '../components/InvoiceSummary';
import { PaymentHistory } from '../components/PaymentHistory';
import { useInvoice }     from '../hooks/useInvoices';
import { usePayments, useRecordPayment } from '../hooks/usePayments';
import { FINANCIAL_ROUTES }    from '../constants/invoice.constants';
import { PAYMENT_METHOD_OPTIONS } from '../constants/payment.constants';
import { createPaymentSchema, type CreatePaymentFormValues } from '../schemas/payment.schema';

export function InvoiceDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [payOpen, setPayOpen] = useState(false);

  const { data, isLoading, isError }     = useInvoice(id);
  const { data: pms, isLoading: pmsLoading } = usePayments({ invoiceId: id } as never);
  const { mutate: recordPayment, isPending } = useRecordPayment();

  const form = useForm<CreatePaymentFormValues>({
    resolver:      zodResolver(createPaymentSchema),
    defaultValues: { invoiceId: id, paymentDate: new Date().toISOString().split('T')[0], method: undefined as never, amount: 0 },
  });

  const handleSubmit = (values: CreatePaymentFormValues) => {
    recordPayment(values, { onSuccess: () => { setPayOpen(false); form.reset(); } });
  };

  if (isLoading) return <LoadingState />;
  if (isError || !data?.data) return <ErrorState />;

  const invoice = data.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={invoice.invoiceNumber}
        description={`${invoice.residentName} · Unit ${invoice.unitNumber}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Invoices',  href: FINANCIAL_ROUTES.INVOICES },
            { label: invoice.invoiceNumber },
          ]} />
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <InvoiceSummary invoice={invoice} onRecordPayment={() => setPayOpen(true)} />
        </div>
        <Card>
          <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
          <CardContent>
            <PaymentHistory payments={pms?.data ?? []} loading={pmsLoading} />
          </CardContent>
        </Card>
      </div>

      {payOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Record Payment</h2>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" noValidate>
              <FormField control={form.control} name="paymentDate" label="Payment Date" required>
                {(f) => <Input type="date" value={f.value as string} onChange={f.onChange} disabled={isPending} />}
              </FormField>
              <FormField control={form.control} name="method" label="Payment Method" required>
                {(f) => (
                  <SelectField
                    value={f.value as string}
                    onValueChange={f.onChange}
                    options={PAYMENT_METHOD_OPTIONS}
                    placeholder="Select method"
                    disabled={isPending}
                  />
                )}
              </FormField>
              <FormField control={form.control} name="amount" label="Amount (₹)" required>
                {(f) => (
                  <Input
                    type="number"
                    min={0}
                    max={invoice.balanceDue}
                    value={f.value as number}
                    onChange={(e) => f.onChange(Number((e.target as HTMLInputElement).value))}
                    disabled={isPending}
                  />
                )}
              </FormField>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setPayOpen(false)}>Cancel</Button>
                <Button type="submit" loading={isPending}>Record Payment</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
