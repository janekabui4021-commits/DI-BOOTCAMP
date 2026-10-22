import pg from 'pg';
import { env } from '../config/env.js';

if (!env.databaseUrl) {
  throw new Error('DATABASE_URL must be configured.');
}

export const pool = new pg.Pool({
  connectionString: env.databaseUrl,
  ssl: env.isProduction ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error.', error);
});
