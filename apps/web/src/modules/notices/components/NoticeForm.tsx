import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input, SelectField, TextArea } from '@ams/ui';
import { createNoticeSchema, type CreateNoticeFormValues } from '../schemas/notice.schema';
import { NOTICE_TYPE_OPTIONS } from '../constants';
import type { Notice } from '@/api/notices.api';

export interface NoticeFormProps {
  notice?:    Notice;
  userId:     string;
  onSubmit:   (values: CreateNoticeFormValues) => void;
  onCancel?:  () => void;
  isPending?: boolean;
}

export function NoticeForm({ notice, userId, onSubmit, onCancel, isPending }: NoticeFormProps) {
  const form = useForm<CreateNoticeFormValues>({
    resolver:      zodResolver(createNoticeSchema),
    defaultValues: {
      title:       notice?.title       ?? '',
      description: notice?.description ?? '',
      created_by:  notice?.created_by  ?? userId,
      notice_type: notice?.notice_type ?? 'GENERAL',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField control={form.control} name="title" label="Title" required>
          {(f) => <Input value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="Notice title" disabled={isPending} />}
        </FormField>

        <FormField control={form.control} name="notice_type" label="Type">
          {(f) => <SelectField value={f.value as string} onValueChange={f.onChange} options={NOTICE_TYPE_OPTIONS} disabled={isPending} />}
        </FormField>
      </div>

      <FormField control={form.control} name="description" label="Description" required>
        {(f) => <TextArea value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} rows={4} placeholder="Notice content..." disabled={isPending} />}
      </FormField>

      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={isPending}>{notice ? 'Update' : 'Publish'} Notice</Button>
      </div>
    </form>
  );
}
