import { Card, CardContent, CardHeader, CardTitle, StatusBadge } from '@ams/ui';
import type { OccupancyRecord } from '../../api/occupancy.api';

export interface OccupancyCardProps {
  occupancy: OccupancyRecord;
}

export function OccupancyCard({ occupancy }: OccupancyCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Occupancy</CardTitle>
        <StatusBadge status={occupancy.status} />
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">From</span>
          <span>{occupancy.startDate}</span>
        </div>
        {occupancy.endDate && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Until</span>
            <span>{occupancy.endDate}</span>
          </div>
        )}
        {occupancy.notes && (
          <p className="text-muted-foreground">{occupancy.notes}</p>
        )}
      </CardContent>
    </Card>
  );
}
