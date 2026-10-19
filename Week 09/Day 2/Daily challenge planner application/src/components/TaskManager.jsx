import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addTask, deleteTask, editTask, toggleTask } from '../redux/actions.js';

function TaskForm({ initialTask, onSave, onCancel, submitLabel }) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [time, setTime] = useState(initialTask?.time || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    onSave({ title: cleanTitle, time });
    if (!initialTask) {
      setTitle('');
      setTime('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="task-title">
        Task name
      </label>
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a task to your day..."
        maxLength={120}
        autoComplete="off"
        required
      />
      <label className="time-input">
        <span className="visually-hidden">Task time (optional)</span>
        <input
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          aria-label="Task time (optional)"
        />
      </label>
      <div className="form-actions">
        {onCancel && (
          <button className="cancel-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="save-button" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}

function TaskManager({ selectedDate, tasks, addTask, editTask, deleteTask, toggleTask }) {
  const [editingId, setEditingId] = useState(null);
  const completedCount = tasks.filter((task) => task.completed).length;

  const handleAdd = (task) => addTask(selectedDate, task);

  const handleEdit = (taskId, changes) => {
    editTask(selectedDate, taskId, changes);
    setEditingId(null);
  };

  return (
    <section className="tasks-card" aria-labelledby="tasks-heading">
      <div className="tasks-header">
        <div>
          <h2 id="tasks-heading">Today&apos;s plan</h2>
          <p>Keep your priorities clear and achievable.</p>
        </div>
        <span className="task-counter">{completedCount}/{tasks.length} done</span>
      </div>

      <TaskForm onSave={handleAdd} submitLabel="Add task" />

      {tasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-art" aria-hidden="true">✳</span>
          <h3>A fresh page</h3>
          <p>Add your first task and make this day yours.</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li className={`task-row${task.completed ? ' is-complete' : ''}`} key={task.id}>
              {editingId === task.id ? (
                <TaskForm
                  initialTask={task}
                  onSave={(changes) => handleEdit(task.id, changes)}
                  onCancel={() => setEditingId(null)}
                  submitLabel="Save"
                />
              ) : (
                <>
                  <label className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(selectedDate, task.id)}
                      aria-label={`Mark ${task.title} ${task.completed ? 'not done' : 'done'}`}
                    />
                    <span className="task-copy">
                      <span className="task-title">{task.title}</span>
                      {task.time && <time className="task-time">{task.time}</time>}
                    </span>
                  </label>
                  <div className="task-actions">
                    <button
                      className="text-button"
                      type="button"
                      onClick={() => setEditingId(task.id)}
                      aria-label={`Edit ${task.title}`}
                    >
                      Edit
                    </button>
                    <button
                      className="text-button delete-button"
                      type="button"
                      onClick={() => deleteTask(selectedDate, task.id)}
                      aria-label={`Delete ${task.title}`}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate,
  tasks: state.tasksByDate[state.selectedDate] || [],
});

export default connect(mapStateToProps, { addTask, editTask, deleteTask, toggleTask })(TaskManager);
