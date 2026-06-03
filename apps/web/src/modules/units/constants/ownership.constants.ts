import type { OwnershipType } from '../types/unit.types';

export const OWNERSHIP_LABEL: Record<OwnershipType, string> = {
  OWNED:  'Owned',
  RENTED: 'Rented',
  LEASED: 'Leased',
};
