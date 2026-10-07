import { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';

const filters = ['all', 'active', 'completed'];

export default function TaskList() {
  const [filter, setFilter] = useState('all');
  const { tasks, toggleTask, removeTask } = useTasks();
  const completedCount = tasks.filter((task) => task.completed).length;
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <section className="task-card" aria-labelledby="tasks-title">
      <div className="task-card-heading">
        <div>
          <p className="section-label">YOUR LIST</p>
          <h2 id="tasks-title">Tasks <span className="task-count">{tasks.length}</span></h2>
        </div>
        <div className="completion-summary">
          <span className="completion-number">{completedCount}</span>
          <span>of {tasks.length} done</span>
        </div>
      </div>

      <div className="list-toolbar">
        <div className="filter-tabs" aria-label="Filter tasks">
          {filters.map((item) => (
            <button
              aria-pressed={filter === item}
              className={`filter-tab ${filter === item ? 'selected' : ''}`}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        {tasks.length > 0 && (
          <span className="remaining-count">
            {tasks.length - completedCount} remaining
          </span>
        )}
      </div>

      {visibleTasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-check" aria-hidden="true">{filter === 'completed' ? '✓' : '·'}</span>
          <p>{tasks.length === 0 ? 'Nothing on your list yet.' : 'No tasks in this view.'}</p>
          <span>
            {tasks.length === 0
              ? 'Add a task above and take it one step at a time.'
              : filter === 'active'
                ? 'You have completed everything. Nice work!'
                : 'Mark a task as done to find it here.'}
          </span>
        </div>
      ) : (
        <ul className="task-items">
          {visibleTasks.map((task) => (
            <li className={`task-item ${task.completed ? 'is-completed' : ''}`} key={task.id}>
              <button
                aria-label={task.completed ? `Mark ${task.text} as active` : `Complete ${task.text}`}
                aria-pressed={task.completed}
                className="complete-button"
                onClick={() => toggleTask(task.id)}
                type="button"
              >
                {task.completed && <span aria-hidden="true">✓</span>}
              </button>
              <span className="task-text">{task.text}</span>
              <button
                aria-label={`Remove ${task.text}`}
                className="remove-button"
                onClick={() => removeTask(task.id)}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="task-card-footer">
        <span><span className="footer-dot" /> Your tasks stay right here in this session.</span>
        <span>One thing at a time.</span>
      </div>
    </section>
  );
}
