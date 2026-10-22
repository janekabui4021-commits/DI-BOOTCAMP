import { useEffect, useRef, useState } from 'react';
import { liveSocketUrl } from './api';

interface LiveMessage {
  type?: unknown;
  content?: unknown;
  revision?: unknown;
  updatedAt?: unknown;
  users?: unknown;
  user?: unknown;
  message?: unknown;
}

interface LiveUser {
  id: number;
  username: string;
}

type ConnectionState = 'connecting' | 'connected' | 'offline' | 'conflict';

interface LiveStoryTextAreaProps {
  storyId: number | null;
  token: string | null;
  currentUserId: number | undefined;
  initialContent: string;
  inputId: string;
  onConflictChange: (conflicted: boolean) => void;
  onSavedContent: (content: string, updatedAt: string) => void;
}

function isLiveUser(value: unknown): value is LiveUser {
  if (typeof value !== 'object' || value === null) return false;
  const user = value as Record<string, unknown>;
  return Number.isSafeInteger(user.id) && typeof user.username === 'string';
}

export function LiveStoryTextArea({
  storyId,
  token,
  currentUserId,
  initialContent,
  inputId,
  onConflictChange,
  onSavedContent,
}: LiveStoryTextAreaProps) {
  const [content, setContent] = useState(initialContent);
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
  const [collaborators, setCollaborators] = useState<LiveUser[]>([]);
  const [conflictContent, setConflictContent] = useState<string | null>(null);
  const [connectionMessage, setConnectionMessage] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef(content);
  const onSavedContentRef = useRef(onSavedContent);
  const onConflictChangeRef = useRef(onConflictChange);
  const latestRemoteRef = useRef<{ content: string; revision: number; updatedAt: string } | null>(null);
  const sendUpdateRef = useRef<((nextContent: string) => void) | null>(null);

  contentRef.current = content;
  onSavedContentRef.current = onSavedContent;
  onConflictChangeRef.current = onConflictChange;

  useEffect(() => {
    if (!storyId || !token) {
      setContent(initialContent);
      setConnectionState('connected');
      return;
    }

    let disposed = false;
    let socket: WebSocket | null = null;
    let retryTimer = 0;
    let debounceTimer = 0;
    let revision = 0;
    let ready = false;
    let pending = false;
    let inFlight = false;
    let inFlightContent = '';
    let authenticationFailed = false;
    let latestDraft = initialContent;

    function applyRemoteContent(nextContent: string) {
      const textArea = textAreaRef.current;
      const selectionStart = textArea?.selectionStart;
      const selectionEnd = textArea?.selectionEnd;
      contentRef.current = nextContent;
      latestDraft = nextContent;
      setContent(nextContent);
      if (textArea && selectionStart !== undefined && selectionEnd !== undefined) {
        window.requestAnimationFrame(() => {
          const length = textArea.value.length;
          textArea.setSelectionRange(Math.min(selectionStart, length), Math.min(selectionEnd, length));
        });
      }
    }

    function rememberRemoteContent(message: LiveMessage) {
      if (
        typeof message.content !== 'string' ||
        typeof message.revision !== 'number' ||
        !Number.isSafeInteger(message.revision)
      ) return false;
      revision = message.revision;
      latestRemoteRef.current = {
        content: message.content,
        revision,
        updatedAt: typeof message.updatedAt === 'string' ? message.updatedAt : '',
      };
      return true;
    }

    function sendPending() {
      if (!socket || socket.readyState !== WebSocket.OPEN || !ready || inFlight || !pending) return;
      pending = false;
      inFlight = true;
      latestDraft = contentRef.current;
      inFlightContent = latestDraft;
      socket.send(JSON.stringify({ type: 'update', content: latestDraft, revision }));
    }

    function scheduleUpdate() {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(sendPending, 180);
    }

    sendUpdateRef.current = (nextContent) => {
      pending = true;
      latestDraft = nextContent;
      if (!ready || !socket || socket.readyState !== WebSocket.OPEN) return;
      scheduleUpdate();
    };

    function connect() {
      if (disposed) return;
      setConnectionState('connecting');
      const nextSocket = new WebSocket(liveSocketUrl());
      socket = nextSocket;
      nextSocket.addEventListener('open', () => {
        nextSocket.send(JSON.stringify({ type: 'authenticate', token, storyId }));
      });
      nextSocket.addEventListener('message', (event: MessageEvent<string>) => {
        let message: LiveMessage;
        try {
          const parsed: unknown = JSON.parse(event.data);
          if (typeof parsed !== 'object' || parsed === null) return;
          message = parsed as LiveMessage;
        } catch {
          setConnectionMessage('Received an invalid live update.');
          return;
        }

        if (message.type === 'ready') {
          if (!rememberRemoteContent(message) || typeof message.content !== 'string') return;
          ready = true;
          setConnectionMessage('');
          setConnectionState('connected');
          setCollaborators(Array.isArray(message.users) ? message.users.filter(isLiveUser) : []);
          if (pending && latestDraft !== message.content) {
            setConflictContent(message.content);
            setConnectionState('conflict');
            onConflictChangeRef.current(true);
            setConnectionMessage('A collaborator edited this story while you were disconnected. Copy any draft text before replacing it with the latest version.');
            pending = false;
          } else {
            pending = false;
            inFlight = false;
            applyRemoteContent(message.content);
            if (typeof message.updatedAt === 'string') {
              onSavedContentRef.current(message.content, message.updatedAt);
            }
          }
          return;
        }
        if (message.type === 'presence') {
          if (Array.isArray(message.users)) setCollaborators(message.users.filter(isLiveUser));
          return;
        }
        if (message.type === 'saved') {
          if (typeof message.revision === 'number' && Number.isSafeInteger(message.revision)) {
            revision = message.revision;
          }
          inFlight = false;
          if (typeof message.updatedAt === 'string') {
            onSavedContentRef.current(inFlightContent, message.updatedAt);
          }
          if (pending) sendPending();
          return;
        }
        if (message.type === 'update' || message.type === 'conflict') {
          if (!rememberRemoteContent(message) || typeof message.content !== 'string') return;
          if (message.type === 'conflict' || pending || inFlight) {
            inFlight = false;
            pending = false;
            window.clearTimeout(debounceTimer);
            setConflictContent(message.content);
            setConnectionState('conflict');
            onConflictChangeRef.current(true);
            setConnectionMessage('A collaborator saved changes at the same time. Your draft is still here. Copy any draft text before replacing it with the latest version.');
          } else {
            applyRemoteContent(message.content);
            setConnectionState('connected');
            if (typeof message.updatedAt === 'string') {
              onSavedContentRef.current(message.content, message.updatedAt);
            }
          }
          return;
        }
        if (message.type === 'error' && typeof message.message === 'string') {
          setConnectionMessage(message.message);
          if (ready) {
            inFlight = false;
            if (pending) sendPending();
          }
          if (!ready) {
            authenticationFailed = true;
            setConnectionState('offline');
            nextSocket.close();
          }
        }
      });
      nextSocket.addEventListener('close', () => {
        if (socket === nextSocket) socket = null;
        ready = false;
        if (inFlight) {
          inFlight = false;
          pending = true;
          latestDraft = contentRef.current;
        }
        if (disposed || authenticationFailed) return;
        setConnectionState('offline');
        retryTimer = window.setTimeout(connect, 1500);
      });
      nextSocket.addEventListener('error', () => {
        if (!disposed) setConnectionMessage('Live editing disconnected. Reconnecting…');
      });
    }

    connect();
    return () => {
      disposed = true;
      window.clearTimeout(retryTimer);
      window.clearTimeout(debounceTimer);
      sendUpdateRef.current = null;
      onConflictChangeRef.current(false);
      socket?.close();
    };
  }, [initialContent, storyId, token]);

  function updateContent(nextContent: string) {
    contentRef.current = nextContent;
    setContent(nextContent);
    if (storyId) sendUpdateRef.current?.(nextContent);
  }

  function loadLatestVersion() {
    const latest = latestRemoteRef.current;
    if (!latest) return;
    setContent(latest.content);
    contentRef.current = latest.content;
    setConflictContent(null);
    setConnectionMessage('');
    setConnectionState('connected');
    onConflictChangeRef.current(false);
    if (latest.updatedAt) onSavedContentRef.current(latest.content, latest.updatedAt);
  }

  return (
    <>
      {storyId !== null && (
        <div className={`live-collaboration-status live-${connectionState}`} role="status">
          <span className="live-status-indicator" />
          <span>{connectionState === 'connected' ? 'Live editing' : connectionState === 'conflict' ? 'Edit conflict' : connectionState === 'offline' ? 'Reconnecting' : 'Connecting collaborators'}</span>
          {connectionState === 'connected' && collaborators.filter((person) => person.id !== currentUserId).length > 0 && (
            <span className="live-collaborator-names">
              with {collaborators.filter((person) => person.id !== currentUserId).map((person) => person.username).join(', ')}
            </span>
          )}
        </div>
      )}
      {connectionMessage && <p className="live-collaboration-message" role="status">{connectionMessage}</p>}
      {connectionState === 'conflict' && conflictContent !== null && (
        <button className="live-load-latest" onClick={loadLatestVersion} type="button">Replace draft with latest version</button>
      )}
      <textarea
        ref={textAreaRef}
        aria-label="Your story"
        id={inputId}
        maxLength={100_000}
        name="content"
        onChange={(event) => updateContent(event.target.value)}
        placeholder="Write the opening lines. You can always change them later..."
        required
        rows={10}
        value={content}
      />
    </>
  );
}
