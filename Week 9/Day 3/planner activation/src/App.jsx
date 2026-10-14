import React from 'react';
import { useSelector } from 'react-redux';
import AddTask from './components/AddTask.jsx';
import DatePicker from './components/DatePicker.jsx';
import TaskList from './components/TaskList.jsx';

const EMPTY_TASKS = [];

export default function App() {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const dayTasks = useSelector((state) => state.planner.tasksByDate[selectedDate]);
  const tasks = dayTasks || EMPTY_TASKS;

  return (
    <main className="page">
      <div className="planner">
        <header className="app-header">
          <a className="brand" href="#planner" aria-label="Daymark planner home">
            <span className="brand-mark" aria-hidden="true">D</span>
            <span>daymark</span>
          </a>
          <span className="course-label">WEEK 9 <i>/</i> DAY 3 <i>/</i> PLANNER ACTIVATION</span>
        </header>

        <section className="welcome" aria-labelledby="page-title">
          <p className="eyebrow">MAKE SPACE FOR WHAT MATTERS</p>
          <h1 id="page-title">Your day, <span>with intention.</span></h1>
          <p className="subtitle">Plan one day at a time. Keep the important things moving.</p>
        </section>

        <DatePicker />
        <section className="tasks-card" aria-labelledby="tasks-heading">
          <div className="tasks-header">
            <div>
              <p className="date-label">YOUR PLAN</p>
              <h2 id="tasks-heading">Tasks for this day</h2>
              <p>Keep your priorities clear and achievable.</p>
            </div>
            <span className="task-counter">
              {tasks.filter((task) => task.completed).length}/{tasks.length} done
            </span>
          </div>
          <AddTask />
          <TaskList />
        </section>

        <footer className="app-footer">
          <span>Small steps make good days.</span>
          <span>Week 9 · React Redux</span>
        </footer>
      </div>
    </main>
  );
}