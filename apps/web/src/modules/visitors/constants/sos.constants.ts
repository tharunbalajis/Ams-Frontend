import type { SOSAlertType, SOSAlertStatus } from '../types/sos.types';

export const SOS_ALERT_TYPE_OPTIONS: { label: string; value: SOSAlertType }[] = [
  { label: 'Medical',   value: 'medical' },
  { label: 'Fire',      value: 'fire' },
  { label: 'Security',  value: 'security' },
  { label: 'Intrusion', value: 'intrusion' },
  { label: 'Other',     value: 'other' },
];

export const SOS_ALERT_STATUS_OPTIONS: { label: string; value: SOSAlertStatus }[] = [
  { label: 'Active',       value: 'active' },
  { label: 'Acknowledged', value: 'acknowledged' },
  { label: 'Resolved',     value: 'resolved' },
  { label: 'False Alarm',  value: 'false_alarm' },
];

export const SOS_STATUS_COLOR: Record<SOSAlertStatus, string> = {
  active:       'destructive',
  acknowledged: 'warning',
  resolved:     'success',
  false_alarm:  'secondary',
};

export const SOS_TYPE_ICON: Record<SOSAlertType, string> = {
  medical:   '🚑',
  fire:      '🔥',
  security:  '🚨',
  intrusion: '🚪',
  other:     '⚠️',
};
