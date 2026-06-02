import { Badge, Card, CardContent, CardHeader, CardTitle, StatusBadge } from '@ams/ui';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate }     from '@/utils/formatDate';
import type { Lease }     from '../../types/lease.types';
import type { ID }        from '@/types/common.types';

export interface LeaseSectionProps {
  lease:      Lease | null;
  residentId: ID;
}

export function LeaseSection({ lease }: LeaseSectionProps) {
  if (!lease) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Lease Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No active lease on file.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Lease Information</CardTitle>
          <StatusBadge status={lease.status} />
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          <LeaseField label="Start Date"      value={formatDate(lease.startDate)} />
          <LeaseField label="End Date"        value={formatDate(lease.endDate)} />
          <LeaseField label="Monthly Rent"    value={formatCurrency(lease.monthlyRent)} />
          <LeaseField label="Deposit Amount"  value={formatCurrency(lease.depositAmount)} />
          <LeaseField
            label="Agreement"
            value={
              lease.agreementUrl
                ? <a href={lease.agreementUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm">View Document</a>
                : <Badge variant="muted">Not uploaded</Badge>
            }
          />
        </dl>
      </CardContent>
    </Card>
  );
}

function LeaseField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}
