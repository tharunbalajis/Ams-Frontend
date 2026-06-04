export interface Block {
  block_id:     number;   // PK — not 'id'
  society_id:   number;
  block_name:   string;   // not 'name'
  total_floors: number;
  is_active:    boolean;
  created_at:   string;
  updated_at:   string;
}
