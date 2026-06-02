export interface NavigationItem {
  key:         string;
  label:       string;
  href:        string;
  icon?:       string;
  badge?:      string | number;
  permission?: string;
  roles?:      string[];
}

export interface NavigationGroup {
  key:    string;
  label?: string;
  items:  NavigationItem[];
}

export type NavigationConfig = NavigationGroup[];
