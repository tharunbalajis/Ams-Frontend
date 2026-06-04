import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { createAssetSchema, type CreateAssetFormValues } from '../schemas/asset.schema';
import { ASSET_STATUS_OPTIONS, ASSET_TYPE_OPTIONS } from '../constants';
import type { Asset } from '@/api/assets.api';

export interface AssetFormProps {
  asset?:     Asset;
  societyId:  number;
  onSubmit:   (values: CreateAssetFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function AssetForm({ asset, societyId, onSubmit, onCancel, isPending }: AssetFormProps) {
  const form = useForm<CreateAssetFormValues>({
    resolver:      zodResolver(createAssetSchema),
    defaultValues: {
      society_id:        asset?.society_id        ?? societyId,
      asset_name:        asset?.asset_name        ?? '',
      asset_type:        asset?.asset_type        ?? '',
      status:            asset?.status            ?? 'operational',
      next_service_date: asset?.next_service_date ?? '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="asset_name" label="Asset Name" required>
          {(f) => <Input value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="e.g. Elevator 1" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="asset_type" label="Asset Type" required>
          {(f) => <SelectField value={f.value as string} onValueChange={f.onChange} options={ASSET_TYPE_OPTIONS} placeholder="Select type" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="status" label="Status">
          {(f) => <SelectField value={f.value as string} onValueChange={f.onChange} options={ASSET_STATUS_OPTIONS} disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="next_service_date" label="Next Service Date">
          {(f) => <Input type="date" value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} disabled={isPending} />}
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>{asset ? 'Update' : 'Create'} Asset</Button>
      </div>
    </form>
  );
}
