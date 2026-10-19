import { createStore } from 'redux';
import { plannerReducer, initialState } from './reducer.js';

const STORAGE_KEY = 'week-9-daily-planner';

function isSavedState(value) {
  if (
    !value ||
    typeof value !== 'object' ||
    typeof value.selectedDate !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value.selectedDate) ||
    !value.tasksByDate ||
    typeof value.tasksByDate !== 'object' ||
    !Number.isInteger(value.nextTaskId) ||
    value.nextTaskId < 1
  ) {
    return false;
  }

  return Object.entries(value.tasksByDate).every(
    ([date, tasks]) =>
      /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      Array.isArray(tasks) &&
      tasks.every(
        (task) =>
          Number.isInteger(task.id) &&
          typeof task.title === 'string' &&
          typeof task.time === 'string' &&
          typeof task.completed === 'boolean',
      ),
  );
}

function loadSavedState() {
  try {
    const serializedState = window.localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;

    const savedState = JSON.parse(serializedState);
    if (isSavedState(savedState)) return savedState;

    console.error('The saved planner data is invalid. Starting with an empty planner.');
  } catch (error) {
    console.error('Unable to load saved planner data.', error);
  }
  return undefined;
}

export const store = createStore(plannerReducer, loadSavedState() || initialState);

store.subscribe(() => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch (error) {
    console.error('Unable to save planner data in this browser.', error);
  }
});
