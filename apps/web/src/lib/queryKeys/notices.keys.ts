export const noticeKeys = {
  all:     ['notices'] as const,
  lists:   () => [...noticeKeys.all, 'list']             as const,
  list:    (params?: Record<string, unknown>) => [...noticeKeys.lists(), params]   as const,
  details: () => [...noticeKeys.all, 'detail']           as const,
  detail:  (id: string) => [...noticeKeys.details(), id] as const,
  pinned:  () => [...noticeKeys.all, 'pinned']           as const,
};
