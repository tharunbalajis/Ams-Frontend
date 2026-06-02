import * as React from 'react';
import { cn } from '../../styles/theme';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const ChevronSep = () => (
  <svg className="h-4 w-4 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, separator, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={cn('flex items-center', className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span>{separator ?? <ChevronSep />}</span>}
              {isLast || (!item.href && !item.onClick) ? (
                <span
                  className={cn('text-sm', isLast ? 'font-medium text-foreground' : 'text-muted-foreground', item.onClick && 'cursor-pointer hover:text-foreground')}
                  onClick={item.onClick}
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} onClick={item.onClick} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  ),
);
Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
