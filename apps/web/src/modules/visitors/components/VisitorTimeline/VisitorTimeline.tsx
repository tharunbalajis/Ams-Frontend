import { formatDate } from '@/utils/formatDate';
import type { Visitor } from '../../types/visitor.types';

export interface VisitorTimelineProps {
  visitor: Visitor;
}

interface TimelineEvent {
  id:          string;
  title:       string;
  description?: string;
  timestamp:   string;
  done:        boolean;
}

export function VisitorTimeline({ visitor }: VisitorTimelineProps) {
  const events: TimelineEvent[] = [
    {
      id:          'registered',
      title:       'Visitor Registered',
      description: `Type: ${visitor.type.replace(/_/g, ' ')}`,
      timestamp:   visitor.createdAt,
      done:        true,
    },
    ...(visitor.actualEntryTime ? [{
      id:          'checked_in',
      title:       'Checked In',
      description: visitor.gateNumber ? `Gate ${visitor.gateNumber}` : undefined,
      timestamp:   visitor.actualEntryTime,
      done:        true,
    }] : []),
    ...(visitor.actualExitTime ? [{
      id:          'checked_out',
      title:       'Checked Out',
      timestamp:   visitor.actualExitTime,
      done:        true,
    }] : []),
  ];

  return (
    <div className="space-y-0">
      {events.map((event, idx) => (
        <div key={event.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`mt-1 h-3 w-3 rounded-full border-2 ${event.done ? 'border-primary bg-primary' : 'border-muted bg-background'}`} />
            {idx < events.length - 1 && (
              <div className="my-1 w-0.5 flex-1 bg-border" />
            )}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium">{event.title}</p>
            {event.description && (
              <p className="text-xs text-muted-foreground">{event.description}</p>
            )}
            <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(event.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
