export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN:       'ADMIN',
  ACCOUNTANT:  'ACCOUNTANT',
  SECURITY:    'SECURITY',
  RESIDENT:    'RESIDENT',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN:       'Admin',
  ACCOUNTANT:  'Accountant',
  SECURITY:    'Security',
  RESIDENT:    'Resident',
};

export const ROLE_HIERARCHY: Record<Role, number> = {
  SUPER_ADMIN: 5,
  ADMIN:       4,
  ACCOUNTANT:  3,
  SECURITY:    2,
  RESIDENT:    1,
};

export const ALL_ROLES  = Object.values(ROLES) as Role[];
export const STAFF_ROLES: Role[] = ['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'SECURITY'];
export const ADMIN_ROLES: Role[] = ['SUPER_ADMIN', 'ADMIN'];
