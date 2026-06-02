import { KANBAN_COLUMNS } from '../../constants/status.constants';
import { ComplaintCard } from '../ComplaintCard';
import type { ComplaintListItem, ComplaintStatus } from '../../types/complaint.types';

export interface ComplaintKanbanProps {
  complaints: ComplaintListItem[];
  loading?:   boolean;
}

export function ComplaintKanban({ complaints, loading }: ComplaintKanbanProps) {
  const grouped = KANBAN_COLUMNS.reduce<Record<ComplaintStatus, ComplaintListItem[]>>(
    (acc, col) => {
      acc[col.id] = complaints.filter((c) => c.status === col.id);
      return acc;
    },
    {} as Record<ComplaintStatus, ComplaintListItem[]>,
  );

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((col) => (
          <div key={col.id} className="min-w-[280px] rounded-lg bg-muted p-3">
            <div className="mb-3 h-5 w-24 animate-pulse rounded bg-muted-foreground/20" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-2 h-28 animate-pulse rounded-md bg-muted-foreground/10" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {KANBAN_COLUMNS.map((col) => {
        const cards = grouped[col.id] ?? [];
        return (
          <div key={col.id} className="min-w-[280px] flex-shrink-0">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold">{col.label}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {cards.length}
              </span>
            </div>
            <div className="space-y-2">
              {cards.length === 0 ? (
                <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                  No complaints
                </div>
              ) : (
                cards.map((c) => <ComplaintCard key={c.id} complaint={c} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
