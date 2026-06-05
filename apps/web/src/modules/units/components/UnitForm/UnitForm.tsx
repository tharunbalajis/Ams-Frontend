import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { createUnitSchema, type CreateUnitFormValues } from '../../schemas/unit.schema';
import { UNIT_TYPE_OPTIONS } from '../../constants/unit.constants';
import { useCreateUnit } from '../../hooks/useCreateUnit';
import { useBlocks } from '../../hooks/useUnits';
import { useAuth } from '@/hooks/useAuth';
import type { Unit } from '../../types/unit.types';

export interface UnitFormProps {
  mode:       'create' | 'edit';
  unit?:      Unit;
  onSuccess?: () => void;
}

export function UnitForm({ mode, unit, onSuccess }: UnitFormProps) {
  const { user }     = useAuth();
  const societyId    = user?.society_id;
  const { data: blocksData } = useBlocks(societyId);
  const blocks = (blocksData?.data ?? []).map((b) => ({
    label: b.block_name,
    value: String(b.block_id),
  }));

  const { mutate: createUnit, isPending } = useCreateUnit();

  const form = useForm<CreateUnitFormValues>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: {
      unit_number:    unit?.unit_number    ?? '',
      unit_type:      unit?.unit_type      ?? undefined,
      block_id:       unit?.block_id       ?? undefined,
      floor_number:   unit?.floor_number   ?? undefined,
      super_built_up: unit?.super_built_up ?? undefined,
      carpet_area:    unit?.carpet_area    ?? undefined,
      parking_slots:  unit?.parking_slots  ?? undefined,
    },
  });

  const onSubmit = (values: CreateUnitFormValues) => {
    const payload = { ...values, society_id: societyId ?? 1 };
    createUnit(payload, { onSuccess });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="unit_number" label="Unit Number" required>
          {(field) => (
            <Input
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="e.g. A-101"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="unit_type" label="Unit Type" required>
          {(field) => (
            <SelectField
              value={field.value ? String(field.value) : ''}
              onValueChange={field.onChange}
              options={UNIT_TYPE_OPTIONS}
              placeholder="Select type"
              disabled={isPending}
            />
          )}
        </FormField>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Block</label>
          <SelectField
            value={form.watch('block_id') ? String(form.watch('block_id')) : ''}
            onValueChange={(v) => form.setValue('block_id', v ? Number(v) : undefined)}
            options={blocks}
            placeholder="Select block"
            disabled={isPending || blocks.length === 0}
          />
        </div>

        <FormField control={form.control} name="floor_number" label="Floor">
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="0"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="super_built_up" label="Super Built Up (sq ft)">
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="0"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="carpet_area" label="Carpet Area (sq ft)">
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="0"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="parking_slots" label="Parking Slots">
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="0"
              disabled={isPending}
            />
          )}
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" loading={isPending}>
          {mode === 'create' ? 'Create Unit' : 'Update Unit'}
        </Button>
      </div>
    </form>
  );
}
