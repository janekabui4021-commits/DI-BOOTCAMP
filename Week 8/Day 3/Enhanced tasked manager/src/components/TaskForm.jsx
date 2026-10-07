import { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskForm() {
  const [text, setText] = useState('');
  const { addTask } = useTasks();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    addTask(trimmedText);
    setText('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task">New task</label>
      <span className="form-plus" aria-hidden="true">+</span>
      <input
        id="new-task"
        autoComplete="off"
        maxLength={160}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a task to your list..."
        value={text}
      />
      <button className="add-button" disabled={!text.trim()} type="submit">
        Add task <span aria-hidden="true">↵</span>
      </button>
    </form>
  );
}
