import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { vehicleSchema, type VehicleFormValues } from '../../schemas/vehicle.schema';
import { VEHICLE_TYPE_OPTIONS } from '../../constants/vehicle.constants';
import type { Vehicle } from '../../types/vehicle.types';
import type { ID } from '@/types/common.types';

export interface VehicleFormProps {
  residentId:  ID;
  vehicle?:    Vehicle;
  onSubmit:    (values: VehicleFormValues) => void;
  onCancel?:   () => void;
  isPending?:  boolean;
}

export function VehicleForm({ vehicle, onSubmit, onCancel, isPending }: VehicleFormProps) {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vehicleNumber: vehicle?.vehicleNumber ?? '',
      type:          vehicle?.type          ?? 'CAR',
      brand:         vehicle?.brand         ?? '',
      model:         vehicle?.model         ?? '',
      color:         vehicle?.color         ?? '',
      parkingSlot:   vehicle?.parkingSlot   ?? '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="vehicleNumber" label="Plate / Vehicle No." required>
          {(field) => <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="ABC 1234" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="type" label="Vehicle Type" required>
          {(field) => (
            <SelectField value={field.value as string} onValueChange={(v) => field.onChange(v)} options={VEHICLE_TYPE_OPTIONS} />
          )}
        </FormField>

        <FormField control={form.control} name="brand" label="Brand" required>
          {(field) => <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="e.g. Toyota" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="model" label="Model" required>
          {(field) => <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="e.g. Vios" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="color" label="Color">
          {(field) => <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="e.g. White" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="parkingSlot" label="Parking Slot">
          {(field) => <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="e.g. B-12" disabled={isPending} />}
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>
          {vehicle ? 'Update Vehicle' : 'Register Vehicle'}
        </Button>
      </div>
    </form>
  );
}
