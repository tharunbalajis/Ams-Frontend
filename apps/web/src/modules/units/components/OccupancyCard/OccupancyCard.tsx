import { Button, Card, CardContent, CardHeader, CardTitle, StatusBadge } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { OccupancyRecord } from '../../types/occupancy.types';

export interface OccupancyCardProps {
  occupancy:  OccupancyRecord;
  onEdit?:    () => void;
}

export function OccupancyCard({ occupancy, onEdit }: OccupancyCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Occupancy Status</CardTitle>
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            Update
          </Button>
        )}
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Current Status</p>
          <StatusBadge status={occupancy.status} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Since</p>
          <p className="font-semibold">{formatDate(occupancy.startDate)}</p>
        </div>
        {occupancy.endDate && (
          <div>
            <p className="text-sm text-muted-foreground">Until</p>
            <p className="font-semibold">{formatDate(occupancy.endDate)}</p>
          </div>
        )}
        {occupancy.notes && (
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="text-sm">{occupancy.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
