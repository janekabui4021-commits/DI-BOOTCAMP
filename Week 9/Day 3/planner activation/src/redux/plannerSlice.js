import { createSlice } from '@reduxjs/toolkit';

export function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const plannerSlice = createSlice({
  name: 'planner',
  initialState: {
    selectedDate: getTodayKey(),
    tasksByDate: {},
  },
  reducers: {
    setSelectedDate: (state, action) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(action.payload)) {
        state.selectedDate = action.payload;
      }
    },
    addTask: (state, action) => {
      const { date, task } = action.payload;
      if (!task.title.trim()) return;
      state.tasksByDate[date] ??= [];
      state.tasksByDate[date].push(task);
    },
    editTask: (state, action) => {
      const { date, taskId, changes } = action.payload;
      const task = state.tasksByDate[date]?.find((item) => item.id === taskId);
      if (task && changes.title.trim()) {
        task.title = changes.title.trim();
        task.time = changes.time;
      }
    },
    deleteTask: (state, action) => {
      const { date, taskId } = action.payload;
      const tasks = state.tasksByDate[date];
      if (!tasks) return;
      const remainingTasks = tasks.filter((task) => task.id !== taskId);
      if (remainingTasks.length) {
        state.tasksByDate[date] = remainingTasks;
      } else {
        delete state.tasksByDate[date];
      }
    },
    toggleTask: (state, action) => {
      const { date, taskId } = action.payload;
      const task = state.tasksByDate[date]?.find((item) => item.id === taskId);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { addTask, deleteTask, editTask, setSelectedDate, toggleTask } = plannerSlice.actions;
export default plannerSlice.reducer;