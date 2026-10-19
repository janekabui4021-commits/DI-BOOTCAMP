import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, selectTasksByCategory } from '../features/selectors.js';
import {
  deleteTask,
  editTask,
  updateTaskProgress,
} from '../features/tasks/tasksSlice.js';

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
});

function TaskItem({ task, category, onEdit, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = (event) => {
    event.preventDefault();
    const nextTitle = title.trim();
    if (nextTitle) {
      onEdit(task.id, nextTitle);
      setIsEditing(false);
    }
  };

  return (
    <article className={`task-row ${task.completed ? 'task-complete' : ''}`}>
      <button
        aria-label={task.completed ? `Mark ${task.title} as incomplete` : `Mark ${task.title} as complete`}
        aria-pressed={task.completed}
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        type="button"
        onClick={() => onToggle(task.id, !task.completed)}
      >
        {task.completed && <span aria-hidden="true">✓</span>}
      </button>

      <div className="task-main">
        {isEditing ? (
          <form className="task-edit-form" onSubmit={handleSave}>
            <input
              aria-label="Edit task title"
              autoFocus
              maxLength={120}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setTitle(task.title);
                  setIsEditing(false);
                }
              }}
            />
            <button className="text-action save-action" type="submit">Save</button>
            <button
              className="text-action"
              type="button"
              onClick={() => {
                setTitle(task.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            className="task-title"
            type="button"
            onClick={() => setIsEditing(true)}
            title="Click to edit"
          >
            {task.title}
          </button>
        )}
        <div className="task-meta">
          <span className={`task-category ${category ? `text-${category.color}` : ''}`}>
            <span className={`category-dot dot-${category?.color || 'muted'}`} aria-hidden="true" />
            {category?.name || 'Uncategorized'}
          </span>
          {task.dueDate && (
            <span className="task-date">
              <span aria-hidden="true">·</span>
              {dateFormatter.format(new Date(`${task.dueDate}T00:00:00`))}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        {!isEditing && (
          <>
            <button
              className="icon-button"
              type="button"
              aria-label={`Edit ${task.title}`}
              onClick={() => {
                setTitle(task.title);
                setIsEditing(true);
              }}
            >
              Edit
            </button>
            <button
              className="icon-button delete-task"
              type="button"
              aria-label={`Delete ${task.title}`}
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
}

function TaskList({ categoryId }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectTasksByCategory(state, categoryId));
  const categories = useSelector(selectCategories);
  const [statusFilter, setStatusFilter] = useState('all');

  const visibleTasks = useMemo(() => {
    if (statusFilter === 'active') return tasks.filter((task) => !task.completed);
    if (statusFilter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  }, [statusFilter, tasks]);

  const handleEdit = useCallback((id, title) => {
    dispatch(editTask({ id, changes: { title } }));
  }, [dispatch]);

  const handleToggle = useCallback((id, completed) => {
    dispatch(updateTaskProgress({ id, completed }));
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  return (
    <section className="task-list" aria-label="Tasks">
      <div className="task-list-heading">
        <h2>Your tasks</h2>
        <div className="filter-tabs" aria-label="Filter tasks">
          {[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'To do' },
            { id: 'completed', label: 'Done' },
          ].map((filter) => (
            <button
              aria-pressed={statusFilter === filter.id}
              className={`filter-tab ${statusFilter === filter.id ? 'active' : ''}`}
              key={filter.id}
              type="button"
              onClick={() => setStatusFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {visibleTasks.length ? (
        <div className="task-rows">
          {visibleTasks.map((task) => (
            <TaskItem
              category={categories.find((item) => item.id === task.categoryId)}
              key={task.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggle={handleToggle}
              task={task}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">{statusFilter === 'completed' ? '✓' : '✳'}</span>
          <h3>{statusFilter === 'completed' ? 'Nothing completed just yet' : 'A clear page'}</h3>
          <p>
            {statusFilter === 'completed'
              ? 'Finish a task and it will find its way here.'
              : 'Add a task above and take the first small step.'}
          </p>
        </div>
      )}
    </section>
  );
}

export default TaskList;
