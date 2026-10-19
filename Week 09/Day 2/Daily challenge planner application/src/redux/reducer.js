import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_SELECTED_DATE,
  TOGGLE_TASK,
} from './actions.js';

const isDateKey = (value) =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

export const getTodayKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const initialState = {
  selectedDate: getTodayKey(),
  tasksByDate: {},
  nextTaskId: 1,
};

export function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return isDateKey(action.payload) ? { ...state, selectedDate: action.payload } : state;

    case ADD_TASK: {
      const { date, task } = action.payload;
      if (!isDateKey(date) || !task.title?.trim()) return state;

      const taskForDay = {
        id: state.nextTaskId,
        title: task.title.trim(),
        time: task.time || '',
        completed: false,
      };

      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: [...(state.tasksByDate[date] || []), taskForDay],
        },
        nextTaskId: state.nextTaskId + 1,
      };
    }

    case EDIT_TASK: {
      const { date, taskId, changes } = action.payload;
      const tasks = state.tasksByDate[date];
      if (!isDateKey(date) || !tasks || !changes.title?.trim()) return state;

      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: tasks.map((task) =>
            task.id === taskId
              ? { ...task, title: changes.title.trim(), time: changes.time || '' }
              : task,
          ),
        },
      };
    }

    case DELETE_TASK: {
      const { date, taskId } = action.payload;
      const tasks = state.tasksByDate[date];
      if (!isDateKey(date) || !tasks) return state;

      const remainingTasks = tasks.filter((task) => task.id !== taskId);
      const tasksByDate = { ...state.tasksByDate };
      if (remainingTasks.length) {
        tasksByDate[date] = remainingTasks;
      } else {
        delete tasksByDate[date];
      }
      return { ...state, tasksByDate };
    }

    case TOGGLE_TASK: {
      const { date, taskId } = action.payload;
      const tasks = state.tasksByDate[date];
      if (!isDateKey(date) || !tasks) return state;

      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        },
      };
    }

    default:
      return state;
  }
}
