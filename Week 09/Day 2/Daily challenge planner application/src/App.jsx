import React from 'react';
import DatePicker from './components/DatePicker.jsx';
import TaskManager from './components/TaskManager.jsx';

export default function App() {
  return (
    <main className="page">
      <div className="planner">
        <header className="app-header">
          <a className="brand" href="/" aria-label="Daymark planner home">
            <span className="brand-mark" aria-hidden="true">D</span>
            <span>daymark</span>
          </a>
          <span className="course-label">WEEK 9 · DAY 2 · DAILY CHALLENGE</span>
        </header>

        <section className="welcome" aria-labelledby="page-title">
          <p className="eyebrow">MAKE SPACE FOR WHAT MATTERS</p>
          <h1 id="page-title">Your day, <span>with intention.</span></h1>
          <p className="subtitle">Plan one day at a time. Keep the important things moving.</p>
        </section>

        <DatePicker />
        <TaskManager />

        <footer className="app-footer">
          <span>Small steps make good days.</span>
          <span>Saved in this browser</span>
        </footer>
      </div>
    </main>
  );
}
