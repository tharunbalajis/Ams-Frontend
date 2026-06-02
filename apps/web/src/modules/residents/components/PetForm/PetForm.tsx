import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DatePicker, FormField, Input, SelectField } from '@ams/ui';
import { petSchema, type PetFormValues } from '../../schemas/pet.schema';
import { PET_TYPE_OPTIONS, VACCINATION_STATUS_OPTIONS } from '../../constants/pet.constants';
import type { Pet } from '../../types/pet.types';
import type { ID } from '@/types/common.types';

export interface PetFormProps {
  residentId: ID;
  pet?:       Pet;
  onSubmit:   (values: PetFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function PetForm({ pet, onSubmit, onCancel, isPending }: PetFormProps) {
  const form = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name:              pet?.name              ?? '',
      type:              pet?.type              ?? 'dog',
      breed:             pet?.breed             ?? '',
      vaccinationStatus: pet?.vaccinationStatus ?? 'not_vaccinated',
      vaccineExpiry:     pet?.vaccineExpiry      ?? '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="name" label="Pet Name" required>
          {(field) => <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="e.g. Buddy" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="type" label="Pet Type" required>
          {(field) => <SelectField value={field.value as string} onValueChange={(v) => field.onChange(v)} options={PET_TYPE_OPTIONS} />}
        </FormField>

        <FormField control={form.control} name="breed" label="Breed" required>
          {(field) => <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="e.g. Labrador" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="vaccinationStatus" label="Vaccination Status" required>
          {(field) => <SelectField value={field.value as string} onValueChange={(v) => field.onChange(v)} options={VACCINATION_STATUS_OPTIONS} />}
        </FormField>

        <FormField control={form.control} name="vaccineExpiry" label="Vaccine Expiry">
          {(field) => <DatePicker value={field.value as string | undefined} onChange={(v) => field.onChange(v)} disabled={isPending} />}
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>
          {pet ? 'Update Pet' : 'Register Pet'}
        </Button>
      </div>
    </form>
  );
}
