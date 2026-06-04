export const visitorKeys = {
  all: ['visitors'] as const,

  lists: () =>
    [...visitorKeys.all, 'list'] as const,

  list: (params?: unknown) =>
    [...visitorKeys.lists(), params] as const,

  details: () =>
    [...visitorKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...visitorKeys.details(), id] as const,

  preApproved: () =>
    [...visitorKeys.all, 'pre-approved'] as const,

  invites: {
    all:  () => [...visitorKeys.all, 'invites']           as const,
    list: (params?: unknown) => [...visitorKeys.all, 'invites', 'list', params] as const,
  },

  logs: () =>
    [...visitorKeys.all, 'logs'] as const,

  analytics: () =>
    [...visitorKeys.all, 'analytics'] as const,

  dashboard: () =>
    [...visitorKeys.all, 'dashboard'] as const,

  sos: {
    all:    () =>             [...visitorKeys.all, 'sos']              as const,
    list:   (params?: unknown) => [...visitorKeys.all, 'sos', 'list', params] as const,
    detail: (id: string) =>   [...visitorKeys.all, 'sos', id]         as const,
  },
};
