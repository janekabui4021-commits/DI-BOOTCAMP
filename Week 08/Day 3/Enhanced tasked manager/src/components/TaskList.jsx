import { useEffect, useRef, useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';

const filters = ['all', 'active', 'completed'];

export default function TaskList() {
  const { tasks, filter, setFilter, toggleTask, editTask, removeTask } = useTasks();
  const [editingId, setEditingId] = useState(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (editingId !== null) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [editingId]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  function saveEdit(event, task) {
    event.preventDefault();
    const text = editInputRef.current?.value ?? '';
    if (text.trim()) {
      editTask(task.id, text);
      setEditingId(null);
    } else {
      editInputRef.current?.focus();
    }
  }

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

              {editingId === task.id ? (
                <form className="edit-form" onSubmit={(event) => saveEdit(event, task)}>
                  <label className="visually-hidden" htmlFor={`edit-${task.id}`}>Edit {task.text}</label>
                  <input
                    id={`edit-${task.id}`}
                    aria-label={`Edit ${task.text}`}
                    className="edit-input"
                    defaultValue={task.text}
                    maxLength={160}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') setEditingId(null);
                    }}
                    ref={editInputRef}
                  />
                  <button className="edit-save" type="submit">Save</button>
                  <button className="edit-cancel" onClick={() => setEditingId(null)} type="button">Cancel</button>
                </form>
              ) : (
                <>
                  <button
                    className="task-text"
                    onClick={() => setEditingId(task.id)}
                    title="Click to edit"
                    type="button"
                  >
                    {task.text}
                  </button>
                  <div className="task-actions">
                    <button
                      aria-label={`Edit ${task.text}`}
                      className="edit-button"
                      onClick={() => setEditingId(task.id)}
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      aria-label={`Remove ${task.text}`}
                      className="remove-button"
                      onClick={() => removeTask(task.id)}
                      type="button"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="task-card-footer">
        <span><span className="footer-dot" /> Click a task to edit its details.</span>
        <span>One thing at a time.</span>
      </div>
    </section>
  );
}
