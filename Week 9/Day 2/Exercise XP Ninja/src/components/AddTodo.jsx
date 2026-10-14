import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/todosSlice.js';

function AddTodo({ userId, add }) {
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) return;
    add({ userId, id: crypto.randomUUID(), text: cleanText });
    setText('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-todo">New task</label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs doing?"
        maxLength={140}
        autoComplete="off"
        required
      />
      <button className="add-button" type="submit"><span aria-hidden="true">+</span> Add task</button>
    </form>
  );
}

export default connect(null, { add: addTodo })(AddTodo);