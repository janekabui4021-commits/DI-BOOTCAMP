import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 'todo-1', text: 'Water the plants', completed: true },
    { id: 'todo-2', text: 'Write a few pages in my journal', completed: false },
    { id: 'todo-3', text: 'Take a proper lunch break', completed: false },
    { id: 'todo-4', text: 'Reply to the project email', completed: true },
    { id: 'todo-5', text: 'Pick up groceries on the way home', completed: false },
  ],
  visibilityFilter: 'All',
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
        payload: { id: nanoid(), text, completed: false },
      }),
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    setVisibilityFilter: (state, action) => {
      state.visibilityFilter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setVisibilityFilter } = todosSlice.actions;
export default todosSlice.reducer;
