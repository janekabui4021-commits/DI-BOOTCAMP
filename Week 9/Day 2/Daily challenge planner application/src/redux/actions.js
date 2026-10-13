export const SET_SELECTED_DATE = 'planner/setSelectedDate';
export const ADD_TASK = 'planner/addTask';
export const EDIT_TASK = 'planner/editTask';
export const DELETE_TASK = 'planner/deleteTask';
export const TOGGLE_TASK = 'planner/toggleTask';

export const setSelectedDate = (date) => ({
  type: SET_SELECTED_DATE,
  payload: date,
});

export const addTask = (date, task) => ({
  type: ADD_TASK,
  payload: { date, task },
});

export const editTask = (date, taskId, changes) => ({
  type: EDIT_TASK,
  payload: { date, taskId, changes },
});

export const deleteTask = (date, taskId) => ({
  type: DELETE_TASK,
  payload: { date, taskId },
});

export const toggleTask = (date, taskId) => ({
  type: TOGGLE_TASK,
  payload: { date, taskId },
});
