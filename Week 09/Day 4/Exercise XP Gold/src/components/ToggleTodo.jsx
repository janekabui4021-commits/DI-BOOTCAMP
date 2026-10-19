import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo } from '../features/todos/todosSlice.js';

function ToggleTodo({ todo }) {
  const dispatch = useDispatch();
  const handleToggle = useCallback(() => {
    dispatch(toggleTodo(todo.id));
  }, [dispatch, todo.id]);

  return (
    <button
      aria-label={todo.completed ? `Mark ${todo.text} incomplete` : `Mark ${todo.text} complete`}
      aria-pressed={todo.completed}
      className={`todo-check ${todo.completed ? 'checked' : ''}`}
      type="button"
      onClick={handleToggle}
    >
      {todo.completed && <span aria-hidden="true">✓</span>}
    </button>
  );
}

export default ToggleTodo;
