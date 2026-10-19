import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem.jsx';

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <section className="list-section" aria-label="Todo items">
      <div className="list-heading">
        <h2>Your list</h2>
        <span className="task-count">{completedCount} / {todos.length} done</span>
      </div>
      {todos.length === 0 ? (
        <div className="empty-state">
          <span className="empty-mark" aria-hidden="true">01</span>
          <p>Nothing on the list yet.</p>
          <span>Add a task to get started.</span>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
      )}
    </section>
  );
}