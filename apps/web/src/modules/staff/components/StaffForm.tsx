import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { createStaffSchema, type CreateStaffFormValues } from '../schemas/staff.schema';
import { STAFF_ROLE_OPTIONS } from '../constants';
import type { StaffMember } from '@/api/staff.api';

export interface StaffFormProps {
  member?:    StaffMember;
  societyId:  number;
  onSubmit:   (values: CreateStaffFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function StaffForm({ member, societyId, onSubmit, onCancel, isPending }: StaffFormProps) {
  const form = useForm<CreateStaffFormValues>({
    resolver:      zodResolver(createStaffSchema),
    defaultValues: {
      society_id: member?.society_id ?? societyId,
      name:       member?.name       ?? '',
      role:       member?.role       ?? 'SECURITY',
      mobile:     member?.mobile     ?? '',
      is_active:  member?.is_active  ?? true,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="name" label="Full Name" required>
          {(f) => <Input value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="Staff name" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="role" label="Role" required>
          {(f) => <SelectField value={f.value as string} onValueChange={f.onChange} options={STAFF_ROLE_OPTIONS} placeholder="Select role" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="mobile" label="Mobile" required>
          {(f) => <Input type="tel" value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="+91 XXXXX XXXXX" disabled={isPending} />}
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>{member ? 'Update' : 'Add'} Staff</Button>
      </div>
    </form>
  );
}
