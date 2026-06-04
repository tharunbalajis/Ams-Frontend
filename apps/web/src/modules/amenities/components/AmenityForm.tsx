import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, TextArea } from '@ams/ui';
import { createAmenitySchema, type CreateAmenityFormValues } from '../schemas/amenity.schema';
import type { Amenity } from '@/api/amenities.api';

export interface AmenityFormProps {
  amenity?:   Amenity;
  societyId:  number;
  onSubmit:   (values: CreateAmenityFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function AmenityForm({ amenity, societyId, onSubmit, onCancel, isPending }: AmenityFormProps) {
  const form = useForm<CreateAmenityFormValues>({
    resolver:      zodResolver(createAmenitySchema),
    defaultValues: {
      society_id:  amenity?.society_id  ?? societyId,
      name:        amenity?.name        ?? '',
      description: amenity?.description ?? '',
      is_active:   amenity?.is_active   ?? true,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField control={form.control} name="name" label="Name" required>
        {(f) => <Input value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="Amenity name" disabled={isPending} />}
      </FormField>

      <FormField control={form.control} name="description" label="Description">
        {(f) => <TextArea value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} rows={3} placeholder="Optional description" disabled={isPending} />}
      </FormField>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>{amenity ? 'Update' : 'Create'} Amenity</Button>
      </div>
    </form>
  );
}
