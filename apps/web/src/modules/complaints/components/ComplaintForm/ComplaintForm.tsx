import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField, TextArea } from '@ams/ui';
import { createComplaintSchema, type CreateComplaintFormValues } from '../../schemas/complaint.schema';
import { COMPLAINT_CATEGORY_OPTIONS, PRIORITY_OPTIONS } from '../../constants';

export interface ComplaintFormProps {
  onSubmit:   (values: CreateComplaintFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function ComplaintForm({ onSubmit, onCancel, isPending }: ComplaintFormProps) {
  const form = useForm<CreateComplaintFormValues>({
    resolver:      zodResolver(createComplaintSchema),
    defaultValues: {
      title:       '',
      categoryId:  '',
      priority:    'MEDIUM',
      description: '',
      residentId:  '',
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
        <FormField control={form.control} name="categoryId" label="Category" required>
          {(field) => (
            <SelectField
              value={field.value as string}
              onValueChange={field.onChange}
              options={COMPLAINT_CATEGORY_OPTIONS}
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

      <FormField control={form.control} name="residentId" label="Resident ID" required>
        {(field) => (
          <Input
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="Resident ID"
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
