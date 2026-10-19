import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTask } from '../redux/plannerSlice.js';
import DeleteTask from './DeleteTask.jsx';
import EditTask from './EditTask.jsx';

const EMPTY_TASKS = [];

export default function TaskList() {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const dayTasks = useSelector((state) => state.planner.tasksByDate[selectedDate]);
  const tasks = dayTasks || EMPTY_TASKS;
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-art" aria-hidden="true">✳</span>
        <h3>A fresh page</h3>
        <p>Add your first task and make this day yours.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li className={`task-row${task.completed ? ' is-complete' : ''}`} key={task.id}>
          {editingId === task.id ? (
            <EditTask date={selectedDate} task={task} onCancel={() => setEditingId(null)} />
          ) : (
            <>
              <label className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask({ date: selectedDate, taskId: task.id }))}
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
                <DeleteTask date={selectedDate} taskId={task.id} title={task.title} />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}