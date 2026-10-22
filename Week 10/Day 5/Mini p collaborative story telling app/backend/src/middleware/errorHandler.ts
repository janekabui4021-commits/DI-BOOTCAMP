import type { ErrorRequestHandler } from 'express';
import { HttpError } from '../helpers/httpError.js';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof HttpError) {
    response.status(error.status).json({ message: error.message });
    return;
  }
  if (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'entity.parse.failed'
  ) {
    response.status(400).json({ message: 'Request body must contain valid JSON.' });
    return;
  }
  if (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'entity.too.large'
  ) {
    response.status(413).json({ message: 'Request body is too large.' });
    return;
  }

  console.error('Unhandled API error.', error);
  response.status(500).json({ message: 'Something went wrong. Please try again.' });
};
