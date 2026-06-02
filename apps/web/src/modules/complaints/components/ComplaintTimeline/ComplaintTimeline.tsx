import { Timeline } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { ComplaintTimelineEvent } from '../../types/complaint.types';

export interface ComplaintTimelineProps {
  events:   ComplaintTimelineEvent[];
  loading?: boolean;
}

export function ComplaintTimeline({ events, loading }: ComplaintTimelineProps) {
  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading timeline…</p>;
  }

  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground">No timeline events yet.</p>;
  }

  return (
    <Timeline
      items={events.map((e) => ({
        id:          e.id,
        title:       e.event,
        description: e.description ?? undefined,
        timestamp:   formatDate(e.timestamp),
        status:      'completed' as const,
        meta:        `by ${e.performedBy}`,
      }))}
    />
  );
}
