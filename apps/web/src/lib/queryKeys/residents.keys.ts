export const residentKeys = {
  all:     ['residents'] as const,
  lists:   () => [...residentKeys.all, 'list']          as const,
  list:    (params?: Record<string, unknown>) => [...residentKeys.lists(), params]  as const,
  details: () => [...residentKeys.all, 'detail']        as const,
  detail:  (id: string) => [...residentKeys.details(), id] as const,
};
