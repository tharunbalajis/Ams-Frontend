import { Badge } from '@ams/ui';
import type { EntryStatus, VisitorStatus } from '../../types/visitor.types';

export interface VisitorStatusBadgeProps {
  entryStatus?:   EntryStatus;
  visitorStatus?: VisitorStatus;
}

const ENTRY_VARIANT: Record<EntryStatus, 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'> = {
  expected:    'secondary',
  checked_in:  'success',
  checked_out: 'outline',
  overstay:    'destructive',
  no_show:     'warning',
};

const VISITOR_VARIANT: Record<VisitorStatus, 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'> = {
  pending:     'warning',
  approved:    'success',
  rejected:    'destructive',
  blacklisted: 'destructive',
};

const ENTRY_LABEL: Record<EntryStatus, string> = {
  expected:    'Expected',
  checked_in:  'Checked In',
  checked_out: 'Checked Out',
  overstay:    'Overstay',
  no_show:     'No Show',
};

const VISITOR_LABEL: Record<VisitorStatus, string> = {
  pending:     'Pending',
  approved:    'Approved',
  rejected:    'Rejected',
  blacklisted: 'Blacklisted',
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
