import type { NoticeType } from '@/api/notices.api';

export const NOTICE_TYPE_OPTIONS: { label: string; value: NoticeType }[] = [
  { label: 'General',     value: 'GENERAL' },
  { label: 'Emergency',   value: 'EMERGENCY' },
  { label: 'Maintenance', value: 'MAINTENANCE' },
];
