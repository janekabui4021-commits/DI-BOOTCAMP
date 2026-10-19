import { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions.js';

function AddTodo({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const todoText = text.trim();
    if (!todoText) return;

    addTodo(todoText);
    setText('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-todo">
        Add a task
      </label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to get done?"
        maxLength={160}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

export default connect(null, { addTodo })(AddTodo);
