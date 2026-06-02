export const complaintKeys = {
  all:     ['complaints'] as const,
  lists:   () => [...complaintKeys.all, 'list']             as const,
  list:    (params?: Record<string, unknown>) => [...complaintKeys.lists(), params]   as const,
  details: () => [...complaintKeys.all, 'detail']           as const,
  detail:  (id: string) => [...complaintKeys.details(), id] as const,
  stats:   () => [...complaintKeys.all, 'stats']            as const,
};
