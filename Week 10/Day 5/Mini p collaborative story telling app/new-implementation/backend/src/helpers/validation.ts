import { HttpError } from './httpError.js';

export function requireText(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new HttpError(400, `${field} is required.`);
  }
  const normalized = value.trim();
  if (normalized.length > maxLength) {
    throw new HttpError(400, `${field} must be ${maxLength} characters or fewer.`);
  }
  return normalized;
}

export function requireId(value: string | string[]): number {
  if (Array.isArray(value)) throw new HttpError(400, 'A valid resource ID is required.');
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new HttpError(400, 'A valid resource ID is required.');
  }
  return id;
}

export function requireEmail(value: unknown): string {
  const email = requireText(value, 'Email', 100).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, 'Enter a valid email address.');
  }
  return email;
}
