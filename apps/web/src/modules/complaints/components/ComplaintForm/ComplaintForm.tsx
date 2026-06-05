import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField, TextArea } from '@ams/ui';
import { createComplaintSchema, type CreateComplaintFormValues } from '../../schemas/complaint.schema';
import { PRIORITY_OPTIONS } from '../../constants';
import { useCategories } from '../../hooks/useComplaint';

export interface ComplaintFormProps {
  onSubmit:   (values: CreateComplaintFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function ComplaintForm({ onSubmit, onCancel, isPending }: ComplaintFormProps) {
  const { data: catData } = useCategories();
  const categories = catData?.data ?? [];

  const form = useForm<CreateComplaintFormValues>({
    resolver:      zodResolver(createComplaintSchema),
    defaultValues: {
      title:       '',
      cat_id:      '',
      priority:    'MEDIUM',
      description: '',
      unit_id:     '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField control={form.control} name="title" label="Complaint Title" required>
        {(field) => (
          <Input
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="Brief summary of the issue"
            disabled={isPending}
          />
        )}
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="cat_id" label="Category" required>
          {(field) => (
            <SelectField
              value={field.value as string}
              onValueChange={field.onChange}
              options={
                categories.length
                  ? categories.filter(c => c.id).map(c => ({ label: c.category_name, value: c.id }))
                  : [{ label: 'Loading…', value: 'loading' }]
              }
              placeholder="Select category"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="priority" label="Priority" required>
          {(field) => (
            <SelectField
              value={field.value as string}
              onValueChange={field.onChange}
              options={PRIORITY_OPTIONS}
              placeholder="Select priority"
              disabled={isPending}
            />
          )}
        </FormField>
      </div>

      <FormField control={form.control} name="unit_id" label="Unit ID" required>
        {(field) => (
          <Input
            type="number"
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="Unit number"
            disabled={isPending}
          />
        )}
      </FormField>

      <FormField control={form.control} name="description" label="Description" required>
        {(field) => (
          <TextArea
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="Provide detailed description of the issue"
            rows={5}
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
          Submit Complaint
        </Button>
      </div>
    </form>
  );
}
