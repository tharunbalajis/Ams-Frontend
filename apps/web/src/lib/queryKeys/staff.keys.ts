export const staffKeys = {
  all:     ['staff'] as const,
  lists:   () => [...staffKeys.all, 'list']             as const,
  list:    (params?: Record<string, unknown>) => [...staffKeys.lists(), params]   as const,
  details: () => [...staffKeys.all, 'detail']           as const,
  detail:  (id: string) => [...staffKeys.details(), id] as const,
  schedule: (id: string) => [...staffKeys.all, 'schedule', id] as const,
};
