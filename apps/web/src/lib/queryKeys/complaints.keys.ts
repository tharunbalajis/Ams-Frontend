export const complaintKeys = {
<<<<<<< HEAD
  all:        ['complaints']                                                                   as const,
  lists:      ()           => [...complaintKeys.all, 'list']                                  as const,
  list:       (params?:    Record<string, unknown>) => [...complaintKeys.lists(), params]      as const,
  details:    ()           => [...complaintKeys.all, 'detail']                                as const,
  detail:     (id: string) => [...complaintKeys.details(), id]                                as const,
  dashboard:  ()           => [...complaintKeys.all, 'dashboard']                             as const,
  categories: {
    all:      ()           => ['complaint-categories']                                         as const,
    lists:    ()           => ['complaint-categories', 'list']                                as const,
  },
  assignments: {
    detail: (complaintId: string) => [...complaintKeys.all, 'assignments', complaintId]       as const,
  },
  timeline: {
    detail: (complaintId: string) => [...complaintKeys.all, 'timeline', complaintId]          as const,
  },
=======
  all:     ['complaints'] as const,
  lists:   () => [...complaintKeys.all, 'list']             as const,
  list:    (params?: unknown) => [...complaintKeys.lists(), params]   as const,
  details: () => [...complaintKeys.all, 'detail']           as const,
  detail:  (id: string) => [...complaintKeys.details(), id] as const,
  stats:   () => [...complaintKeys.all, 'stats']            as const,
>>>>>>> d852c2e (final)
};
