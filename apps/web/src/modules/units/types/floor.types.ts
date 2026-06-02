import type { ID } from '@/types/common.types';

export interface Floor {
  id:          ID;
  blockId:     ID;
  floorNumber: number;
  label:       string;
  unitCount:   number;
}

export interface Block {
  id:     ID;
  name:   string;
  label:  string;
  floors: Floor[];
}
