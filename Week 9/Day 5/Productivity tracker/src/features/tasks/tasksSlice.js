import { createSlice } from '@reduxjs/toolkit';

const today = new Date();
const localDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0'),
].join('-');

const initialState = {
  items: [
    { id: 'task-1', title: 'Plan the week and set priorities', categoryId: 'deep-work', completed: true, dueDate: localDate },
    { id: 'task-2', title: 'Finish the project proposal', categoryId: 'deep-work', completed: false, dueDate: localDate },
    { id: 'task-3', title: 'Take a proper lunch break', categoryId: 'wellbeing', completed: false, dueDate: localDate },
    { id: 'task-4', title: 'Go for an afternoon walk', categoryId: 'wellbeing', completed: false, dueDate: '' },
    { id: 'task-5', title: 'Pick up groceries on the way home', categoryId: 'personal', completed: false, dueDate: '' },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.unshift(action.payload);
    },
    editTask: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload.changes);
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    updateTaskProgress: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
      }
    },
    moveTasksToUncategorized: (state, action) => {
      state.items.forEach((task) => {
        if (task.categoryId === action.payload) {
          task.categoryId = null;
        }
      });
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  moveTasksToUncategorized,
} = tasksSlice.actions;
export default tasksSlice.reducer;
