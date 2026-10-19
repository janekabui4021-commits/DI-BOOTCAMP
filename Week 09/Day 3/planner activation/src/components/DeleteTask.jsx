import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/plannerSlice.js';

export default function DeleteTask({ date, taskId, title }) {
  const dispatch = useDispatch();

  return (
    <button
      className="text-button delete-button"
      type="button"
      onClick={() => dispatch(deleteTask({ date, taskId }))}
      aria-label={`Delete ${title}`}
    >
      Delete
    </button>
  );
}