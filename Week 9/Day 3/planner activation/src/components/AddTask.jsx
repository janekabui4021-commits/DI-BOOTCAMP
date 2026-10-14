import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/plannerSlice.js';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    dispatch(addTask({
      date: selectedDate,
      task: { id: crypto.randomUUID(), title: cleanTitle, time, completed: false },
    }));
    setTitle('');
    setTime('');
  }

  return (
    <form className="task-form add-task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task-title">Task name</label>
      <input
        id="new-task-title"
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
      <button className="save-button" type="submit">Add task</button>
    </form>
  );
}