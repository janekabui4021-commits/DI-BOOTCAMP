import { useReducer, useRef, useState } from 'react';
import { todoReducer } from '../todoReducer';

export default function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');
  const nextId = useRef(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    nextId.current += 1;
    dispatch({ type: 'add', id: nextId.current, text: trimmedText });
    setText('');
  };

  return (
    <section className="todo-card" aria-labelledby="todo-title">
      <div className="todo-heading">
        <div>
          <h2 id="todo-title">Your tasks</h2>
          <p>{todos.length === 1 ? '1 task' : `${todos.length} tasks`}</p>
        </div>
        <span className="list-icon" aria-hidden="true">✓</span>
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="new-todo">New todo</label>
        <input
          id="new-todo"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What needs to get done?"
          autoComplete="off"
        />
        <button type="submit" disabled={!text.trim()}>Add task</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-state">Your list is clear. Add a task to get started.</p>
      ) : (
        <ul className="todo-items">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <span className="todo-marker" aria-hidden="true" />
              <span className="todo-text">{todo.text}</span>
              <button
                type="button"
                className="remove-button"
                onClick={() => dispatch({ type: 'remove', id: todo.id })}
                aria-label={`Remove ${todo.text}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
