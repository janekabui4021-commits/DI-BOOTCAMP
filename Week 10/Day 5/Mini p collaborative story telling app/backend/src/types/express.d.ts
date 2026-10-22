import type { User } from '@fable/types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
