import { Badge, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import type { Unit } from '../../types/unit.types';

export interface UnitProfileProps {
  unit: Unit;
}

export function UnitProfile({ unit }: UnitProfileProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Unit Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">Unit Number</p>
            <p className="font-semibold">{unit.unit_number}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Block</p>
            {unit.block_name
              ? <Badge variant="outline">{unit.block_name}</Badge>
              : <span className="text-muted-foreground">—</span>
            }
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Floor</p>
            <p className="font-semibold">{unit.floor_number ?? '—'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            <p className="font-semibold">{unit.unit_type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Super Built Up</p>
            <p className="font-semibold">{unit.super_built_up ? `${unit.super_built_up} sq ft` : '—'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Carpet Area</p>
            <p className="font-semibold">{unit.carpet_area ? `${unit.carpet_area} sq ft` : '—'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ownership</p>
            <p className="font-semibold">{unit.ownership_type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Parking</p>
            <p className="font-semibold">{unit.parking_slots}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant={unit.is_active ? 'success' : 'secondary'}>
              {unit.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
