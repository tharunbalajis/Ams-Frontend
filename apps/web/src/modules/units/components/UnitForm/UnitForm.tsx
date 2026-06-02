import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField, Textarea } from '@ams/ui';
import { createUnitSchema, type CreateUnitFormValues } from '../../schemas/unit.schema';
import { UNIT_TYPE_OPTIONS, UNIT_STATUS_OPTIONS, OWNERSHIP_TYPE_OPTIONS } from '../../constants/unit.constants';
import { BlockSelector } from '../BlockSelector';
import { FloorSelector } from '../FloorSelector';
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
      unitNumber:    unit?.unitNumber    ?? '',
      block:         unit?.block         ?? '',
      floor:         unit?.floor         ?? 0,
      type:          unit?.type          ?? undefined,
      squareFeet:    unit?.squareFeet    ?? 0,
      ownershipType: unit?.ownershipType ?? undefined,
      description:   unit?.description   ?? '',
    },
  });

  const selectedBlock = form.watch('block');

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="unitNumber" label="Unit Number" required>
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

        <FormField control={form.control} name="block" label="Block / Tower" required>
          {(field) => (
            <BlockSelector
              value={field.value as string}
              onValueChange={(v) => field.onChange(v)}
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="floor" label="Floor" required>
          {(field) => (
            <FloorSelector
              blockId={selectedBlock}
              value={field.value as number}
              onValueChange={(v) => field.onChange(v)}
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="type" label="Unit Type" required>
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

        <FormField control={form.control} name="squareFeet" label="Square Feet" required>
          {(field) => (
            <Input
              type="number"
              min={0}
              value={field.value as number}
              onChange={(e) => field.onChange(Number((e.target as HTMLInputElement).value))}
              onBlur={field.onBlur}
              placeholder="0"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="ownershipType" label="Ownership Type" required>
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
      </div>

      <FormField control={form.control} name="description" label="Description">
        {(field) => (
          <Textarea
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="Optional notes about the unit"
            rows={3}
            disabled={isPending}
          />
        )}
      </FormField>

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
