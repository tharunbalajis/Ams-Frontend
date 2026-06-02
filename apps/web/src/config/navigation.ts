import { ROUTES } from '@/app/router/routeConfig';
import type { NavigationGroup } from '@/types/navigation.types';

export const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    key: 'main',
    items: [
      { key: 'dashboard', label: 'Dashboard', href: ROUTES.DASHBOARD, permission: 'dashboard:view' },
    ],
  },
  {
    key: 'management',
    label: 'Management',
    items: [
      { key: 'residents',  label: 'Residents',  href: ROUTES.RESIDENTS,  permission: 'residents:view' },
      { key: 'units',      label: 'Units',       href: ROUTES.UNITS,      permission: 'units:view' },
      { key: 'visitors',   label: 'Visitors',    href: ROUTES.VISITORS,   permission: 'visitors:view' },
      { key: 'complaints', label: 'Complaints',  href: ROUTES.COMPLAINTS, permission: 'complaints:view' },
    ],
  },
  {
    key: 'operations',
    label: 'Operations',
    items: [
      { key: 'financials', label: 'Financials', href: ROUTES.FINANCIALS, permission: 'financials:view' },
      { key: 'amenities',  label: 'Amenities',  href: ROUTES.AMENITIES,  permission: 'amenities:manage' },
      { key: 'staff',      label: 'Staff',       href: ROUTES.STAFF,      permission: 'staff:manage' },
      { key: 'assets',     label: 'Assets',      href: ROUTES.ASSETS,     permission: 'assets:manage' },
    ],
  },
  {
    key: 'communication',
    label: 'Communication',
    items: [
      { key: 'notices',  label: 'Notices',  href: ROUTES.NOTICES,  permission: 'notices:view' },
      { key: 'meetings', label: 'Meetings', href: ROUTES.MEETINGS, permission: 'meetings:manage' },
    ],
  },
  {
    key: 'system',
    label: 'System',
    items: [
      { key: 'compliance', label: 'Compliance', href: ROUTES.COMPLIANCE, permission: 'compliance:manage' },
      { key: 'settings',   label: 'Settings',   href: ROUTES.SETTINGS,   permission: 'settings:manage' },
    ],
  },
];
