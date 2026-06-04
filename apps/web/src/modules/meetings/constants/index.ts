import type { MeetingType, MeetingStatus } from '@/api/meetings.api';

export const MEETING_TYPE_OPTIONS: { label: string; value: MeetingType }[] = [
  { label: 'AGM',       value: 'AGM' },
  { label: 'EGM',       value: 'EGM' },
  { label: 'Committee', value: 'COMMITTEE' },
];

export const MEETING_STATUS_OPTIONS: { label: string; value: MeetingStatus }[] = [
  { label: 'Scheduled',    value: 'scheduled' },
  { label: 'In Progress',  value: 'in_progress' },
  { label: 'Completed',    value: 'completed' },
  { label: 'Cancelled',    value: 'cancelled' },
];
