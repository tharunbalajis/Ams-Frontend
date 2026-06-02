import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, FormField, Textarea } from '@ams/ui';
import { resolutionSchema, type ResolutionFormValues } from '../../schemas/resolution.schema';

export interface ResolutionFormProps {
  onSubmit:   (values: ResolutionFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function ResolutionForm({ onSubmit, onCancel, isPending }: ResolutionFormProps) {
  const form = useForm<ResolutionFormValues>({
    resolver:      zodResolver(resolutionSchema),
    defaultValues: {
      resolutionNotes:   '',
      rootCause:         '',
      preventiveMeasure: '',
      closeAfterResolve: false,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField control={form.control} name="resolutionNotes" label="Resolution Notes" required>
        {(field) => (
          <Textarea
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="Describe how the complaint was resolved"
            rows={4}
            disabled={isPending}
          />
        )}
      </FormField>

      <FormField control={form.control} name="rootCause" label="Root Cause">
        {(field) => (
          <Textarea
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="What caused this issue?"
            rows={2}
            disabled={isPending}
          />
        )}
      </FormField>

      <FormField control={form.control} name="preventiveMeasure" label="Preventive Measure">
        {(field) => (
          <Textarea
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="How can this be prevented in future?"
            rows={2}
            disabled={isPending}
          />
        )}
      </FormField>

      <FormField control={form.control} name="closeAfterResolve" label="">
        {(field) => (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
              disabled={isPending}
            />
            <label className="text-sm">Also close complaint after resolving</label>
          </div>
        )}
      </FormField>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isPending}>
          Mark as Resolved
        </Button>
      </div>
    </form>
  );
}
