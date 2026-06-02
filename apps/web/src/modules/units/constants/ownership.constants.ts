import type { OwnershipType } from '../types/unit.types';

export const OWNERSHIP_LABEL: Record<OwnershipType, string> = {
  owned:  'Owned',
  rented: 'Rented',
  leased: 'Leased',
};
