import type { Role } from '@/config/roles';

interface JwtPayload {
  sub:   string;
  email: string;
  role:  Role;
  exp:   number;
  iat:   number;
  [key: string]: unknown;
}

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + (4 - (str.length % 4)) % 4, '=');
  return atob(padded);
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(base64UrlDecode(parts[1])) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

export function getTokenExpiry(token: string): Date | null {
  const payload = decodeToken(token);
  if (!payload?.exp) return null;
  return new Date(payload.exp * 1000);
}

export function extractUserId(token: string): string | null {
  return decodeToken(token)?.sub ?? null;
}

export function extractRole(token: string): Role | null {
  return (decodeToken(token)?.role as Role) ?? null;
}

export function getTokenRemainingMs(token: string): number {
  const payload = decodeToken(token);
  if (!payload?.exp) return 0;
  return Math.max(0, payload.exp * 1000 - Date.now());
}
