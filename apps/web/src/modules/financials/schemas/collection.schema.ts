import { z } from 'zod';

export const collectionFiltersSchema = z.object({
  dateFrom:  z.string().optional(),
  dateTo:    z.string().optional(),
  page:      z.number().optional(),
  pageSize:  z.number().optional(),
});

export type CollectionFiltersFormValues = z.infer<typeof collectionFiltersSchema>;
