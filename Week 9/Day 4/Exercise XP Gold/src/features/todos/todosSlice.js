import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchTodos } from './todosThunk.js';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.unshift(action.payload);
      },
      prepare: (text) => ({
        payload: {
          id: `local-${nanoid()}`,
          text,
          completed: false,
        },
      }),
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setTodos: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        if (action.meta.condition) return;
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'An unexpected error occurred.';
      });
  },
});

export const { addTodo, removeTodo, toggleTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
