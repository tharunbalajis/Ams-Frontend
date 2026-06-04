export {
  COMPLAINT_ROUTES,
  COMPLAINT_PAGE_SIZE,
} from './complaint.constants';

export {
  PRIORITY_OPTIONS,
  PRIORITY_COLOR,
  PRIORITY_WEIGHT,
} from './priority.constants';

export {
  STATUS_OPTIONS,
  STATUS_COLOR,
  STATUS_FLOW,
  KANBAN_COLUMNS,
} from './status.constants';

export const COMPLAINT_CATEGORY_OPTIONS = [
  { label: 'Maintenance', value: 'MAINTENANCE' },
  { label: 'Security',    value: 'SECURITY' },
  { label: 'Cleanliness', value: 'CLEANLINESS' },
  { label: 'Noise',       value: 'NOISE' },
  { label: 'Parking',     value: 'PARKING' },
  { label: 'Other',       value: 'OTHER' },
];
