import { createContext, useContext, useReducer, useRef } from 'react';

export const TaskContext = createContext(null);

export function taskReducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, action.task];
    case 'toggle':
      return tasks.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task,
      );
    case 'remove':
      return tasks.filter((task) => task.id !== action.id);
    default:
      throw new Error(`Unknown task action: ${action.type}`);
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);
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

  function removeTask(id) {
    dispatch({ type: 'remove', id });
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
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
