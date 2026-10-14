import { createSelector } from '@reduxjs/toolkit';

const selectTodosState = (state) => state.todos;

export const selectAllTodos = createSelector(
  [selectTodosState],
  (todosState) => todosState.todos,
);

export const selectActiveTodos = createSelector([selectAllTodos], (todos) =>
  todos.filter((todo) => !todo.completed),
);

export const selectCompletedTodos = createSelector([selectAllTodos], (todos) =>
  todos.filter((todo) => todo.completed),
);
