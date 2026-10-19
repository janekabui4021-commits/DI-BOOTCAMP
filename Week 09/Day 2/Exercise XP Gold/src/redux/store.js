import { createStore } from 'redux';
import { categoryTodoReducer } from './reducer.js';

export const store = createStore(categoryTodoReducer);
