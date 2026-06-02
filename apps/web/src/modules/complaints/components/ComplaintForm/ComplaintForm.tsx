import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FileUpload, FormField, Input, SelectField, Textarea } from '@ams/ui';
import { createComplaintSchema, type CreateComplaintFormValues } from '../../schemas/complaint.schema';
import {
  COMPLAINT_CATEGORY_OPTIONS,
  COMPLAINT_TYPE_OPTIONS,
  PRIORITY_OPTIONS,
} from '../../constants';

export interface ComplaintFormProps {
  onSubmit:   (values: CreateComplaintFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function ComplaintForm({ onSubmit, onCancel, isPending }: ComplaintFormProps) {
  const form = useForm<CreateComplaintFormValues>({
    resolver:      zodResolver(createComplaintSchema),
    defaultValues: {
      title:         '',
      category:      undefined,
      type:          'general',
      priority:      'medium',
      description:   '',
      residentId:    '',
      complaintDate: new Date().toISOString().split('T')[0],
      attachments:   [],
      tags:          [],
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

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField control={form.control} name="category" label="Category" required>
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

        <FormField control={form.control} name="type" label="Type" required>
          {(field) => (
            <SelectField
              value={field.value as string}
              onValueChange={field.onChange}
              options={COMPLAINT_TYPE_OPTIONS}
              placeholder="Select type"
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

      <FormField control={form.control} name="complaintDate" label="Complaint Date" required>
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

      <FormField control={form.control} name="description" label="Description" required>
        {(field) => (
          <Textarea
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="Provide detailed description of the issue"
            rows={5}
            disabled={isPending}
          />
        )}
      </FormField>

      <div>
        <p className="mb-1.5 text-sm font-medium">Attachments</p>
        <FileUpload accept="image/*,.pdf,.doc,.docx" maxSize={10 * 1024 * 1024} multiple>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <p className="text-sm"><span className="font-medium text-primary">Upload files</span> or drag and drop</p>
            <p className="text-xs">Images, PDF, DOC — max 10MB each</p>
          </div>
        </FileUpload>
      </div>

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
