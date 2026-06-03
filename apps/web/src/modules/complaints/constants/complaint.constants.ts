export const COMPLAINT_ROUTES = {
  LIST:      '/complaints',
  CREATE:    '/complaints/create',
  DETAIL:    '/complaints/:id',
  DASHBOARD: '/complaints/dashboard',
  KANBAN:    '/complaints/kanban',
} as const;

export const COMPLAINT_PAGE_SIZE = 20;
