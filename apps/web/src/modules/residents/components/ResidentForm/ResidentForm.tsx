import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, FormField, Input, SelectField } from '@ams/ui';
import { createResidentSchema, type CreateResidentFormValues } from '../../schemas/resident.schema';
import { useCreateResident } from '../../hooks/useCreateResident';
import { useUpdateResident } from '../../hooks/useUpdateResident';
import { RESIDENT_TYPE_OPTIONS } from '../../constants/resident.constants';
import type { Resident } from '../../types/resident.types';
import { useAuth } from '@/hooks/useAuth';
import { useBlocks, useUnits } from '@/modules/units/hooks';

export interface ResidentFormProps {
  mode:        'create' | 'edit';
  resident?:   Resident;
  residentId?: string;
  onSuccess?:  () => void;
}

export function ResidentForm({ mode, resident, residentId, onSuccess }: ResidentFormProps) {
  const { user } = useAuth();
  const societyId = user?.society_id;

  const { data: blocksData } = useBlocks(societyId);
  const blocks = blocksData?.data ?? [];

  const { mutate: createResident, isPending: isCreating } = useCreateResident();
  const { mutate: updateResident, isPending: isUpdating } = useUpdateResident(residentId ?? '');
  const isPending = isCreating || isUpdating;

  const form = useForm<CreateResidentFormValues>({
    resolver: zodResolver(createResidentSchema),
    defaultValues: {
      full_name:      resident?.full_name      ?? '',
      mobile_primary: resident?.mobile_primary ?? '',
      unit_id:        resident?.unit_id        ?? ('' as unknown as number),
      resident_type:  (resident?.resident_type as 'OWNER' | 'TENANT') ?? 'OWNER',
      move_in_date:   resident?.move_in_date   ?? '',
      move_out_date:  resident?.move_out_date  ?? '',
      email:          resident?.email          ?? '',
    },
  });

  const residentType = useWatch({ control: form.control, name: 'resident_type' });
  const [pickedBlockId, setPickedBlockId] = useState<string>('');

  const { data: unitsData } = useUnits(
    pickedBlockId ? { block_id: Number(pickedBlockId), society_id: societyId } : undefined
  );
  const units = unitsData?.data ?? [];

  const blockOptions = blocks.map((b) => ({ label: b.block_name, value: String(b.block_id) }));
  const unitOptions  = units.map((u) => ({ label: `${u.unit_number} (${u.unit_type})`, value: String(u.unit_id) }));

  const onSubmit = (values: CreateResidentFormValues) => {
    const payload = { ...values, society_id: societyId ?? 1 };
    if (mode === 'create') {
      createResident(payload as Parameters<typeof createResident>[0], { onSuccess });
    } else {
      updateResident(payload as Parameters<typeof updateResident>[0], { onSuccess });
    }
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
        </CardContent>
      </Card>

      {mode === 'create' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Unit Assignment</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Block</label>
              <SelectField
                value={pickedBlockId}
                onValueChange={(v) => {
                  setPickedBlockId(v);
                  form.setValue('unit_id', '' as unknown as number);
                }}
                options={blockOptions}
                placeholder="Select block"
                disabled={isPending || blockOptions.length === 0}
              />
            </div>

            <FormField control={form.control} name="unit_id" label="Unit" required>
              {(field) => (
                <SelectField
                  value={field.value ? String(field.value) : ''}
                  onValueChange={(v) => field.onChange(Number(v))}
                  options={unitOptions}
                  placeholder={pickedBlockId ? 'Select unit' : 'Select block first'}
                  disabled={isPending || !pickedBlockId}
                />
              )}
            </FormField>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tenancy Dates</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
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

          {residentType === 'TENANT' && (
            <FormField control={form.control} name="move_out_date" label="Move-out Date" required>
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
          )}
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
