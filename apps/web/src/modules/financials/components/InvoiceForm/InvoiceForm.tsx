import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input } from '@ams/ui';
import { createInvoiceSchema, type CreateInvoiceFormValues } from '../../schemas/invoice.schema';

export interface InvoiceFormProps {
  onSubmit:   (values: CreateInvoiceFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

const currentMonth = new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase();
const currentYear  = new Date().getFullYear();
const defaultPeriod = `${currentMonth}-${currentYear}`;

export function InvoiceForm({ onSubmit, onCancel, isPending }: InvoiceFormProps) {
  const form = useForm<CreateInvoiceFormValues>({
    resolver:      zodResolver(createInvoiceSchema),
    defaultValues: {
      unit_id:        '',
      resident_id:    '',
      billing_period: defaultPeriod,
      invoice_date:   new Date().toISOString().split('T')[0],
      due_date:       '',
      line_items:     [{ maintenance_head_id: '', description: '', quantity: 1, rate: 0, gst_rate: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'line_items' });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="unit_id" label="Unit ID" required>
          {(field) => (
            <Input type="number" value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} placeholder="Unit number" disabled={isPending} />
          )}
        </FormField>

        <FormField control={form.control} name="resident_id" label="Resident ID" required>
          {(field) => (
            <Input value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} placeholder="Resident UUID" disabled={isPending} />
          )}
        </FormField>

        <FormField control={form.control} name="billing_period" label="Billing Period" required>
          {(field) => (
            <Input value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} placeholder="JUN-2026" disabled={isPending} />
          )}
        </FormField>

        <FormField control={form.control} name="invoice_date" label="Invoice Date" required>
          {(field) => (
            <Input type="date" value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} disabled={isPending} />
          )}
        </FormField>

        <FormField control={form.control} name="due_date" label="Due Date" required>
          {(field) => (
            <Input type="date" value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} disabled={isPending} />
          )}
        </FormField>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">Line Items</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ maintenance_head_id: '', description: '', quantity: 1, rate: 0, gst_rate: 0 })}
          >
            + Add Item
          </Button>
        </div>
        {fields.map((field, idx) => (
          <div key={field.id} className="mb-2 grid grid-cols-[1fr_1fr_auto_auto_auto] gap-2 items-start">
            <FormField control={form.control} name={`line_items.${idx}.description`} label="">
              {(f) => <Input value={f.value as string} onChange={f.onChange} placeholder="Description" disabled={isPending} />}
            </FormField>
            <FormField control={form.control} name={`line_items.${idx}.maintenance_head_id`} label="">
              {(f) => <Input value={f.value as string} onChange={f.onChange} placeholder="Head ID" disabled={isPending} />}
            </FormField>
            <FormField control={form.control} name={`line_items.${idx}.rate`} label="">
              {(f) => (
                <Input
                  type="number"
                  value={f.value as number}
                  onChange={(e) => f.onChange(Number((e.target as HTMLInputElement).value))}
                  placeholder="Rate"
                  className="w-28"
                  disabled={isPending}
                />
              )}
            </FormField>
            <FormField control={form.control} name={`line_items.${idx}.gst_rate`} label="">
              {(f) => (
                <Input
                  type="number"
                  value={f.value as number}
                  onChange={(e) => f.onChange(Number((e.target as HTMLInputElement).value))}
                  placeholder="GST %"
                  className="w-20"
                  disabled={isPending}
                />
              )}
            </FormField>
            {fields.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => remove(idx)}>✕</Button>
            )}
          </div>
        ))}
        {form.formState.errors.line_items && (
          <p className="text-xs text-destructive mt-1">{form.formState.errors.line_items.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>}
        <Button type="submit" loading={isPending}>Generate Invoice</Button>
      </div>
    </form>
  );
}
