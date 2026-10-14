import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';

function AuthenticatedContent({ user }) {
  const initials = user.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return (
    <section className="welcome-panel" aria-labelledby="welcome-title">
      <div className="profile-row">
        <span className="avatar" aria-hidden="true">{initials}</span>
        <div>
          <p className="profile-label">SIGNED IN AS</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
      <div className="welcome-copy">
        <p className="eyebrow">YOUR SPACE IS READY</p>
        <h2 id="welcome-title">Good to have you here, {user.name}.</h2>
        <p>Your authenticated view is active. Sign out whenever you’re done.</p>
      </div>
      <Logout />
    </section>
  );
}

export default function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <main className="page-shell">
      <section className="auth-layout" aria-label="Authentication demo">
        <aside className="brand-panel">
          <div className="brand-lockup"><span className="brand-mark">F</span> FIELDNOTE</div>
          <div className="brand-message">
            <p className="brand-kicker">WEEK 9 <span>/</span> DAY 3 <span>/</span> GOLD</p>
            <h1>Good work starts with a little trust.</h1>
            <p>A simple sign-in flow, managed with Redux Toolkit.</p>
          </div>
          <div className="security-note">
            <span className="status-dot" aria-hidden="true" />
            <span>DEMO MODE <span className="note-divider">·</span> No credentials are sent or saved</span>
          </div>
        </aside>
        <section className="form-panel" aria-live="polite">
          {isAuthenticated && user ? (
            <AuthenticatedContent user={user} />
          ) : (
            <Login />
          )}
        </section>
      </section>
    </main>
  );
}