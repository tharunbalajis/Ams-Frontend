import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, FormField, Input, SelectField } from '@ams/ui';
import { createResidentSchema, updateResidentSchema, type CreateResidentFormValues } from '../../schemas/resident.schema';
import { useCreateResident } from '../../hooks/useCreateResident';
import { useUpdateResident } from '../../hooks/useUpdateResident';
import {
  RESIDENT_TYPE_OPTIONS,
  RESIDENT_RELATIONSHIP_OPTIONS,
} from '../../constants/resident.constants';
import type { Resident } from '../../types/resident.types';
import { useAuth } from '@/hooks/useAuth';

export interface ResidentFormProps {
  mode:        'create' | 'edit';
  resident?:   Resident;
  residentId?: string;
}

export function ResidentForm({ mode, resident, residentId }: ResidentFormProps) {
  const { user } = useAuth();
  const { mutate: createResident, isPending: isCreating } = useCreateResident();
  const { mutate: updateResident, isPending: isUpdating } = useUpdateResident(residentId ?? '');
  const isPending = isCreating || isUpdating;

  const schema = mode === 'create' ? createResidentSchema : updateResidentSchema;

  const form = useForm<CreateResidentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name:     resident?.full_name     ?? '',
      mobile_primary: resident?.mobile_primary ?? '',
      unit_id:       resident?.unit_id       ? String(resident.unit_id) : '',
      move_in_date:  resident?.move_in_date  ?? '',
      resident_type: resident?.resident_type ?? 'OWNER',
      relationship:  resident?.relationship  ?? 'PRIMARY',
      email:         resident?.email         ?? '',
      mobile_secondary: resident?.mobile_secondary ?? '',
    },
  });

  const onSubmit = (values: CreateResidentFormValues) => {
    const payload = {
      ...values,
      unit_id:    Number(values.unit_id),
      society_id: user?.society_id ?? 1,
    };
    if (mode === 'create') createResident(payload as Parameters<typeof createResident>[0]);
    else updateResident(payload as Parameters<typeof updateResident>[0]);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="full_name" label="Full Name" required>
            {(field) => (
              <Input
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Full name"
                disabled={isPending}
              />
            )}
          </FormField>

          <FormField control={form.control} name="mobile_primary" label="Mobile Number" required>
            {(field) => (
              <Input
                type="tel"
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="09XX XXX XXXX"
                disabled={isPending}
              />
            )}
          </FormField>

          <FormField control={form.control} name="email" label="Email">
            {(field) => (
              <Input
                type="email"
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="email@example.com"
                disabled={isPending}
              />
            )}
          </FormField>

          <FormField control={form.control} name="mobile_secondary" label="Secondary Mobile">
            {(field) => (
              <Input
                type="tel"
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Optional"
                disabled={isPending}
              />
            )}
          </FormField>

          <FormField control={form.control} name="resident_type" label="Resident Type" required>
            {(field) => (
              <SelectField
                value={field.value as string}
                onValueChange={(v) => field.onChange(v)}
                options={RESIDENT_TYPE_OPTIONS}
                placeholder="Select type"
                disabled={isPending}
              />
            )}
          </FormField>

          <FormField control={form.control} name="relationship" label="Relationship">
            {(field) => (
              <SelectField
                value={field.value as string}
                onValueChange={(v) => field.onChange(v)}
                options={RESIDENT_RELATIONSHIP_OPTIONS}
                placeholder="Select relationship"
                disabled={isPending}
              />
            )}
          </FormField>

          {mode === 'create' && (
            <FormField control={form.control} name="unit_id" label="Unit ID" required>
              {(field) => (
                <Input
                  type="number"
                  value={field.value as string}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Unit ID number"
                  disabled={isPending}
                />
              )}
            </FormField>
          )}

          <FormField control={form.control} name="move_in_date" label="Move-in Date" required>
            {(field) => (
              <Input
                type="date"
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={isPending}
              />
            )}
          </FormField>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" loading={isPending}>
          {mode === 'create' ? 'Register Resident' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
