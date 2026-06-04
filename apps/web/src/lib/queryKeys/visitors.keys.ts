export const visitorKeys = {
  all: ['visitors'] as const,

  lists: () =>
    [...visitorKeys.all, 'list'] as const,

  list: (params?: Record<string, unknown>) =>
    [...visitorKeys.lists(), params] as const,

  details: () =>
    [...visitorKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...visitorKeys.details(), id] as const,

  preApproved: () =>
    [...visitorKeys.all, 'pre-approved'] as const,

  logs: () =>
    [...visitorKeys.all, 'logs'] as const,

  analytics: () =>
    [...visitorKeys.all, 'analytics'] as const,
};