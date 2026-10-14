import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../features/todos/todosSlice.js';

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    dispatch(addTodo(trimmed));
    setValue('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Todo manager</h2>
        <span>{todos.filter((todo) => todo.completed).length}/{todos.length} done</span>
      </div>

      <form onSubmit={handleSubmit} className="input-row">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="stack-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`task-item ${todo.completed ? 'done' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span>{todo.text}</span>
            </label>
            <button type="button" className="ghost-button" onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
