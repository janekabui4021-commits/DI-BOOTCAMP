import type { IncomingMessage, Server } from 'node:http';
import jwt from 'jsonwebtoken';
import { WebSocket, WebSocketServer, type RawData } from 'ws';
import { env } from './config/env.js';
import { canEditStory, getStoryById, updateStoryContent } from './models/storyModel.js';
import { findUserById } from './models/userModel.js';

interface LiveUser {
  id: number;
  username: string;
}

interface LiveConnection {
  socket: WebSocket;
  user: LiveUser;
  storyId: number;
}

interface LiveRoom {
  content: string;
  updatedAt: string;
  revision: number;
  connections: Set<LiveConnection>;
  updates: Promise<void>;
}

interface IncomingMessageData {
  type?: unknown;
  token?: unknown;
  storyId?: unknown;
  content?: unknown;
  revision?: unknown;
}

const maxStoryLength = 100_000;
const rooms = new Map<number, LiveRoom>();

function send(socket: WebSocket, message: object): void {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message));
}

function roomUsers(room: LiveRoom): LiveUser[] {
  return [...new Map([...room.connections].map(({ user }) => [user.id, user])).values()];
}

function broadcastPresence(room: LiveRoom): void {
  const message = { type: 'presence', users: roomUsers(room) };
  for (const connection of room.connections) send(connection.socket, message);
}

function parseMessage(data: RawData): IncomingMessageData | null {
  try {
    const parsed: unknown = JSON.parse(data.toString());
    if (typeof parsed === 'object' && parsed !== null) return parsed as IncomingMessageData;
    return null;
  } catch {
    return null;
  }
}

async function authenticateConnection(
  message: IncomingMessageData,
  connection: WebSocket,
): Promise<LiveConnection> {
  if (
    typeof message.token !== 'string' ||
    typeof message.storyId !== 'number' ||
    !Number.isSafeInteger(message.storyId) ||
    message.storyId < 1
  ) {
    throw new Error('Invalid collaboration credentials.');
  }
  const payload = jwt.verify(message.token, env.jwtSecret);
  if (typeof payload === 'string' || typeof payload.userId !== 'number') {
    throw new Error('Invalid access token.');
  }
  const user = await findUserById(payload.userId);
  if (!user || !(await canEditStory(message.storyId, user.id))) {
    throw new Error('You are not allowed to collaborate on this story.');
  }
  return {
    socket: connection,
    user: { id: user.id, username: user.username },
    storyId: message.storyId,
  };
}

async function authenticateRoom(connection: LiveConnection): Promise<LiveRoom> {
  let room = rooms.get(connection.storyId);
  if (!room) {
    const story = await getStoryById(connection.storyId);
    if (!story) throw new Error('Story not found.');
    room = {
      content: story.content,
      updatedAt: story.updatedAt,
      revision: 0,
      connections: new Set(),
      updates: Promise.resolve(),
    };
    rooms.set(connection.storyId, room);
  }
  room.connections.add(connection);
  return room;
}

function detachConnection(connection: LiveConnection, room: LiveRoom): void {
  room.connections.delete(connection);
  if (room.connections.size === 0) rooms.delete(connection.storyId);
  else broadcastPresence(room);
}

async function handleDocumentUpdate(
  connection: LiveConnection,
  room: LiveRoom,
  message: IncomingMessageData,
): Promise<void> {
  if (
    typeof message.content !== 'string' ||
    message.content.length > maxStoryLength ||
    typeof message.revision !== 'number' ||
    !Number.isSafeInteger(message.revision)
  ) {
    send(connection.socket, { type: 'error', message: 'The story update is invalid.' });
    return;
  }
  if (!(await canEditStory(connection.storyId, connection.user.id))) {
    send(connection.socket, { type: 'error', message: 'You no longer have permission to edit this story.' });
    connection.socket.close(1008, 'Story access revoked.');
    return;
  }
  if (message.revision !== room.revision) {
    send(connection.socket, {
      type: 'conflict',
      content: room.content,
      updatedAt: room.updatedAt,
      revision: room.revision,
    });
    return;
  }

  const saved = await updateStoryContent(connection.storyId, message.content);
  if (!saved) {
    send(connection.socket, { type: 'error', message: 'This story no longer exists.' });
    connection.socket.close(1008, 'Story deleted.');
    return;
  }
  room.content = saved.content;
  room.updatedAt = saved.updatedAt;
  room.revision += 1;
  send(connection.socket, { type: 'saved', revision: room.revision, updatedAt: saved.updatedAt });
  for (const peer of room.connections) {
    if (peer !== connection) {
      send(peer.socket, {
        type: 'update',
        content: saved.content,
        revision: room.revision,
        updatedAt: saved.updatedAt,
        user: connection.user,
      });
    }
  }
}

