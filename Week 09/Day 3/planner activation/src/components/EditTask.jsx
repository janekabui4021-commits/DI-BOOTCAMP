import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../redux/plannerSlice.js';

export default function EditTask({ date, task, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [time, setTime] = useState(task.time);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    dispatch(editTask({ date, taskId: task.id, changes: { title: cleanTitle, time } }));
    onCancel();
  }

  return (
    <form className="task-form edit-task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor={`edit-title-${task.id}`}>Edit task name</label>
      <input
        id={`edit-title-${task.id}`}
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={120}
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
        <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
        <button className="save-button" type="submit">Save</button>
      </div>
    </form>
  );
}