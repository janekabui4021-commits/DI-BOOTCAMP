import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, toggleTodo } from '../features/todos/todosSlice.js';
import {
  selectActiveTodos,
  selectAllTodos,
  selectCompletedTodos,
} from '../features/todos/todoSelectors.js';

const filters = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

function TodoList() {
  const dispatch = useDispatch();
  const allTodos = useSelector(selectAllTodos);
  const activeTodos = useSelector(selectActiveTodos);
  const completedTodos = useSelector(selectCompletedTodos);

  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return activeTodos;
      case 'completed':
        return completedTodos;
      default:
        return allTodos;
    }
  }, [activeTodos, allTodos, completedTodos, filter]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTask = task.trim();
    if (!trimmedTask) return;
    dispatch(addTodo(trimmedTask));
    setTask('');
  };

  return (
    <div className="todo-app">
      <div className="todo-card">
        <h1>Todo List Manager</h1>

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Add a task"
            aria-label="Add a task"
          />
          <button type="submit">Add</button>
        </form>

        <div className="filter-row" aria-label="Todo filters">
          {Object.entries(filters).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={filter === key ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="todo-list">
          {visibleTodos.length === 0 ? (
            <li className="empty-state">No tasks in this view.</li>
          ) : (
            visibleTodos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'todo-item completed' : 'todo-item'}>
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
                  />
                  <span>{todo.title}</span>
                </label>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => dispatch(removeTodo(todo.id))}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="stats">
          <span>Total: {allTodos.length}</span>
          <span>Active: {activeTodos.length}</span>
          <span>Completed: {completedTodos.length}</span>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
