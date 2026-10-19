import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: { byUserId: {} },
  reducers: {
    addTodo: (state, action) => {
      const { userId, id, text } = action.payload;
      if (!userId) return;
      state.byUserId[userId] ??= [];
      state.byUserId[userId].push({ id, text, completed: false });
    },
    toggleTodo: (state, action) => {
      const { userId, id } = action.payload;
      const todo = state.byUserId[userId]?.find((item) => item.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      const { userId, id } = action.payload;
      const todos = state.byUserId[userId];
      if (todos) state.byUserId[userId] = todos.filter((todo) => todo.id !== id);
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;