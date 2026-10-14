import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todosSlice.js';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) return;

    dispatch(addTodo({ id: crypto.randomUUID(), text: cleanText, completed: false }));
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
        autoComplete="off"
      />
      <button type="submit" aria-label="Add task">Add <span aria-hidden="true">+</span></button>
    </form>
  );
}