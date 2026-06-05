import { Button, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { Visitor } from '../../types/visitor.types';

export interface VisitorDetailCardProps {
  visitor:    Visitor;
  onCheckIn?:  () => void;
  onCheckOut?: () => void;
}

export function VisitorDetailCard({ visitor, onCheckIn, onCheckOut }: VisitorDetailCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{visitor.visitor_name}</CardTitle>
          <p className="text-sm text-muted-foreground">{visitor.visitor_mobile ?? '—'}</p>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Type</p>
          <p className="font-medium capitalize">{visitor.visitor_type.replace(/_/g, ' ').toLowerCase()}</p>
        </div>
        {visitor.purpose && (
          <div>
            <p className="text-sm text-muted-foreground">Purpose</p>
            <p className="font-medium">{visitor.purpose}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground">Unit</p>
          <p className="font-medium">Unit {visitor.unit_id}</p>
        </div>
        {visitor.check_in_at && (
          <div>
            <p className="text-sm text-muted-foreground">Check In</p>
            <p className="font-medium">{formatDate(visitor.check_in_at)}</p>
          </div>
        )}
        {visitor.check_out_at && (
          <div>
            <p className="text-sm text-muted-foreground">Check Out</p>
            <p className="font-medium">{formatDate(visitor.check_out_at)}</p>
          </div>
        )}
      </CardContent>

      {(onCheckIn || onCheckOut) && (
        <div className="flex gap-3 border-t px-6 py-4">
          {!visitor.check_in_at && onCheckIn && (
            <Button onClick={onCheckIn}>Check In</Button>
          )}
          {visitor.check_in_at && !visitor.check_out_at && onCheckOut && (
            <Button variant="outline" onClick={onCheckOut}>Check Out</Button>
          )}
        </div>
      )}
    </Card>
  );
}
