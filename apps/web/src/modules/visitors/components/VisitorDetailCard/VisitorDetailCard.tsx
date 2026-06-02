import { Button, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { VisitorStatusBadge } from '../VisitorStatusBadge';
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
          <CardTitle>{visitor.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{visitor.mobile}</p>
        </div>
        <div className="flex items-center gap-2">
          <VisitorStatusBadge visitorStatus={visitor.status} />
          <VisitorStatusBadge entryStatus={visitor.entryStatus} />
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Type</p>
          <p className="font-medium capitalize">{visitor.type.replace('_', ' ')}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Purpose</p>
          <p className="font-medium">{visitor.purposeOfVisit}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Resident</p>
          <p className="font-medium">{visitor.residentName}</p>
          <p className="text-xs text-muted-foreground">Unit {visitor.unitNumber}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Expected Entry</p>
          <p className="font-medium">{formatDate(visitor.expectedEntryTime)}</p>
        </div>
        {visitor.actualEntryTime && (
          <div>
            <p className="text-sm text-muted-foreground">Actual Entry</p>
            <p className="font-medium">{formatDate(visitor.actualEntryTime)}</p>
          </div>
        )}
        {visitor.actualExitTime && (
          <div>
            <p className="text-sm text-muted-foreground">Actual Exit</p>
            <p className="font-medium">{formatDate(visitor.actualExitTime)}</p>
          </div>
        )}
        {visitor.vehicleNumber && (
          <div>
            <p className="text-sm text-muted-foreground">Vehicle</p>
            <p className="font-medium">{visitor.vehicleNumber}</p>
          </div>
        )}
        {visitor.gateNumber && (
          <div>
            <p className="text-sm text-muted-foreground">Gate</p>
            <p className="font-medium">{visitor.gateNumber}</p>
          </div>
        )}
        {visitor.isPreApproved && (
          <div>
            <p className="text-sm text-muted-foreground">Pre-Approved</p>
            <p className="font-medium text-green-600">Yes</p>
          </div>
        )}
      </CardContent>

      {(onCheckIn || onCheckOut) && (
        <div className="flex gap-3 border-t px-6 py-4">
          {visitor.entryStatus === 'expected' && onCheckIn && (
            <Button onClick={onCheckIn}>Check In</Button>
          )}
          {visitor.entryStatus === 'checked_in' && onCheckOut && (
            <Button variant="outline" onClick={onCheckOut}>Check Out</Button>
          )}
        </div>
      )}
    </Card>
  );
}
