import { cn } from '../../styles/theme';

export interface TimelineItem {
  id:           string;
  title:        string;
  description?: string;
  timestamp?:   string;
  status?:      'completed' | 'pending' | 'active';
  meta?:        string;
}

export interface TimelineProps {
  items:     TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('relative border-l border-border', className)}>
      {items.map((item, idx) => (
        <li key={item.id} className={cn('mb-6 ml-6', idx === items.length - 1 && 'mb-0')}>
          <span
            className={cn(
              'absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-background',
              item.status === 'completed' && 'bg-primary',
              item.status === 'active'    && 'bg-yellow-400',
              item.status === 'pending'   && 'bg-muted',
              !item.status                && 'bg-muted',
            )}
          />
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium leading-none">{item.title}</p>
            {item.meta && (
              <span className="text-xs text-muted-foreground">{item.meta}</span>
            )}
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          )}
          {item.timestamp && (
            <time className="mt-1 block text-xs text-muted-foreground">{item.timestamp}</time>
          )}
        </li>
      ))}
    </ol>
  );
}
