import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import todosReducer from './todosSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});