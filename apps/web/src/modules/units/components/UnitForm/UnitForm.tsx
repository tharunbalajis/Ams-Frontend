import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { createUnitSchema, type CreateUnitFormValues } from '../../schemas/unit.schema';
import { UNIT_TYPE_OPTIONS, OWNERSHIP_TYPE_OPTIONS } from '../../constants/unit.constants';
import type { Unit } from '../../types/unit.types';

export interface UnitFormProps {
  unit?:      Unit;
  onSubmit:   (values: CreateUnitFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function UnitForm({ unit, onSubmit, onCancel, isPending }: UnitFormProps) {
  const form = useForm<CreateUnitFormValues>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: {
      unit_number:    unit?.unit_number    ?? '',
      unit_type:      unit?.unit_type      ?? undefined as never,
      block_id:       unit?.block_id       ? String(unit.block_id) : '',
      floor_number:   unit?.floor_number   ? String(unit.floor_number) : '',
      ownership_type: unit?.ownership_type ?? undefined as never,
      super_built_up: unit?.super_built_up ? String(unit.super_built_up) : '',
      carpet_area:    unit?.carpet_area    ? String(unit.carpet_area) : '',
      parking_slots:  unit?.parking_slots  ? String(unit.parking_slots) : '',
    },
  });

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
              value={field.value as string}
              onValueChange={field.onChange}
              options={UNIT_TYPE_OPTIONS}
              placeholder="Select type"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="block_id" label="Block ID">
          {(field) => (
            <Input
              type="number"
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Block ID number"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="floor_number" label="Floor">
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="0"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="ownership_type" label="Ownership Type">
          {(field) => (
            <SelectField
              value={field.value as string}
              onValueChange={field.onChange}
              options={OWNERSHIP_TYPE_OPTIONS}
              placeholder="Select ownership"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="super_built_up" label="Super Built Up (sq ft)">
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value as string}
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
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="0"
              disabled={isPending}
            />
          )}
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isPending}>
          {unit ? 'Update Unit' : 'Create Unit'}
        </Button>
      </div>
    </form>
  );
}
