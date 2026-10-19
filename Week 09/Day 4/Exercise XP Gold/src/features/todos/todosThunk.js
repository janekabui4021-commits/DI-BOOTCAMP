import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTodos } from './todosSlice.js';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { dispatch, rejectWithValue, signal }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1', { signal });

    if (!response.ok) {
      return rejectWithValue(`Could not fetch todos (request failed with status ${response.status}).`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.some((todo) => (
      typeof todo.id !== 'number'
      || typeof todo.title !== 'string'
      || typeof todo.completed !== 'boolean'
    ))) {
      return rejectWithValue('The server returned todo data in an unexpected format.');
    }

    const todos = data.map((todo) => ({
      id: `api-${todo.id}`,
      text: todo.title,
      completed: todo.completed,
    }));

    dispatch(setTodos(todos));
    return todos;
  },
  {
    condition: (_, { getState }) => getState().todos.status !== 'loading',
  },
);
