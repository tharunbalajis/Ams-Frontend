import { Timeline } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { Visitor } from '../../types/visitor.types';

export interface VisitorTimelineProps {
  visitor: Visitor;
}

export function VisitorTimeline({ visitor }: VisitorTimelineProps) {
  const events = [
    {
      id:          'registered',
      title:       'Visitor Registered',
      description: `Registered as ${visitor.type.replace('_', ' ')}`,
      timestamp:   visitor.createdAt,
      status:      'completed' as const,
    },
    ...(visitor.actualEntryTime ? [{
      id:          'checked_in',
      title:       'Checked In',
      description: visitor.gateNumber ? `Gate ${visitor.gateNumber}` : undefined,
      timestamp:   visitor.actualEntryTime,
      status:      'completed' as const,
    }] : []),
    ...(visitor.actualExitTime ? [{
      id:          'checked_out',
      title:       'Checked Out',
      description: `Duration: ${visitor.actualEntryTime ? 'calculated' : 'N/A'}`,
      timestamp:   visitor.actualExitTime,
      status:      'completed' as const,
    }] : []),
  ];

  return (
    <Timeline
      items={events.map((e) => ({
        id:          e.id,
        title:       e.title,
        description: e.description,
        timestamp:   formatDate(e.timestamp),
        status:      e.status,
      }))}
    />
  );
}
