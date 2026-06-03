import type { SOSAlertType, SOSAlertStatus } from '../types/sos.types';

export const SOS_ALERT_TYPE_OPTIONS: { label: string; value: SOSAlertType }[] = [
  { label: 'Medical',   value: 'MEDICAL' },
  { label: 'Fire',      value: 'FIRE' },
  { label: 'Security',  value: 'SECURITY' },
  { label: 'Intrusion', value: 'INTRUSION' },
  { label: 'Other',     value: 'OTHER' },
];

export const SOS_ALERT_STATUS_OPTIONS: { label: string; value: SOSAlertStatus }[] = [
  { label: 'Active',       value: 'ACTIVE' },
  { label: 'Acknowledged', value: 'ACKNOWLEDGED' },
  { label: 'Resolved',     value: 'RESOLVED' },
  { label: 'False Alarm',  value: 'FALSE_ALARM' },
];

export const SOS_STATUS_COLOR: Record<SOSAlertStatus, string> = {
  ACTIVE:       'destructive',
  ACKNOWLEDGED: 'warning',
  RESOLVED:     'success',
  FALSE_ALARM:  'secondary',
};

export const SOS_TYPE_ICON: Record<SOSAlertType, string> = {
  MEDICAL:   '🚑',
  FIRE:      '🔥',
  SECURITY:  '🚨',
  INTRUSION: '🚪',
  OTHER:     '⚠️',
};
