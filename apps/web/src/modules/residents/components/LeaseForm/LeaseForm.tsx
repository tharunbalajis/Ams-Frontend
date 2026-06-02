import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DatePicker, FileUpload, FormField, Input } from '@ams/ui';
import { leaseSchema, type LeaseFormValues } from '../../schemas/lease.schema';
import type { Lease } from '../../types/lease.types';
import type { ID } from '@/types/common.types';

export interface LeaseFormProps {
  residentId: ID;
  lease?:     Lease;
  onSubmit:   (values: LeaseFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function LeaseForm({ lease, onSubmit, onCancel, isPending }: LeaseFormProps) {
  const form = useForm<LeaseFormValues>({
    resolver: zodResolver(leaseSchema),
    defaultValues: {
      startDate:     lease?.startDate     ?? '',
      endDate:       lease?.endDate       ?? '',
      monthlyRent:   lease?.monthlyRent   ?? 0,
      depositAmount: lease?.depositAmount ?? 0,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="startDate" label="Lease Start Date" required>
          {(field) => <DatePicker value={field.value as string} onChange={(v) => field.onChange(v)} disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="endDate" label="Lease End Date" required>
          {(field) => <DatePicker value={field.value as string} onChange={(v) => field.onChange(v)} disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="monthlyRent" label="Monthly Rent (PHP)" required>
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value as number}
              onChange={(e) => field.onChange(Number((e.target as HTMLInputElement).value))}
              onBlur={field.onBlur}
              placeholder="0.00"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="depositAmount" label="Security Deposit (PHP)" required>
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value as number}
              onChange={(e) => field.onChange(Number((e.target as HTMLInputElement).value))}
              onBlur={field.onBlur}
              placeholder="0.00"
              disabled={isPending}
            />
          )}
        </FormField>
      </div>

      <div>
        <p className="mb-1.5 text-sm font-medium">Lease Agreement</p>
        <FileUpload accept=".pdf,.doc,.docx" maxSize={10 * 1024 * 1024}>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <p className="text-sm"><span className="font-medium text-primary">Upload agreement</span> or drag and drop</p>
            <p className="text-xs">PDF, DOC, DOCX — max 10MB</p>
          </div>
        </FileUpload>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>
          {lease ? 'Update Lease' : 'Create Lease'}
        </Button>
      </div>
    </form>
  );
}
