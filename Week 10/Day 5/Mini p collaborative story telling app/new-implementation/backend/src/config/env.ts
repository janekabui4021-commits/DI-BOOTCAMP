import 'dotenv/config';

function requiredSecret(name: 'JWT_SECRET' | 'REFRESH_SECRET'): string {
  const value = process.env[name];
  if (!value || value.length < 32) {
    throw new Error(`${name} must be set to a random string of at least 32 characters.`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: requiredSecret('JWT_SECRET'),
  refreshSecret: requiredSecret('REFRESH_SECRET'),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://127.0.0.1:5173',
  isProduction: process.env.NODE_ENV === 'production',
};
