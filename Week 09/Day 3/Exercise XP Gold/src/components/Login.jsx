import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, setUser } from '../redux/authSlice.js';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(setUser({ name: name.trim(), email: email.trim() }));
    dispatch(loginUser());
    setPassword('');
  }

  return (
    <div className="login-content">
      <div className="panel-heading">
        <p className="eyebrow">WELCOME BACK</p>
        <h2>Sign in to continue</h2>
        <p>Enter your details to open your workspace.</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="display-name">Your name</label>
        <input
          id="display-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jamie Rivera"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jamie@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="At least 6 characters"
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button className="primary-button" type="submit">Sign in <span aria-hidden="true">→</span></button>
      </form>
      <p className="form-footnote">Any valid details work in this local demonstration.</p>
    </div>
  );
}