export const complianceKeys = {
  all:     ['compliance'] as const,
  lists:   () => [...complianceKeys.all, 'list']             as const,
  list:    (params?: unknown) => [...complianceKeys.lists(), params]   as const,
  details: () => [...complianceKeys.all, 'detail']           as const,
  detail:  (id: string) => [...complianceKeys.details(), id] as const,
  summary: () => [...complianceKeys.all, 'summary']          as const,
};
