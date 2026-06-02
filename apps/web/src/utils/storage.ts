const PREFIX = 'ams_';
const key    = (k: string) => `${PREFIX}${k}`;

export const storage = {
  get<T>(k: string): T | null {
    try {
      const item = localStorage.getItem(key(k));
      return item ? (JSON.parse(item) as T) : null;
    } catch { return null; }
  },
  set<T>(k: string, value: T): void {
    try { localStorage.setItem(key(k), JSON.stringify(value)); } catch { /* quota */ }
  },
  remove(k: string): void { localStorage.removeItem(key(k)); },
  clear(): void {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};

export const sessionStore = {
  get<T>(k: string): T | null {
    try {
      const item = sessionStorage.getItem(key(k));
      return item ? (JSON.parse(item) as T) : null;
    } catch { return null; }
  },
  set<T>(k: string, value: T): void {
    try { sessionStorage.setItem(key(k), JSON.stringify(value)); } catch { /* ignore */ }
  },
  remove(k: string): void { sessionStorage.removeItem(key(k)); },
};
