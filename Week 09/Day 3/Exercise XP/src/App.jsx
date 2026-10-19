import React from 'react';
import AddTodo from './components/AddTodo.jsx';
import TodoList from './components/TodoList.jsx';

export default function App() {
  return (
    <main className="page-shell">
      <section className="todo-app" aria-labelledby="page-title">
        <header className="app-header">
          <p className="eyebrow">WEEK 9 <span>/</span> DAY 3 <span>/</span> EXERCISE XP</p>
          <h1 id="page-title">A little more <span>done.</span></h1>
          <p className="subtitle">Make a list. Move things forward.</p>
        </header>
        <AddTodo />
        <TodoList />
        <footer className="app-footer">Powered by React, Redux, and a fresh start.</footer>
      </section>
    </main>
  );
}