import React from 'react';
import AddTodo from './components/AddTodo.jsx';
import CategoryList from './components/CategoryList.jsx';
import TodoList from './components/TodoList.jsx';

export default function App() {
  return (
    <main className="page">
      <section className="todo-app" aria-labelledby="page-title">
        <header className="topbar">
          <a className="brand" href="/" aria-label="Daylist home">
            <span className="brand-icon" aria-hidden="true">✓</span>
            daylist
          </a>
          <span className="course-tag">WEEK 9 · DAY 2 · EXERCISE XP GOLD</span>
        </header>

        <div className="intro">
          <p className="eyebrow">A CLEAR SPACE FOR YOUR TO-DOS</p>
          <h1 id="page-title">Make room for <span>what matters.</span></h1>
          <p className="subtitle">Sort your tasks into categories and take them one at a time.</p>
        </div>

        <CategoryList />
        <AddTodo />
        <TodoList />

        <footer className="footer">
          <span>Every checked box is a little win.</span>
          <span>Organized with React + Redux</span>
        </footer>
      </section>
    </main>
  );
}
