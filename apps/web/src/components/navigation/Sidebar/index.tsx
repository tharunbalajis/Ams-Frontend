import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/useAuth';
import {
  LayoutDashboard,
  Users,
  Building2,
  Car,
  PawPrint,
  FileText,
  Shield,
  QrCode,
  Package,
  AlertTriangle,
  ClipboardList,
  DollarSign,
  Calendar,
  UserCog,
  Box,
  Megaphone,
  CalendarDays,
  ClipboardCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  Building,
  LogOut,
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
  children?: NavItem[];
}

interface NavGroup {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

// Navigation structure
const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    items: [{ label: 'Overview', href: '/dashboard' }],
  },
  {
    title: 'Residents & Units',
    icon: Users,
    items: [
      { label: 'Overview', href: '/residents' },
      { label: 'Resident Directory', href: '/residents/directory' },
      { label: 'Unit Management', href: '/units' },
      { label: 'Block Management', href: '/residents/blocks' },
      { label: 'Lease Agreements', href: '/residents/leases' },
      { label: 'Vehicle Management', href: '/residents/vehicles' },
      { label: 'Pet Management', href: '/residents/pets' },
    ],
  },
  {
    title: 'Visitor & Security',
    icon: Shield,
    items: [
      { label: 'Security Dashboard', href: '/visitors/security' },
      { label: 'Visitor Check-In', href: '/visitors/checkin' },
      { label: 'Visitor Logs', href: '/visitors' },
      { label: 'Guard Panel', href: '/visitors/guard' },
      { label: 'QR Entry', href: '/visitors/qr' },
      { label: 'Delivery Tracking', href: '/visitors/deliveries' },
      { label: 'Staff Attendance', href: '/visitors/attendance' },
      { label: 'SOS / Emergency', href: '/visitors/sos' },
      { label: 'Guest Passes', href: '/visitors/passes' },
    ],
  },
  {
    title: 'Complaints',
    icon: AlertTriangle,
    items: [
      { label: 'Dashboard', href: '/complaints/dashboard' },
      { label: 'Raise Complaint', href: '/complaints/new' },
      { label: 'Complaint Tracking', href: '/complaints' },
      { label: 'SLA Monitoring', href: '/complaints/sla' },
      { label: 'Escalation Queue', href: '/complaints/escalation' },
      { label: 'Maintenance Requests', href: '/complaints/maintenance' },
    ],
  },
  {
    title: 'Finance',
    icon: DollarSign,
    items: [
      { label: 'Finance Dashboard', href: '/financials' },
      { label: 'Invoices', href: '/financials/invoices' },
      { label: 'Payments', href: '/financials/payments' },
      { label: 'Expense Tracking', href: '/financials/expenses' },
      { label: 'GST Reports', href: '/financials/gst' },
      { label: 'Penalty Management', href: '/financials/penalties' },
      { label: 'Financial Reports', href: '/financials/reports' },
    ],
  },
  {
    title: 'Amenity Booking',
    icon: Calendar,
    items: [{ label: 'Amenities', href: '/amenities' }],
  },
  {
    title: 'Staff & Vendors',
    icon: UserCog,
    items: [{ label: 'Staff', href: '/staff' }],
  },
  {
    title: 'Assets & Inventory',
    icon: Box,
    items: [{ label: 'Assets', href: '/assets' }],
  },
  {
    title: 'Communication',
    icon: Megaphone,
    items: [{ label: 'Notices', href: '/notices' }],
  },
  {
    title: 'Meetings',
    icon: CalendarDays,
    items: [{ label: 'Meetings', href: '/meetings' }],
  },
  {
    title: 'Compliance',
    icon: ClipboardCheck,
    items: [{ label: 'Compliance', href: '/compliance' }],
  },
  {
    title: 'Settings',
    icon: Settings,
    items: [{ label: 'Settings', href: '/settings' }],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    // Auto-expand the group that contains the current path
    const expanded: Record<string, boolean> = {};
    NAV_GROUPS.forEach((group) => {
      const isActive = group.items.some(
        (item) => item.href && location.pathname.startsWith(item.href)
      );
      expanded[group.title] = isActive;
    });
    return expanded;
  });

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside
      className={`flex h-full flex-col border-r bg-white transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">AMS</span>
          </div>
        )}
        {collapsed && (
          <button
            onClick={onToggle}
            className="mx-auto flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
          >
            <Building2 className="h-5 w-5 text-blue-600" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="px-2">
            {/* Group Header */}
            {!collapsed ? (
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <group.icon className="h-4 w-4" />
                  <span>{group.title}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expandedGroups[group.title] ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex w-full items-center justify-center rounded-lg p-2 hover:bg-gray-100"
                title={group.title}
              >
                <group.icon className="h-5 w-5 text-gray-500" />
              </button>
            )}

            {/* Group Items */}
            {(!collapsed && expandedGroups[group.title]) && (
              <div className="ml-4 mt-1 space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href || '#'}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-l-[3px] border-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Collapsed items - show as tooltip */}
            {collapsed && expandedGroups[group.title] && (
              <div className="ml-2 mt-1 space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href || '#'}
                    className={({ isActive }) =>
                      `flex items-center justify-center rounded-lg p-2 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-l-[3px] border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                    title={item.label}
                  >
                    {item.label[0]}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer - User & Society */}
      <div className="border-t p-3">
        {!collapsed ? (
          <>
            {/* Society Selector */}
            <button className="flex w-full items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2 text-sm">
              <Building className="h-4 w-4 text-gray-500" />
              <span className="flex-1 text-left font-medium">Green Valley</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>

            {/* User */}
            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                {user ? getInitials(user.full_name || 'U') : 'U'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">
                  {user?.full_name || 'User'}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {user?.role || 'Admin'}
                </p>
              </div>
              <button
                onClick={() => logout()}
                className="rounded p-1 hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
              {user ? getInitials(user.full_name || 'U')[0] : 'U'}
            </div>
            <button
              onClick={() => logout()}
              className="rounded p-1 hover:bg-gray-100"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;