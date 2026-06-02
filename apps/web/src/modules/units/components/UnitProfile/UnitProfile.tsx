import { Badge, Card, CardContent, CardHeader, CardTitle, StatusBadge } from '@ams/ui';
import type { Unit } from '../../types/unit.types';
import type { OccupancyRecord } from '../../types/occupancy.types';
import type { Ownership } from '../../types/ownership.types';

export interface UnitProfileProps {
  unit:       Unit;
  occupancy?: OccupancyRecord;
  ownership?: Ownership;
}

export function UnitProfile({ unit, occupancy, ownership }: UnitProfileProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Unit Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">Unit Number</p>
            <p className="font-semibold">{unit.unitNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Block / Tower</p>
            <Badge variant="outline">{unit.block}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Floor</p>
            <p className="font-semibold">{unit.floor}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            <p className="font-semibold uppercase">{unit.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Square Feet</p>
            <p className="font-semibold">{unit.squareFeet} sq ft</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ownership</p>
            <p className="font-semibold capitalize">{unit.ownershipType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Occupancy</p>
            <StatusBadge status={unit.occupancyStatus} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Residents</p>
            <p className="font-semibold">{unit.residentCount}</p>
          </div>
        </CardContent>
      </Card>

      {occupancy && (
        <Card>
          <CardHeader>
            <CardTitle>Current Occupancy</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <StatusBadge status={occupancy.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Since</p>
              <p className="font-semibold">{occupancy.startDate}</p>
            </div>
            {occupancy.notes && (
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p>{occupancy.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {ownership && (
        <Card>
          <CardHeader>
            <CardTitle>Ownership</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Owner</p>
              <p className="font-semibold">{ownership.owner.name}</p>
              <p className="text-sm text-muted-foreground">{ownership.owner.email}</p>
            </div>
            {ownership.tenant && (
              <div>
                <p className="text-sm text-muted-foreground">Tenant</p>
                <p className="font-semibold">{ownership.tenant.name}</p>
                <p className="text-sm text-muted-foreground">{ownership.tenant.email}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
