import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice.js';
import moviesReducer from './features/movies/moviesSlice.js';
import productsReducer from './features/products/productsSlice.js';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    movies: moviesReducer,
    products: productsReducer,
  },
});

export default store;
