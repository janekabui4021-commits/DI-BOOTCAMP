import { createContext, useContext, useReducer, useRef } from 'react';

const initialState = { tasks: [], filter: 'all' };

export const TaskContext = createContext(null);

export function taskReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, tasks: [...state.tasks, action.task] };
    case 'toggle':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task,
        ),
      };
    case 'edit': {
      const text = action.text.trim();
      if (!text) return state;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, text } : task,
        ),
      };
    }
    case 'remove':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) };
    case 'filter':
      if (!['all', 'active', 'completed'].includes(action.filter)) {
        throw new Error(`Unknown task filter: ${action.filter}`);
      }
      return { ...state, filter: action.filter };
    default:
      throw new Error(`Unknown task action: ${action.type}`);
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const nextId = useRef(0);

  function addTask(text) {
    nextId.current += 1;
    dispatch({
      type: 'add',
      task: {
        id: `task-${Date.now()}-${nextId.current}`,
        text,
        completed: false,
      },
    });
  }

  function toggleTask(id) {
    dispatch({ type: 'toggle', id });
  }

  function editTask(id, text) {
    dispatch({ type: 'edit', id, text });
  }

  function removeTask(id) {
    dispatch({ type: 'remove', id });
  }

  function setFilter(filter) {
    dispatch({ type: 'filter', filter });
  }

  return (
    <TaskContext.Provider
      value={{ tasks: state.tasks, filter: state.filter, addTask, toggleTask, editTask, removeTask, setFilter }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used inside a TaskProvider.');
  }
  return context;
}
