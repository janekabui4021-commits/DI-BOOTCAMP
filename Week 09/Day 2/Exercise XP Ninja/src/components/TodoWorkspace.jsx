import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/authActions.js';
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';

function TodoWorkspace({ user, logout }) {
  const initials = user.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return (
    <section className="todo-workspace" aria-labelledby="todo-title">
      <div className="workspace-topline">
        <div className="user-badge">
          <span className="avatar" aria-hidden="true">{initials}</span>
          <span><strong>{user.name}</strong><small>{user.email}</small></span>
        </div>
        <button className="logout-button" type="button" onClick={logout}>
          <span aria-hidden="true">↗</span> Sign out
        </button>
      </div>
      <header className="todo-heading">
        <p className="eyebrow">YOUR DAY, AT A GLANCE</p>
        <h1 id="todo-title">My todo list<span>.</span></h1>
        <p>A little progress each day adds up to big results.</p>
      </header>
      <AddTodo userId={user.id} />
      <TodoList userId={user.id} />
    </section>
  );
}

export default connect(null, { logout: logoutUser })(TodoWorkspace);