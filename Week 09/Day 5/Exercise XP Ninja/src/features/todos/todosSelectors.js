import { createSelector } from '@reduxjs/toolkit';

export const selectAllTodos = (state) => state.todos.items;
export const selectVisibilityFilter = (state) => state.todos.visibilityFilter;

export const selectTodos = createSelector(
  [selectAllTodos, selectVisibilityFilter],
  (todos, visibilityFilter) => {
    if (visibilityFilter === 'Active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (visibilityFilter === 'Completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  },
);

export const selectFilteredTodosCount = createSelector(
  [selectTodos],
  (todos) => todos.length,
);

export const selectTodoCounts = createSelector(
  [selectAllTodos],
  (todos) => ({
    All: todos.length,
    Active: todos.filter((todo) => !todo.completed).length,
    Completed: todos.filter((todo) => todo.completed).length,
  }),
);
