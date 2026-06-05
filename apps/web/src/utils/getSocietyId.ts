/**
 * Utility to get the current society ID from localStorage
 * Falls back to 1 if not found
 */
export function getSocietyId(): number {
  try {
    const raw = localStorage.getItem('ams_user');
    if (raw) {
      const user = JSON.parse(raw);
      return user?.society_id ?? 1;
    }
  } catch {
    // Ignore parse errors
  }
  return 1;
}

/**
 * Get user from localStorage
 */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem('ams_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}