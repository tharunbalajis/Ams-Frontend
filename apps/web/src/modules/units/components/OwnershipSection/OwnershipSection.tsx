import { Button, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { Ownership } from '../../types/ownership.types';

export interface OwnershipSectionProps {
  ownership:  Ownership;
  history?:   Ownership[];
  onAssign?:  () => void;
}

export function OwnershipSection({ ownership, history = [], onAssign }: OwnershipSectionProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ownership</CardTitle>
          {onAssign && (
            <Button variant="outline" size="sm" onClick={onAssign}>
              Reassign
            </Button>
          )}
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Ownership Type</p>
            <p className="font-semibold capitalize">{ownership.ownershipType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Since</p>
            <p className="font-semibold">{formatDate(ownership.startDate)}</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-muted-foreground">Owner</p>
            <p className="font-semibold">{ownership.owner.name}</p>
            <p className="text-sm">{ownership.owner.email}</p>
            <p className="text-sm">{ownership.owner.phone}</p>
          </div>

          {ownership.tenant && (
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">Tenant</p>
              <p className="font-semibold">{ownership.tenant.name}</p>
              <p className="text-sm">{ownership.tenant.email}</p>
              <p className="text-sm">{ownership.tenant.phone}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ownership History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {history.map((record) => (
                <li key={record.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">{record.owner.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{record.ownershipType}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(record.startDate)}
                    {record.endDate ? ` — ${formatDate(record.endDate)}` : ' — Present'}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
