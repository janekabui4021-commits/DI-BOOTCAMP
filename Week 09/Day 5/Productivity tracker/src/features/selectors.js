import { createSelector } from '@reduxjs/toolkit';

export const selectTasks = (state) => state.tasks.items;
export const selectCategories = (state) => state.categories.items;

export const selectTasksByCategory = createSelector(
  [selectTasks, (_state, categoryId) => categoryId],
  (tasks, categoryId) =>
    categoryId === 'all' ? tasks : tasks.filter((task) => task.categoryId === categoryId),
);

export const selectCompletedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.completed).length,
);

export const selectCategoryById = createSelector(
  [selectCategories, (_state, categoryId) => categoryId],
  (categories, categoryId) => categories.find((category) => category.id === categoryId),
);
