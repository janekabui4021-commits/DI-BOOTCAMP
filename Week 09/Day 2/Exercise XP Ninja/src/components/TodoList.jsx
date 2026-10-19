import React from 'react';
import { connect } from 'react-redux';
import { removeTodo, toggleTodo } from '../redux/todosSlice.js';

function TodoList({ userId, todos, toggle, remove }) {
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <section className="list-section" aria-label="Todo items">
      <div className="list-heading">
        <h2>Tasks</h2>
        <span className="task-count">{completedCount} of {todos.length} completed</span>
      </div>
      {todos.length === 0 ? (
        <div className="empty-state">
          <span className="empty-mark" aria-hidden="true">✓</span>
          <p>Your list is clear.</p>
          <span>Add a task to get started.</span>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className={`todo-item${todo.completed ? ' is-complete' : ''}`} key={todo.id}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggle({ userId, id: todo.id })}
                  aria-label={`Mark ${todo.text} ${todo.completed ? 'not done' : 'done'}`}
                />
                <span className="todo-text">{todo.text}</span>
              </label>
              <button
                className="remove-button"
                type="button"
                onClick={() => remove({ userId, id: todo.id })}
                aria-label={`Remove ${todo.text}`}
                title="Remove task"
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos.byUserId[ownProps.userId] || EMPTY_TODOS,
});

const EMPTY_TODOS = [];

const mapDispatchToProps = {
  toggle: toggleTodo,
  remove: removeTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);