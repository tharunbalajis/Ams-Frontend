import { Badge } from '@ams/ui';
import type { EntryStatus, VisitorStatus } from '../../types/visitor.types';

export interface VisitorStatusBadgeProps {
  entryStatus?:   EntryStatus;
  visitorStatus?: VisitorStatus;
}

const ENTRY_VARIANT: Record<EntryStatus, 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'> = {
  EXPECTED:    'secondary',
  CHECKED_IN:  'success',
  CHECKED_OUT: 'outline',
  OVERSTAY:    'destructive',
  NO_SHOW:     'warning',
};

const VISITOR_VARIANT: Record<VisitorStatus, 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'> = {
  PENDING:     'warning',
  APPROVED:    'success',
  REJECTED:    'destructive',
  BLACKLISTED: 'destructive',
};

const ENTRY_LABEL: Record<EntryStatus, string> = {
  EXPECTED:    'Expected',
  CHECKED_IN:  'Checked In',
  CHECKED_OUT: 'Checked Out',
  OVERSTAY:    'Overstay',
  NO_SHOW:     'No Show',
};

const VISITOR_LABEL: Record<VisitorStatus, string> = {
  PENDING:     'Pending',
  APPROVED:    'Approved',
  REJECTED:    'Rejected',
  BLACKLISTED: 'Blacklisted',
};

export function VisitorStatusBadge({ entryStatus, visitorStatus }: VisitorStatusBadgeProps) {
  if (entryStatus) {
    return <Badge variant={ENTRY_VARIANT[entryStatus]}>{ENTRY_LABEL[entryStatus]}</Badge>;
  }
  if (visitorStatus) {
    return <Badge variant={VISITOR_VARIANT[visitorStatus]}>{VISITOR_LABEL[visitorStatus]}</Badge>;
  }
  return null;
}
