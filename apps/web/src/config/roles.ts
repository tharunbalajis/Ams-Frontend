export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN:       'admin',
  ACCOUNTANT:  'accountant',
  SECURITY:    'security',
  RESIDENT:    'resident',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin:       'Admin',
  accountant:  'Accountant',
  security:    'Security',
  resident:    'Resident',
};

// Higher number = higher privilege
export const ROLE_HIERARCHY: Record<Role, number> = {
  super_admin: 5,
  admin:       4,
  accountant:  3,
  security:    2,
  resident:    1,
};

export const ALL_ROLES = Object.values(ROLES) as Role[];
export const STAFF_ROLES: Role[] = ['super_admin', 'admin', 'accountant', 'security'];
export const ADMIN_ROLES: Role[] = ['super_admin', 'admin'];
