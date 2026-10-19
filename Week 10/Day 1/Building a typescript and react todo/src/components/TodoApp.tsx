import { useState, type FormEvent } from 'react';
import List from './List';
import type { Todo } from '../types';

const initialTodos: Todo[] = [
  { id: 1, title: 'Set up a React + TypeScript project', completed: true },
  { id: 2, title: 'Build a reusable generic List component', completed: false },
  { id: 3, title: 'Add a new task to the list', completed: false },
];

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTodo.trim();

    if (!title) {
      return;
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: currentTodos.reduce((largestId, todo) => Math.max(largestId, todo.id), 0) + 1,
        title,
        completed: false,
      },
    ]);
    setNewTodo('');
  }

  function toggleTodo(todoId: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  return (
    <section className="todo-app" aria-labelledby="todo-heading">
      <header className="todo-header">
        <div>
          <p className="todo-eyebrow">YOUR SPACE TO FOCUS</p>
          <h2 id="todo-heading">Today’s tasks</h2>
        </div>
        <div className="task-summary" aria-live="polite">
          <span className="summary-number">{remainingCount}</span>
          <span>{remainingCount === 1 ? 'task left' : 'tasks left'}</span>
        </div>
      </header>

      <form className="add-todo-form" onSubmit={addTodo}>
        <label className="visually-hidden" htmlFor="new-todo">
          New task
        </label>
        <input
          id="new-todo"
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="What needs to get done?"
          maxLength={120}
        />
        <button className="add-button" type="submit" disabled={!newTodo.trim()}>
          <span aria-hidden="true">+</span> Add task
        </button>
      </form>

      <div className="list-heading">
        <h3>My list</h3>
        <span>{completedCount} completed</span>
      </div>

      <List<Todo>
        items={todos}
        getKey={(todo) => todo.id}
        renderItem={(todo) => (
          <label className={`todo-row${todo.completed ? ' is-complete' : ''}`}>
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              aria-label={`${todo.completed ? 'Mark as incomplete' : 'Complete'}: ${todo.title}`}
            />
            <span className="custom-checkbox" aria-hidden="true">
              {todo.completed && '✓'}
            </span>
            <span className="todo-title">{todo.title}</span>
            <span className="todo-item-type">TASK</span>
          </label>
        )}
      />

      <footer className="todo-footer">
        <span>Built with React, TypeScript &amp; generics</span>
        <span>{todos.length} {todos.length === 1 ? 'task' : 'tasks'} total</span>
      </footer>
    </section>
  );
}

export default TodoApp;
