export const complaintKeys = {
  all: ['complaints'] as const,

  lists: () =>
    [...complaintKeys.all, 'list'] as const,

  list: (params?: unknown) =>
    [...complaintKeys.lists(), params] as const,

  details: () =>
    [...complaintKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...complaintKeys.details(), id] as const,

  dashboard: () =>
    [...complaintKeys.all, 'dashboard'] as const,

  stats: () =>
    [...complaintKeys.all, 'stats'] as const,

  categories: {
    all: () =>
      ['complaint-categories'] as const,

    lists: () =>
      ['complaint-categories', 'list'] as const,
  },

  assignments: {
    detail: (complaintId: string) =>
      [...complaintKeys.all, 'assignments', complaintId] as const,
  },

  timeline: {
    detail: (complaintId: string) =>
      [...complaintKeys.all, 'timeline', complaintId] as const,
  },
};