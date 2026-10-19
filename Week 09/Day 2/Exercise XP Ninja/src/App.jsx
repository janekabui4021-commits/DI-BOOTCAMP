import React from 'react';
import { useSelector } from 'react-redux';
import AuthPanel from './components/AuthPanel.jsx';
import TodoWorkspace from './components/TodoWorkspace.jsx';

export default function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <main className="page-shell">
      <div className="app-frame">
        <header className="topbar">
          <a className="brand" href="#home" aria-label="Goodlist home">
            <span className="brand-mark" aria-hidden="true">g</span>
            <span>goodlist<span className="brand-dot">.</span></span>
          </a>
          <span className="course-label">WEEK 9 <i>/</i> DAY 2 <i>/</i> NINJA</span>
        </header>
        {user ? <TodoWorkspace user={user} /> : <AuthPanel />}
        <footer className="app-footer">
          <span>Small steps count.</span>
          <span className="demo-label"><span aria-hidden="true" /> LOCAL AUTH DEMO</span>
        </footer>
      </div>
    </main>
  );
}