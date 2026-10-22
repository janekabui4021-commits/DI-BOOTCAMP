import type { RequestHandler } from 'express';
import { env } from '../config/env.js';
import { HttpError } from '../helpers/httpError.js';

export const requireTrustedOrigin: RequestHandler = (request, _response, next) => {
  const origin = request.get('origin');
  if (origin && origin !== env.frontendOrigin) {
    next(new HttpError(403, 'This request origin is not allowed.'));
    return;
  }
  next();
};
