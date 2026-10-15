import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice.js';

function AddTodo() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    dispatch(addTodo(trimmedText));
    setText('');
  }, [dispatch, text]);

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <span className="add-icon" aria-hidden="true">+</span>
      <input
        aria-label="New todo"
        maxLength={120}
        placeholder="Add something to your list..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button disabled={!text.trim()} type="submit">
        Add task <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export default AddTodo;
