import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FileUpload, FormField, Input, SelectField, Textarea } from '@ams/ui';
import { createExpenseSchema, type CreateExpenseFormValues } from '../../schemas/expense.schema';
import { EXPENSE_CATEGORY_OPTIONS } from '../../constants/expense.constants';

export interface ExpenseFormProps {
  onSubmit:   (values: CreateExpenseFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function ExpenseForm({ onSubmit, onCancel, isPending }: ExpenseFormProps) {
  const form = useForm<CreateExpenseFormValues>({
    resolver:      zodResolver(createExpenseSchema),
    defaultValues: { category: undefined, vendor: '', expenseDate: '', amount: 0, description: '', receiptUrl: '' },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="category" label="Category" required>
          {(field) => (
            <SelectField value={field.value as string} onValueChange={field.onChange} options={EXPENSE_CATEGORY_OPTIONS} placeholder="Select category" disabled={isPending} />
          )}
        </FormField>
        <FormField control={form.control} name="vendor" label="Vendor / Payee" required>
          {(field) => <Input value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} placeholder="Vendor name" disabled={isPending} />}
        </FormField>
        <FormField control={form.control} name="expenseDate" label="Expense Date" required>
          {(field) => <Input type="date" value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} disabled={isPending} />}
        </FormField>
        <FormField control={form.control} name="amount" label="Amount (₹)" required>
          {(field) => (
            <Input type="number" min={0} value={field.value as number} onChange={(e) => field.onChange(Number((e.target as HTMLInputElement).value))} onBlur={field.onBlur} placeholder="0.00" disabled={isPending} />
          )}
        </FormField>
      </div>
      <FormField control={form.control} name="description" label="Description" required>
        {(field) => <Textarea value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} rows={3} placeholder="Describe the expense" disabled={isPending} />}
      </FormField>
      <div>
        <p className="mb-1.5 text-sm font-medium">Receipt</p>
        <FileUpload accept="image/*,.pdf" maxSize={5 * 1024 * 1024}>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <p className="text-sm"><span className="font-medium text-primary">Upload receipt</span> or drag and drop</p>
            <p className="text-xs">Image or PDF — max 5MB</p>
          </div>
        </FileUpload>
      </div>
      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>}
        <Button type="submit" loading={isPending}>Submit Expense</Button>
      </div>
    </form>
  );
}
