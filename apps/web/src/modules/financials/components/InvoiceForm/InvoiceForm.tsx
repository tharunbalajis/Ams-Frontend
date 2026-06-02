import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { createInvoiceSchema, type CreateInvoiceFormValues } from '../../schemas/invoice.schema';
import { INVOICE_TYPE_OPTIONS } from '../../constants/invoice.constants';

export interface InvoiceFormProps {
  onSubmit:   (values: CreateInvoiceFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function InvoiceForm({ onSubmit, onCancel, isPending }: InvoiceFormProps) {
  const form = useForm<CreateInvoiceFormValues>({
    resolver:      zodResolver(createInvoiceSchema),
    defaultValues: {
      type:        undefined,
      residentId:  '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate:     '',
      lineItems:   [{ description: '', amount: 0, taxRate: 0 }],
      remarks:     '',
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'lineItems' });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="type" label="Invoice Type" required>
          {(field) => (
            <SelectField value={field.value as string} onValueChange={field.onChange} options={INVOICE_TYPE_OPTIONS} placeholder="Select type" disabled={isPending} />
          )}
        </FormField>

        <FormField control={form.control} name="invoiceDate" label="Invoice Date" required>
          {(field) => (
            <Input type="date" value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} disabled={isPending} />
          )}
        </FormField>

        <FormField control={form.control} name="dueDate" label="Due Date" required>
          {(field) => (
            <Input type="date" value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} disabled={isPending} />
          )}
        </FormField>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">Line Items</p>
          <Button type="button" variant="outline" size="sm" onClick={() => append({ description: '', amount: 0, taxRate: 0 })}>
            + Add Item
          </Button>
        </div>
        {fields.map((field, idx) => (
          <div key={field.id} className="mb-2 grid grid-cols-[1fr_auto_auto_auto] gap-2 items-start">
            <FormField control={form.control} name={`lineItems.${idx}.description`} label="">
              {(f) => <Input value={f.value as string} onChange={f.onChange} placeholder="Description" disabled={isPending} />}
            </FormField>
            <FormField control={form.control} name={`lineItems.${idx}.amount`} label="">
              {(f) => <Input type="number" value={f.value as number} onChange={(e) => f.onChange(Number((e.target as HTMLInputElement).value))} placeholder="Amount" className="w-28" disabled={isPending} />}
            </FormField>
            <FormField control={form.control} name={`lineItems.${idx}.taxRate`} label="">
              {(f) => <Input type="number" value={f.value as number} onChange={(e) => f.onChange(Number((e.target as HTMLInputElement).value))} placeholder="Tax %" className="w-20" disabled={isPending} />}
            </FormField>
            {fields.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => remove(idx)} className="mt-0.5">✕</Button>
            )}
          </div>
        ))}
      </div>

      <FormField control={form.control} name="remarks" label="Remarks">
        {(field) => (
          <Input value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} placeholder="Optional remarks" disabled={isPending} />
        )}
      </FormField>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>}
        <Button type="submit" loading={isPending}>Generate Invoice</Button>
      </div>
    </form>
  );
}
