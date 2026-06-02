import type { ID } from '@/types/common.types';
import type { Resident, EmergencyContact } from './resident.types';
import type { Vehicle } from './vehicle.types';
import type { Pet } from './pet.types';
import type { Lease } from './lease.types';

export interface ResidentProfile {
  resident:         Resident;
  vehicles:         Vehicle[];
  pets:             Pet[];
  activeLease:      Lease | null;
  leaseHistory:     Lease[];
  emergencyContact: EmergencyContact;
}

export interface ResidentDocument {
  id:         ID;
  residentId: ID;
  name:       string;
  url:        string;
  type:       string;
  uploadedAt: string;
}
