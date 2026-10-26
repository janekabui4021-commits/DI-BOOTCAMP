# Fable — Collaborative Storytelling

A TypeScript monorepo for the Week 10 Day 5 collaborative storytelling project.
It contains a React + Redux Toolkit frontend, an Express + PostgreSQL API, and
shared TypeScript models.

## Requirements

- Node.js 20 or later
- npm 10 or later
- PostgreSQL 14 or later

## Run locally

From this project directory:

```powershell
npm install
Copy-Item backend\.env.example backend\.env
```

Edit `backend\.env` with your PostgreSQL connection and two separate random
secrets of at least 32 characters. For example, generate a secret with:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Create an empty PostgreSQL database named `fable`, then create the tables:

```powershell
npm run db:setup -w backend
```

Start both the API and frontend:

```powershell
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://127.0.0.1:5173`).
The API runs at `http://127.0.0.1:4000`; `http://127.0.0.1:4000/health` is its
health endpoint. The frontend defaults to this API URL. To change it, copy
`frontend\.env.example` to `frontend\.env` and set `VITE_API_URL`.

## Workspace commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run the frontend and API together |
| `npm run build` | Build shared types, API, and frontend |
| `npm run build -w backend` | Type-check and compile the API |
| `npm run build -w frontend` | Type-check and build the frontend |
| `npm run db:setup -w backend` | Create or update the local database tables |
| `npm test -w backend` | Run backend input-validation tests |
| `npm run start -w backend` | Start the compiled API |

## Features and API

- Register and log in with email/password; passwords are hashed with bcrypt.
- Access JWTs are held only in the Redux store. Short-lived access tokens are
  renewed with rotating, HTTP-only refresh cookies.
- Authenticated story CRUD at `GET/POST /api/stories` and
  `PATCH/DELETE /api/stories/:id`.
- Authenticated contributor management at `POST /api/contributors`,
  `GET /api/contributors/:story_id`, and
  `DELETE /api/contributors/:id`.
- Authenticated story comments with list, create, edit, and delete operations.
- Live story editing over authenticated WebSockets, with active collaborator
  presence, reconnect handling, database persistence, and stale-edit conflict
  detection.
- Story owners can edit/delete and manage contributors. Contributors can edit
  stories. Other users cannot see stories they have not been invited to.
- The workspace includes search, author filtering, a light/dark theme toggle,
  story editing, contributor lists, and a comments section on each story.
- Parameterized SQL, request validation, CORS allowlisting, security headers,
  authentication rate limiting, safe error responses, and graceful shutdown.

## API routes

| Method | Route | Access |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Public |
| `POST` | `/api/auth/login` | Public |
| `POST` | `/api/auth/refresh` | HTTP-only refresh cookie |
| `POST` | `/api/auth/logout` | HTTP-only refresh cookie |
| `GET` | `/api/stories` | Authenticated |
| `POST` | `/api/stories` | Authenticated |
| `PATCH` | `/api/stories/:id` | Author or contributor |
| `DELETE` | `/api/stories/:id` | Author |
| `POST` | `/api/contributors` | Story author |
| `GET` | `/api/contributors/:story_id` | Author or contributor |
| `DELETE` | `/api/contributors/:id` | Story author |
| `GET` | `/api/stories/:storyId/comments` | Author or contributor |
| `POST` | `/api/stories/:storyId/comments` | Author or contributor |
| `PATCH` | `/api/comments/:id` | Comment author |
| `DELETE` | `/api/comments/:id` | Comment author or story author |
| `WS` | `/api/live` | Authenticated story author or contributor |

WebSocket clients authenticate with the short-lived access token after
connecting. The server checks the browser origin and story permissions before
accepting edits. Live rooms are kept in memory, so run a single API instance
unless a shared WebSocket adapter is added. If two writers change a story at
the same time, the editor preserves the local draft, flags a conflict, and
lets the writer load the latest saved version before continuing.

Protected API requests use `Authorization: Bearer <accessToken>`. The browser
includes the refresh cookie with credentialed requests; JavaScript cannot read
that cookie.

## Render deployment

Deploy PostgreSQL, the API, and the static frontend as separate Render
resources. Keep the monorepo root as each service's repository root so npm
workspaces can resolve shared types.

1. Create a Render PostgreSQL database and copy its **internal** connection URL.
2. Create a Node web service:
   - Build: `npm ci && npm run build -w types && npm run build -w backend`
   - Start: `npm run start -w backend`
   - Add `DATABASE_URL`, `JWT_SECRET`, `REFRESH_SECRET`,
     `FRONTEND_ORIGIN`, and `NODE_ENV=production`.
3. Create a static site:
   - Build: `npm ci && npm run build -w types && npm run build -w frontend`
   - Publish directory: `frontend/dist`
   - Set `VITE_API_URL` to the deployed API origin (including `https://`).
4. Set the API's `FRONTEND_ORIGIN` to the exact deployed frontend origin.
   Production refresh cookies use `Secure` and `SameSite=None` to work across
   the separate Render origins.
5. Run the schema in `backend/db/schema.sql` against the Render database before
   using the app. Configure secrets in Render's environment settings, never in
   committed files.

## Current scope

Registration/login, story and contributor management, basic comment CRUD,
Live WebSocket editing, PostgreSQL persistence, Redux state, and deployment
instructions are implemented. Comment reactions, version history, profile
customization, avatar uploads, social-sharing integrations, and actual
production hosting remain unimplemented.
