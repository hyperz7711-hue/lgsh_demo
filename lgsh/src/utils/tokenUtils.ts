/**
 * JWT 토큰 유틸리티 - 데모 모드 지원
 */

interface JwtPayload {
  exp: number;
  iat: number;
  sub?: string;
  [key: string]: unknown;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch { return null; }
};

// 데모 토큰은 항상 유효 (demo-access-token-* 형식)
const isDemoToken = (token: string) => token.startsWith("demo-");

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  if (isDemoToken(token)) return false; // 데모 토큰은 만료 없음
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  return Date.now() >= payload.exp * 1000;
};

export const getTokenTimeRemaining = (token: string | null): number => {
  if (!token) return 0;
  if (isDemoToken(token)) return 24 * 60 * 60 * 1000; // 데모: 24시간
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return 0;
  return Math.max(0, payload.exp * 1000 - Date.now());
};

export const getTokenMinutesRemaining = (token: string | null): number => {
  return Math.floor(getTokenTimeRemaining(token) / 60000);
};

export const shouldRefreshToken = (token: string | null, thresholdMinutes = 5): boolean => {
  const minutesRemaining = getTokenMinutesRemaining(token);
  return minutesRemaining > 0 && minutesRemaining <= thresholdMinutes;
};

export const formatTimeRemaining = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
