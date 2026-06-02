import { STATUS_FLOW } from '../../constants/status.constants';
import type { ComplaintStatus } from '../../types/complaint.types';

export interface StatusStepperProps {
  currentStatus: ComplaintStatus;
}

export function StatusStepper({ currentStatus }: StatusStepperProps) {
  const steps  = STATUS_FLOW;
  const active = steps.indexOf(currentStatus);

  return (
    <ol className="flex items-center gap-0">
      {steps.map((step, idx) => {
        const isDone    = idx < active;
        const isCurrent = idx === active;

        return (
          <li key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold',
                  isDone    ? 'border-primary bg-primary text-primary-foreground' : '',
                  isCurrent ? 'border-primary bg-background text-primary' : '',
                  !isDone && !isCurrent ? 'border-muted bg-muted text-muted-foreground' : '',
                ].join(' ')}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span className={`mt-1 text-xs ${isCurrent ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                {step.replace('_', ' ')}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 flex-1 ${idx < active ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
