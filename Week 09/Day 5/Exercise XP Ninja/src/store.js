import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice.js';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
