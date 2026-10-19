import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser } from '../redux/authActions.js';
import { clearAuthError } from '../redux/authSlice.js';

function AuthPanel({ error, loading, login, register, clearError }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isRegistering = mode === 'register';

  function changeMode(nextMode) {
    setMode(nextMode);
    setPassword('');
    clearError();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = isRegistering
      ? await register({ name, email, password })
      : await login({ email, password });
    if (result.success) setPassword('');
  }

  return (
    <section className="auth-layout" aria-labelledby="auth-title">
      <div className="auth-aside">
        <p className="aside-kicker">A CLEARER KIND OF PRODUCTIVITY</p>
        <h1>Make room for what matters.</h1>
        <p>Your tasks, in one calm place. Sign in to start your list.</p>
        <div className="aside-rule" />
        <p className="aside-note">DEMO ACCOUNT <span>·</span> Created locally in this browser</p>
      </div>
      <div className="auth-content">
        <div className="auth-heading">
          <p className="eyebrow">YOUR PERSONAL TODO LIST</p>
          <h2 id="auth-title">{isRegistering ? 'Create your account' : 'Welcome back'}</h2>
          <p>{isRegistering ? 'A few details and you’re ready to begin.' : 'Sign in to pick up where you left off.'}</p>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Account access">
          <button
            className={mode === 'login' ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            onClick={() => changeMode('login')}
          >
            Sign in
          </button>
          <button
            className={mode === 'register' ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={mode === 'register'}
            onClick={() => changeMode('register')}
          >
            Create account
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <label htmlFor="register-name">Name</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                placeholder="Your name"
                maxLength={60}
                required
              />
            </>
          )}
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={isRegistering ? 'new-password' : 'current-password'}
            placeholder={isRegistering ? '8+ characters, upper, lower, number' : 'Your password'}
            minLength={isRegistering ? 8 : 1}
            required
          />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Please wait…' : isRegistering ? 'Create account' : 'Sign in'}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
        </form>
        <p className="auth-footnote">Passwords are hashed for this local demo. No server is contacted.</p>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.auth.status === 'loading',
});

const mapDispatchToProps = {
  login: loginUser,
  register: registerUser,
  clearError: clearAuthError,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel);