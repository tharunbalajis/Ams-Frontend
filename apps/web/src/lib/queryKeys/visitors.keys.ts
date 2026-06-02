export const visitorKeys = {
  all:     ['visitors'] as const,
  lists:   () => [...visitorKeys.all, 'list']             as const,
  list:    (params?: Record<string, unknown>) => [...visitorKeys.lists(), params]   as const,
  details: () => [...visitorKeys.all, 'detail']           as const,
  detail:  (id: string) => [...visitorKeys.details(), id] as const,
  active:  () => [...visitorKeys.all, 'active']           as const,
};
