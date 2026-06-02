export const PERMISSIONS = {
  Dashboard: {
    View: 'dashboard:view',
  },
  Residents: {
    View:   'residents:view',
    Create: 'residents:create',
    Update: 'residents:update',
    Delete: 'residents:delete',
  },
  Units: {
    View:   'units:view',
    Create: 'units:create',
    Update: 'units:update',
    Delete: 'units:delete',
  },
  Visitors: {
    View:   'visitors:view',
    Create: 'visitors:create',
    Update: 'visitors:update',
  },
  Complaints: {
    View:   'complaints:view',
    Manage: 'complaints:manage',
  },
  Financials: {
    View:   'financials:view',
    Manage: 'financials:manage',
  },
  Amenities: {
    Manage: 'amenities:manage',
  },
  Staff: {
    Manage: 'staff:manage',
  },
  Assets: {
    Manage: 'assets:manage',
  },
  Notices: {
    View:   'notices:view',
    Manage: 'notices:manage',
  },
  Meetings: {
    Manage: 'meetings:manage',
  },
  Compliance: {
    Manage: 'compliance:manage',
  },
  Settings: {
    Manage: 'settings:manage',
  },
} as const;

// Flat union of all permission strings
type PermissionLeaf<T> = T extends string
  ? T
  : T extends object
  ? { [K in keyof T]: PermissionLeaf<T[K]> }[keyof T]
  : never;

export type Permission = PermissionLeaf<typeof PERMISSIONS>;
