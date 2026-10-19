import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, text: 'Learn Redux Toolkit', completed: true },
    { id: 2, text: 'Build a todo dashboard', completed: false },
    { id: 3, text: 'Review the final solution', completed: false },
  ],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
