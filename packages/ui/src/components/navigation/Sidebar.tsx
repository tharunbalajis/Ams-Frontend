import * as React from 'react';
import { cn } from '../../styles/theme';

export interface NavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
}

export interface NavGroup {
  key: string;
  label?: string;
  items: NavItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  groups: NavGroup[];
  activeKey?: string;
  onItemClick?: (item: NavItem) => void;
  collapsed?: boolean;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

const SidebarNavItem: React.FC<{
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick?: (item: NavItem) => void;
}> = ({ item, active, collapsed, onClick }) => (
  <button
    type="button"
    onClick={() => onClick?.(item)}
    title={collapsed ? item.label : undefined}
    className={cn(
      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
      active
        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
      collapsed && 'justify-center px-2',
    )}
  >
    {item.icon && (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">{item.icon}</span>
    )}
    {!collapsed && (
      <>
        <span className="flex-1 truncate text-left">{item.label}</span>
        {item.badge != null && (
          <span className="ml-auto flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
            {item.badge}
          </span>
        )}
      </>
    )}
  </button>
);

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, groups, activeKey, onItemClick, collapsed = false, logo, footer, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        'flex h-full flex-col overflow-hidden border-r bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
      {...props}
    >
      {logo && (
        <div className={cn('flex h-14 shrink-0 items-center border-b px-4', collapsed && 'justify-center px-2')}>
          {logo}
        </div>
      )}
      <nav className="flex-1 overflow-y-auto p-2">
        {groups.map((group, i) => (
          <div key={group.key} className={cn('mb-1', i > 0 && 'mt-4')}>
            {group.label && !collapsed && (
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarNavItem
                  key={item.key}
                  item={item}
                  active={activeKey === item.key}
                  collapsed={collapsed}
                  onClick={onItemClick}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
      {footer && (
        <div className={cn('shrink-0 border-t p-2', collapsed && 'flex justify-center')}>
          {footer}
        </div>
      )}
    </aside>
  ),
);
Sidebar.displayName = 'Sidebar';

export { Sidebar };
