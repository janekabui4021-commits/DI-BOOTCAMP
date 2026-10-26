import { pool } from '../db/pool.js';

export async function createRefreshSession(
  jti: string,
  userId: number,
  expiresAt: Date,
): Promise<void> {
  await pool.query(
    'INSERT INTO refresh_sessions (jti, user_id, expires_at) VALUES ($1, $2, $3)',
    [jti, userId, expiresAt],
  );
}

export async function consumeRefreshSession(jti: string, userId: number): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM refresh_sessions
     WHERE jti = $1 AND user_id = $2 AND expires_at > CURRENT_TIMESTAMP
     RETURNING jti`,
    [jti, userId],
  );
  return result.rowCount === 1;
}

export async function revokeRefreshSession(jti: string, userId: number): Promise<void> {
  await pool.query('DELETE FROM refresh_sessions WHERE jti = $1 AND user_id = $2', [jti, userId]);
}
