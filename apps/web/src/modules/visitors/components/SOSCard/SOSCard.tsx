import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { SOS_STATUS_COLOR, SOS_TYPE_ICON } from '../../constants/sos.constants';
import type { SOSAlert } from '../../types/sos.types';

export interface SOSCardProps {
  alert:           SOSAlert;
  onAcknowledge?:  () => void;
  onResolve?:      () => void;
}

export function SOSCard({ alert, onAcknowledge, onResolve }: SOSCardProps) {
  const statusVariant = SOS_STATUS_COLOR[alert.status] as 'destructive' | 'warning' | 'success' | 'secondary';

  return (
    <Card className={alert.status === 'active' ? 'border-destructive' : undefined}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{SOS_TYPE_ICON[alert.type]}</span>
          <div>
            <CardTitle className="capitalize">{alert.type} Alert</CardTitle>
            <p className="text-sm text-muted-foreground">{alert.location}</p>
          </div>
        </div>
        <Badge variant={statusVariant}>
          {alert.status.replace('_', ' ')}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Raised By</p>
            <p className="font-medium">{alert.raisedBy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Raised At</p>
            <p className="font-medium">{formatDate(alert.createdAt)}</p>
          </div>
          {alert.acknowledgedBy && (
            <div>
              <p className="text-sm text-muted-foreground">Acknowledged By</p>
              <p className="font-medium">{alert.acknowledgedBy}</p>
            </div>
          )}
          {alert.resolvedBy && (
            <div>
              <p className="text-sm text-muted-foreground">Resolved By</p>
              <p className="font-medium">{alert.resolvedBy}</p>
            </div>
          )}
        </div>

        {alert.description && (
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm">{alert.description}</p>
          </div>
        )}

        {alert.resolutionNotes && (
          <div>
            <p className="text-sm text-muted-foreground">Resolution Notes</p>
            <p className="text-sm">{alert.resolutionNotes}</p>
          </div>
        )}

        {(onAcknowledge || onResolve) && alert.status !== 'resolved' && alert.status !== 'false_alarm' && (
          <div className="flex gap-3 pt-2">
            {alert.status === 'active' && onAcknowledge && (
              <Button variant="outline" onClick={onAcknowledge}>Acknowledge</Button>
            )}
            {onResolve && (
              <Button variant="destructive" onClick={onResolve}>Mark Resolved</Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
