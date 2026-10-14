const USERS_KEY = 'goodlist-demo-users';
const SESSION_KEY = 'goodlist-session';

function waitForMockApi() {
  return new Promise((resolve) => window.setTimeout(resolve, 350));
}

function readUsers() {
  try {
    const storedUsers = localStorage.getItem(USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 120000, hash: 'SHA-256' },
    keyMaterial,
    256,
  );
  return toHex(new Uint8Array(derivedBits));
}

function createSalt() {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));
}

function createSession(user) {
  const session = {
    token: crypto.randomUUID(),
    user: { id: user.id, name: user.name, email: user.email },
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export const authService = {
  async register({ name, email, password }) {
    await waitForMockApi();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) throw new Error('Enter your name to create an account.');
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) throw new Error('Enter a valid email address.');
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      throw new Error('Use at least 8 characters with uppercase, lowercase, and a number.');
    }

    const users = readUsers();
    if (users.some((user) => user.email === cleanEmail)) {
      throw new Error('An account with this email already exists. Try signing in.');
    }

    const salt = createSalt();
    const user = {
      id: crypto.randomUUID(),
      name: cleanName,
      email: cleanEmail,
      salt,
      passwordHash: await hashPassword(password, salt),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
    return createSession(user);
  },

  async login({ email, password }) {
    await waitForMockApi();
    const cleanEmail = email.trim().toLowerCase();
    const user = readUsers().find((item) => item.email === cleanEmail);
    if (!user || await hashPassword(password, user.salt) !== user.passwordHash) {
      throw new Error('Email or password is incorrect.');
    }
    return createSession(user);
  },

  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },
};