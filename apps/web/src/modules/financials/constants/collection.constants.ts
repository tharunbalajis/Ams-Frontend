export const COLLECTION_RATE_THRESHOLDS = {
  EXCELLENT: 95,
  GOOD:      85,
  AVERAGE:   70,
} as const;

export const AGING_BUCKET_LABELS = [
  { label: 'Current',   days: '0–30' },
  { label: '31–60 Days', days: '31–60' },
  { label: '61–90 Days', days: '61–90' },
  { label: '90+ Days',   days: '90+' },
] as const;

export const NOTICE_STATUS_OPTIONS = [
  { label: 'No Notice',     value: 'none' },
  { label: 'First Notice',  value: 'first_notice' },
  { label: 'Second Notice', value: 'second_notice' },
  { label: 'Legal Action',  value: 'legal' },
] as const;
