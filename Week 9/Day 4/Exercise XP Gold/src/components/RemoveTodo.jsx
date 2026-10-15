import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../features/todos/todosSlice.js';

function RemoveTodo({ todoId, todoText }) {
  const dispatch = useDispatch();
  const handleRemove = useCallback(() => {
    dispatch(removeTodo(todoId));
  }, [dispatch, todoId]);

  return (
    <button
      aria-label={`Delete ${todoText}`}
      className="delete-button"
      type="button"
      onClick={handleRemove}
    >
      <span aria-hidden="true">×</span>
      <span className="sr-only">Delete</span>
    </button>
  );
}

export default RemoveTodo;
