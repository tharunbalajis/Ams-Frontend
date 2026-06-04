import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { createComplianceSchema, type CreateComplianceFormValues } from '../schemas/compliance.schema';
import { DOCUMENT_TYPE_OPTIONS, COMPLIANCE_STATUS_OPTIONS } from '../constants';
import type { ComplianceRecord } from '@/api/compliance.api';

export interface ComplianceFormProps {
  record?:    ComplianceRecord;
  societyId:  number;
  onSubmit:   (values: CreateComplianceFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function ComplianceForm({ record, societyId, onSubmit, onCancel, isPending }: ComplianceFormProps) {
  const form = useForm<CreateComplianceFormValues>({
    resolver:      zodResolver(createComplianceSchema),
    defaultValues: {
      society_id:    record?.society_id    ?? societyId,
      document_name: record?.document_name ?? '',
      document_type: record?.document_type ?? 'REGISTRATION',
      expiry_date:   record?.expiry_date   ?? '',
      storage_url:   record?.storage_url   ?? '',
      status:        record?.status        ?? 'valid',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="document_name" label="Document Name" required>
          {(f) => <Input value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="e.g. Society Registration" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="document_type" label="Document Type" required>
          {(f) => <SelectField value={f.value as string} onValueChange={f.onChange} options={DOCUMENT_TYPE_OPTIONS} disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="status" label="Status">
          {(f) => <SelectField value={f.value as string} onValueChange={f.onChange} options={COMPLIANCE_STATUS_OPTIONS} disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="expiry_date" label="Expiry Date">
          {(f) => <Input type="date" value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="storage_url" label="Document URL" className="sm:col-span-2">
          {(f) => <Input type="url" value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="https://..." disabled={isPending} />}
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>{record ? 'Update' : 'Create'} Record</Button>
      </div>
    </form>
  );
}
