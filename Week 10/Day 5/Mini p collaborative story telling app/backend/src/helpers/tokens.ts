import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import type { User } from '@fable/types';
import { env } from '../config/env.js';
import { createRefreshSession } from '../models/refreshSessionModel.js';

const accessLifetimeSeconds = 15 * 60;
const refreshLifetimeMs = 7 * 24 * 60 * 60 * 1000;

export interface RefreshClaims extends jwt.JwtPayload {
  userId: number;
  jti: string;
}

export async function issueTokenPair(user: User): Promise<{ accessToken: string; refreshToken: string }> {
  const jti = randomUUID();
  const expiresAt = new Date(Date.now() + refreshLifetimeMs);
  const accessToken = jwt.sign({ userId: user.id }, env.jwtSecret, {
    expiresIn: accessLifetimeSeconds,
  });
  const refreshToken = jwt.sign({ userId: user.id }, env.refreshSecret, {
    jwtid: jti,
    expiresIn: Math.floor(refreshLifetimeMs / 1000),
  });
  await createRefreshSession(jti, user.id, expiresAt);
  return { accessToken, refreshToken };
}

export function verifyRefreshToken(token: string): RefreshClaims {
  const payload = jwt.verify(token, env.refreshSecret);
  if (
    typeof payload === 'string' ||
    typeof payload.userId !== 'number' ||
    typeof payload.jti !== 'string'
  ) {
    throw new Error('Invalid refresh token.');
  }
  return payload as RefreshClaims;
}

export function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? ('none' as const) : ('lax' as const),
    path: '/api/auth',
    maxAge: refreshLifetimeMs,
  };
}

export function clearRefreshCookieOptions() {
  const { maxAge: _maxAge, ...options } = refreshCookieOptions();
  return options;
}
