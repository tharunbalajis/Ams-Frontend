import { useState, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value;
        try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* quota */ }
        return next;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    setStored(initialValue);
    localStorage.removeItem(key);
  }, [key, initialValue]);

  return [stored, setValue, removeValue];
}
