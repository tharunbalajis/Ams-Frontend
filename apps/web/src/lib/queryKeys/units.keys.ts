export const unitKeys = {
  all:     ['units'] as const,
  lists:   () => [...unitKeys.all, 'list']             as const,
  list:    (params?: Record<string, unknown>) => [...unitKeys.lists(), params]   as const,
  details: () => [...unitKeys.all, 'detail']           as const,
  detail:  (id: string) => [...unitKeys.details(), id] as const,
  available: () => [...unitKeys.all, 'available']      as const,
};
