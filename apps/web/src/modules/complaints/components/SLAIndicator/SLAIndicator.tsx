import { Progress } from '@ams/ui';
import { SLABadge } from '../SLABadge';
import type { SLA } from '../../types/sla.types';

export interface SLAIndicatorProps {
  sla: SLA;
}

function calcProgress(sla: SLA): number {
  const start   = new Date(sla.startTime).getTime();
  const due     = new Date(sla.dueTime).getTime();
  const now     = Date.now();
  const elapsed = now - start;
  const total   = due - start;
  return Math.min(100, Math.round((elapsed / total) * 100));
}

export function SLAIndicator({ sla }: SLAIndicatorProps) {
  const progress = calcProgress(sla);
  const color    = sla.status === 'breached' ? 'destructive' : sla.status === 'at_risk' ? 'warning' : 'default';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">SLA</span>
        <SLABadge
          status={sla.status}
          remainingMinutes={sla.remainingMinutes ?? undefined}
          breached={sla.status === 'breached'}
        />
      </div>
      <Progress value={progress} variant={color} />
      <p className="text-xs text-muted-foreground">
        Target: {sla.targetHours}h · Due: {new Date(sla.dueTime).toLocaleString()}
      </p>
    </div>
  );
}
