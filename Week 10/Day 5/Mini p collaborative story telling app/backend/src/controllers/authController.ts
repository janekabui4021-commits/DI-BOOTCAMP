import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import type { AuthResponse } from '@fable/types';
import { pool } from '../db/pool.js';
import { HttpError } from '../helpers/httpError.js';
import { requireEmail, requireText } from '../helpers/validation.js';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { createUser, findUserByEmail, findUserById } from '../models/userModel.js';
import { revokeRefreshSession } from '../models/refreshSessionModel.js';
import {
  clearRefreshCookieOptions,
  issueTokenPair,
  refreshCookieOptions,
  verifyRefreshToken,
} from '../helpers/tokens.js';

const BCRYPT_ROUNDS = 12;
const PASSWORD_MIN_LENGTH = 8;

async function respondWithSession(
  user: NonNullable<Awaited<ReturnType<typeof findUserById>>>,
  response: Parameters<RequestHandler>[1],
  status = 200,
): Promise<void> {
  const tokens = await issueTokenPair(user);
  response.cookie('refreshToken', tokens.refreshToken, refreshCookieOptions());
  const payload: AuthResponse = { accessToken: tokens.accessToken, user };
  response.status(status).json(payload);
}

export const register: RequestHandler = asyncHandler(async (request, response) => {
  const username = requireText(request.body?.username, 'Username', 50);
  const email = requireEmail(request.body?.email);
  const password = requireText(request.body?.password, 'Password', 128);
  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new HttpError(400, `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
  }
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  let user;
  try {
    user = await createUser(username, email, passwordHash);
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
      throw new HttpError(409, 'An account with this email already exists.');
    }
    throw error;
  }
  await respondWithSession(user, response, 201);
});

export const login: RequestHandler = asyncHandler(async (request, response) => {
  const email = requireEmail(request.body?.email);
  const password = requireText(request.body?.password, 'Password', 128);
  const user = await findUserByEmail(email);
  const passwordMatches = user ? await bcrypt.compare(password, user.password_hash) : false;
  if (!user || !passwordMatches) {
    throw new HttpError(401, 'Email or password is incorrect.');
  }
  await respondWithSession(
    { id: user.id, username: user.username, email: user.email },
    response,
  );
});

export const refresh: RequestHandler = asyncHandler(async (request, response) => {
  const token = request.cookies?.refreshToken;
  if (typeof token !== 'string') throw new HttpError(401, 'Please log in again.');

  let claims;
  try {
    claims = verifyRefreshToken(token);
  } catch {
    response.clearCookie('refreshToken', clearRefreshCookieOptions());
    throw new HttpError(401, 'Your session has expired. Please log in again.');
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const consumed = await client.query(
      `DELETE FROM refresh_sessions
       WHERE jti = $1 AND user_id = $2 AND expires_at > CURRENT_TIMESTAMP
       RETURNING jti`,
      [claims.jti, claims.userId],
    );
    if (consumed.rowCount !== 1) {
      await client.query('ROLLBACK');
      response.clearCookie('refreshToken', clearRefreshCookieOptions());
      throw new HttpError(401, 'Your session is no longer valid. Please log in again.');
    }

    const userResult = await client.query<{ id: number; username: string; email: string }>(
      'SELECT id, username, email FROM users WHERE id = $1',
      [claims.userId],
    );
    const user = userResult.rows[0];
    if (!user) {
      await client.query('ROLLBACK');
      response.clearCookie('refreshToken', clearRefreshCookieOptions());
      throw new HttpError(401, 'Your session is no longer valid. Please log in again.');
    }

    const tokens = await issueTokenPair(user);
    await client.query('COMMIT');
    response.cookie('refreshToken', tokens.refreshToken, refreshCookieOptions());
    response.json({ accessToken: tokens.accessToken, user } satisfies AuthResponse);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
});

export const logout: RequestHandler = asyncHandler(async (request, response) => {
  const token = request.cookies?.refreshToken;
  if (typeof token === 'string') {
    try {
      const claims = verifyRefreshToken(token);
      await revokeRefreshSession(claims.jti, claims.userId);
    } catch (error) {
      if (!(error instanceof jwt.JsonWebTokenError) && !(error instanceof jwt.TokenExpiredError)) {
        throw error;
      }
    }
  }
  response.clearCookie('refreshToken', clearRefreshCookieOptions());
  response.status(204).end();
});
