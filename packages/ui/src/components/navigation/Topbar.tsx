import * as React from 'react';
import { cn } from '../../styles/theme';

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  onMenuToggle?: () => void;
  searchSlot?: React.ReactNode;
  actionsSlot?: React.ReactNode;
  userSlot?: React.ReactNode;
  logo?: React.ReactNode;
}

const Topbar = React.forwardRef<HTMLElement, TopbarProps>(
  ({ className, onMenuToggle, searchSlot, actionsSlot, userSlot, logo, ...props }, ref) => (
    <header
      ref={ref}
      className={cn('flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6', className)}
      {...props}
    >
      {onMenuToggle && (
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </button>
      )}
      {logo && <div className="flex items-center">{logo}</div>}
      {searchSlot && <div className="flex-1 max-w-sm">{searchSlot}</div>}
      <div className="ml-auto flex items-center gap-2">
        {actionsSlot}
        {userSlot}
      </div>
    </header>
  ),
);
Topbar.displayName = 'Topbar';

export { Topbar };
