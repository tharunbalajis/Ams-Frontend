// @ams/permissions — Role and permission definitions
// Placeholder exports — implement in Phase 2

export type Role = 'super_admin' | 'admin' | 'manager' | 'staff' | 'resident';

export type Permission = string;

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  RESIDENT: 'resident',
} as const;
