import { Badge } from '@ams/ui';

export interface VisitorStatusBadgeProps {
  status?: string;
  checkInAt?: string;
  checkOutAt?: string;
}

export function VisitorStatusBadge({ status, checkInAt, checkOutAt }: VisitorStatusBadgeProps) {
  if (checkOutAt) {
    return <Badge variant="outline">Checked Out</Badge>;
  }
  if (checkInAt) {
    return <Badge variant="success">Checked In</Badge>;
  }
  if (status) {
    const variant = status === 'active' ? 'success' : 'secondary';
    return <Badge variant={variant}>{status}</Badge>;
  }
  return <Badge variant="secondary">Not checked in</Badge>;
}