function originIsTrusted(request: IncomingMessage): boolean {
  return request.headers.origin === env.frontendOrigin;
}

export async function publishExternalStoryContent(
  storyId: number,
  content: string,
  updatedAt: string,
  user: LiveUser,
): Promise<void> {
  const room = rooms.get(storyId);
  if (!room) return;
  const update = room.updates.then(() => {
    room.content = content;
    room.updatedAt = updatedAt;
    room.revision += 1;
    for (const connection of room.connections) {
      send(connection.socket, {
        type: 'update',
        content,
        updatedAt,
        revision: room.revision,
        user,
      });
    }
  });
  room.updates = update.catch((error: unknown) => {
    console.error('Could not publish a saved story update to collaborators.', error);
  });
  await room.updates;
}

export function attachLiveCollaboration(server: Server): WebSocketServer {
  const webSocketServer = new WebSocketServer({ noServer: true, maxPayload: 700 * 1024 });

  server.on('upgrade', (request, socket, head) => {
    const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
    if (pathname !== '/api/live') {
      socket.destroy();
      return;
    }
    if (!originIsTrusted(request)) {
      socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
      socket.destroy();
      return;
    }
    webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
      webSocketServer.emit('connection', webSocket, request);
    });
  });

  webSocketServer.on('connection', (socket) => {
    let authenticatedConnection: LiveConnection | null = null;
    let room: LiveRoom | null = null;
    let messageQueue = Promise.resolve();
    const authTimeout = setTimeout(() => socket.close(1008, 'Authentication required.'), 5000);

    socket.on('message', (data) => {
      messageQueue = messageQueue.then(async () => {
        const message = parseMessage(data);
        if (!message) {
          send(socket, { type: 'error', message: 'Invalid collaboration message.' });
          return;
        }
        if (!authenticatedConnection) {
          if (message.type !== 'authenticate') {
            socket.close(1008, 'Authenticate before sending updates.');
            return;
          }
          try {
            authenticatedConnection = await authenticateConnection(message, socket);
            room = await authenticateRoom(authenticatedConnection);
            clearTimeout(authTimeout);
            send(socket, {
              type: 'ready',
              content: room.content,
              updatedAt: room.updatedAt,
              revision: room.revision,
              users: roomUsers(room),
            });
            broadcastPresence(room);
          } catch (error) {
            send(socket, {
              type: 'error',
              message: error instanceof Error ? error.message : 'Could not join this story.',
            });
            socket.close(1008, 'Could not join story.');
          }
          return;
        }
        if (message.type === 'update' && room) {
          const connection = authenticatedConnection;
          const activeRoom = room;
          const update = activeRoom.updates.then(() => handleDocumentUpdate(connection, activeRoom, message));
          activeRoom.updates = update.catch((error: unknown) => {
            console.error('Could not save a live story update.', error);
            send(socket, { type: 'error', message: 'Could not save this live edit. Please try again.' });
          });
          await activeRoom.updates;
        }
      }).catch((error: unknown) => {
        console.error('Could not process a live collaboration message.', error);
        socket.close(1011, 'Could not process message.');
      });
    });

    socket.on('close', () => {
      clearTimeout(authTimeout);
      if (authenticatedConnection && room) detachConnection(authenticatedConnection, room);
    });
    socket.on('error', (error) => {
      console.error('Live collaboration socket error.', error);
    });
  });

  return webSocketServer;
}
