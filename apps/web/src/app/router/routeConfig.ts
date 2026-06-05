export const ROUTES = {
  // Auth
  LOGIN: '/login',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Residents
  RESIDENTS:           '/residents',
  RESIDENT_CREATE:       '/residents/create',
  RESIDENT_DETAIL:       '/residents/:id',
  RESIDENT_EDIT:         '/residents/:id/edit',
  RESIDENT_PROFILE:     '/residents/:id/profile',
  RESIDENT_DIRECTORY:   '/residents/directory',
  RESIDENT_BLOCKS:      '/residents/blocks',
  RESIDENT_LEASES:       '/residents/leases',
  RESIDENT_VEHICLES:     '/residents/vehicles',
  RESIDENT_PETS:        '/residents/pets',
  RESIDENT_MOVES:        '/residents/moves',
  RESIDENT_QR:          '/residents/qr',
  RESIDENT_IMPORT:       '/residents/import',

  // Units
  UNITS:       '/units',
  UNIT_CREATE: '/units/create',
  UNIT_DETAIL: '/units/:id',
  UNIT_EDIT:   '/units/:id/edit',

  // Visitors
  VISITORS:           '/visitors',
  VISITOR_DETAIL:       '/visitors/:id',
  VISITORS_SECURITY:   '/visitors/security',
  VISITORS_CHECKIN:    '/visitors/checkin',
  VISITORS_GUARD:     '/visitors/guard',
  VISITORS_QR:        '/visitors/qr',
  VISITORS_DELIVERIES: '/visitors/deliveries',
  VISITORS_ATTENDANCE:'/visitors/attendance',
  VISITORS_SOS:       '/visitors/sos',
  VISITORS_PASSES:     '/visitors/passes',
  VISITORS_INVITES:    '/visitors/invites',

  // Complaints
  COMPLAINTS:            '/complaints',
  COMPLAINT_CREATE:      '/complaints/new',
  COMPLAINT_DETAIL:      '/complaints/:id',
  COMPLAINT_DASHBOARD:  '/complaints/dashboard',
  COMPLAINT_KANBAN:     '/complaints/kanban',
  COMPLAINT_SLA:        '/complaints/sla',
  COMPLAINT_ESCALATION: '/complaints/escalation',
  COMPLAINT_MAINTENANCE:'/complaints/maintenance',
  COMPLAINT_ANALYTICS:  '/complaints/analytics',

  // Financials
  FINANCIALS:            '/financials',
  FINANCIALS_INVOICES:    '/financials/invoices',
  FINANCIALS_INVOICE:   '/financials/invoices/:id',
  FINANCIALS_PAYMENTS:  '/financials/payments',
  FINANCIALS_EXPENSES:  '/financials/expenses',
  FINANCIALS_HEADS:     '/financials/heads',
  FINANCIALS_GST:       '/financials/gst',
  FINANCIALS_PENALTIES: '/financials/penalties',
  FINANCIALS_REPORTS:   '/financials/reports',

  // Admin
  ADMIN_USERS:       '/admin/users',
  ADMIN_AUDIT_LOGS:  '/admin/audit-logs',

  // Out-of-scope (retained for sidebar nav)
  AMENITIES:  '/amenities',
  STAFF:      '/staff',
  ASSETS:     '/assets',
  NOTICES:    '/notices',
  MEETINGS:   '/meetings',
  COMPLIANCE: '/compliance',
  SETTINGS:   '/settings',
} as const;

export type RouteKey  = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export function buildRoute(path: RoutePath, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    path as string,
  );
}