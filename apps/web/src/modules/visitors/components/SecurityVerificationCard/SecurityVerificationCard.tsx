import { Badge, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { VERIFICATION_STATUS_COLOR } from '../../constants/security.constants';
import type { SecurityVerification } from '../../types/security.types';

export interface SecurityVerificationCardProps {
  verification: SecurityVerification;
}

export function SecurityVerificationCard({ verification }: SecurityVerificationCardProps) {
  const statusVariant = VERIFICATION_STATUS_COLOR[verification.status] as 'warning' | 'success' | 'destructive' | 'secondary';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Security Verification</CardTitle>
        <Badge variant={statusVariant}>
          {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Method</p>
          <p className="font-medium capitalize">{verification.method.replace('_', ' ')}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Gate</p>
          <p className="font-medium">{verification.gateNumber}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Verified By</p>
          <p className="font-medium">{verification.verifiedBy}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Verified At</p>
          <p className="font-medium">{formatDate(verification.verifiedAt)}</p>
        </div>
        {verification.notes && (
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="text-sm">{verification.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
