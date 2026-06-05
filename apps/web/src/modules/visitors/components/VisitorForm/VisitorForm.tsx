import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { createVisitorSchema, type CreateVisitorFormValues } from '../../schemas/visitor.schema';
import { VISITOR_TYPE_OPTIONS } from '../../constants/visitor.constants';

export interface VisitorFormProps {
  onSubmit:   (values: CreateVisitorFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function VisitorForm({ onSubmit, onCancel, isPending }: VisitorFormProps) {
  const form = useForm<CreateVisitorFormValues>({
    resolver:      zodResolver(createVisitorSchema),
    defaultValues: {
      visitor_name:   '',
      visitor_mobile: '',
      visitor_type:   undefined,
      purpose:        '',
      unit_id:        '',
      resident_id:    '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="visitor_name" label="Visitor Name" required>
          {(field) => (
            <Input
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Full name"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="visitor_mobile" label="Mobile Number">
          {(field) => (
            <Input
              type="tel"
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="+91 XXXXX XXXXX"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="visitor_type" label="Visitor Type" required>
          {(field) => (
            <SelectField
              value={field.value as string}
              onValueChange={field.onChange}
              options={VISITOR_TYPE_OPTIONS}
              placeholder="Select type"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="purpose" label="Purpose of Visit">
          {(field) => (
            <Input
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="e.g. Meeting, Delivery"
              disabled={isPending}
            />
          )}
        </FormField>

        <FormField control={form.control} name="unit_id" label="Unit ID">
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

        <FormField control={form.control} name="resident_id" label="Resident ID">
          {(field) => (
            <Input
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Resident UUID"
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
          Register Visitor
        </Button>
      </div>
    </form>
  );
}
