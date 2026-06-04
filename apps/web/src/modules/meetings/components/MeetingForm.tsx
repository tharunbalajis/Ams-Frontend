import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField } from '@ams/ui';
import { createMeetingSchema, type CreateMeetingFormValues } from '../schemas/meeting.schema';
import { MEETING_TYPE_OPTIONS, MEETING_STATUS_OPTIONS } from '../constants';
import type { Meeting } from '@/api/meetings.api';

export interface MeetingFormProps {
  meeting?:   Meeting;
  societyId:  number;
  onSubmit:   (values: CreateMeetingFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function MeetingForm({ meeting, societyId, onSubmit, onCancel, isPending }: MeetingFormProps) {
  const form = useForm<CreateMeetingFormValues>({
    resolver:      zodResolver(createMeetingSchema),
    defaultValues: {
      society_id:   meeting?.society_id   ?? societyId,
      title:        meeting?.title        ?? '',
      meeting_type: meeting?.meeting_type ?? 'AGM',
      scheduled_at: meeting?.scheduled_at ?? '',
      status:       meeting?.status       ?? 'scheduled',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="title" label="Meeting Title" required>
          {(f) => <Input value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="e.g. Annual General Meeting" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="meeting_type" label="Type">
          {(f) => <SelectField value={f.value as string} onValueChange={f.onChange} options={MEETING_TYPE_OPTIONS} disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="scheduled_at" label="Scheduled At" required>
          {(f) => <Input type="datetime-local" value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="status" label="Status">
          {(f) => <SelectField value={f.value as string} onValueChange={f.onChange} options={MEETING_STATUS_OPTIONS} disabled={isPending} />}
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>{meeting ? 'Update' : 'Schedule'} Meeting</Button>
      </div>
    </form>
  );
}
