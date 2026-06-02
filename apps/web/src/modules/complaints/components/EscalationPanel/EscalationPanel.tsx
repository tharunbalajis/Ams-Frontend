import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { ESCALATION_STATUS_COLOR, ESCALATION_LEVEL_OPTIONS } from '../../constants/escalation.constants';
import type { Escalation } from '../../types/escalation.types';

export interface EscalationPanelProps {
  escalations: Escalation[];
  onEscalate?: () => void;
}

export function EscalationPanel({ escalations, onEscalate }: EscalationPanelProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Escalations</CardTitle>
        {onEscalate && (
          <Button variant="destructive" size="sm" onClick={onEscalate}>
            Escalate
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {escalations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No escalations recorded.</p>
        ) : (
          <ul className="divide-y">
            {escalations.map((e) => {
              const statusVariant = ESCALATION_STATUS_COLOR[e.status] as 'destructive' | 'warning' | 'success';
              const levelLabel    = ESCALATION_LEVEL_OPTIONS.find((o) => o.value === e.level)?.label ?? `Level ${e.level}`;

              return (
                <li key={e.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{levelLabel}</span>
                    <Badge variant={statusVariant}>{e.status.charAt(0).toUpperCase() + e.status.slice(1)}</Badge>
                  </div>
                  <p className="text-sm">Escalated to: {e.escalatedTo}</p>
                  <p className="text-sm text-muted-foreground">{e.reason}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(e.escalatedAt)}</p>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
