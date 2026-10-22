import type { ApiError, AuthResponse } from '@fable/types';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:4000').replace(/\/$/, '');

export function liveSocketUrl(): string {
  const url = new URL(API_BASE_URL);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.pathname = '/api/live';
  url.search = '';
  return url.toString();
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

interface RequestContext {
  accessToken?: string | null;
  onSessionRefresh?: (session: AuthResponse) => void;
  onSessionExpired?: () => void;
  retried?: boolean;
}

let pendingRefresh: Promise<AuthResponse | null> | null = null;

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  context: RequestContext = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('content-type')) headers.set('content-type', 'application/json');
  if (context.accessToken) {
    headers.set('authorization', 'Bearer ' + context.accessToken);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api${path}`, {
      ...init,
      headers,
      credentials: 'include',
    });
  } catch {
    throw new ApiRequestError('Could not reach the server. Check that the API is running.', 0);
  }

  if (response.status === 401 && context.accessToken && !context.retried && context.onSessionRefresh) {
    const refreshed = await refreshSession();
    if (!refreshed) {
      context.onSessionExpired?.();
      throw new ApiRequestError('Your session expired. Please log in again.', 401);
    }
    context.onSessionRefresh(refreshed);
    return apiRequest<T>(path, init, {
      ...context,
      accessToken: refreshed.accessToken,
      retried: true,
    });
  }
  if (response.status === 401 && context.retried) {
    context.onSessionExpired?.();
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiError | null;
    throw new ApiRequestError(body?.message ?? 'The request could not be completed.', response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function refreshSession(): Promise<AuthResponse | null> {
  if (pendingRefresh) return pendingRefresh;
  pendingRefresh = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) return null;
      return (await response.json()) as AuthResponse;
    } catch {
      return null;
    } finally {
      pendingRefresh = null;
    }
  })();
  return pendingRefresh;
}

export async function startSession(
  mode: 'login' | 'register',
  credentials: { username?: string; email: string; password: string },
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(`/auth/${mode}`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function authRequestContext(
  accessToken: string,
  onSessionRefresh: (session: AuthResponse) => void,
  onSessionExpired?: () => void,
): RequestContext {
  return { accessToken, onSessionRefresh, onSessionExpired };
}
