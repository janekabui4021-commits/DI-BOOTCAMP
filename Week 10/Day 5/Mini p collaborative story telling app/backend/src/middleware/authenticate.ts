import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { env } from '../config/env.js';
import { findUserById } from '../models/userModel.js';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { HttpError } from '../helpers/httpError.js';

export const authenticate: RequestHandler = asyncHandler(async (request, _response, next) => {
  const authorization = request.get('authorization');
  const [scheme, token] = authorization?.split(' ') ?? [];
  if (scheme !== 'Bearer' || !token) {
    throw new HttpError(401, 'Please log in to continue.');
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    if (typeof payload === 'string' || typeof payload.userId !== 'number') {
      throw new Error('Invalid access token.');
    }
    const user = await findUserById(payload.userId);
    if (!user) throw new HttpError(401, 'Your session is no longer valid. Please log in again.');
    request.user = user;
    next();
  } catch (error) {
    if (error instanceof HttpError) throw error;
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      throw new HttpError(401, 'Your session has expired. Please log in again.');
    }
    throw error;
  }
});
