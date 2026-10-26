import { createServer } from 'node:http';
import { app } from './app.js';
import { env } from './config/env.js';
import { pool } from './db/pool.js';
import { attachLiveCollaboration } from './liveCollaboration.js';

const server = createServer(app);
const liveCollaboration = attachLiveCollaboration(server);

server.listen(env.port, () => {
  console.info(`Fable API listening on port ${env.port}.`);
});

function shutdown(signal: string): void {
  console.info(`${signal} received. Shutting down the API.`);
  for (const client of liveCollaboration.clients) client.close(1001, 'Server shutting down.');
  server.close(() => {
    void pool.end().then(() => process.exit(0));
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
