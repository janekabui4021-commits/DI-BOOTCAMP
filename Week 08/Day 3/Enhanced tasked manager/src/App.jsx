import { useTasks } from './context/TaskContext.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

export default function App() {
  const { tasks } = useTasks();
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="topbar">
          <a className="brand" href="#" aria-label="Daybook home">
            <span className="brand-icon" aria-hidden="true">d.</span>
            <span>daybook</span>
          </a>
          <span className="date-label"><span className="date-dot" /> A little more focused</span>
        </header>

        <section className="intro">
          <p className="eyebrow">WEEK 8 <span>·</span> DAY 3 <span>·</span> DAILY CHALLENGE</p>
          <h1>Make room for<br /><span>what matters.</span></h1>
          <p className="intro-copy">Plan your day, polish the details, and keep moving forward.</p>
          <div className="progress-line" aria-live="polite">
            <span className="progress-symbol" aria-hidden="true">✳</span>
            <span>
              {tasks.length === 0
                ? 'A fresh page. What would you like to do?'
                : completedCount === tasks.length
                  ? 'Everything on your list is done. Well done!'
                  : `${completedCount} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} complete. Keep going.`}
            </span>
          </div>
        </section>

        <TaskForm />
        <TaskList />

        <footer className="page-footer">
          <span>Small steps add up.</span>
          <span>Built with React Context, useReducer &amp; useRef</span>
        </footer>
      </div>
    </main>
  );
}
