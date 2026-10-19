import React from 'react';
import { connect } from 'react-redux';
import { removeTodo, toggleTodo } from '../redux/actions.js';

function TodoList({ category, toggleTodo, removeTodo }) {
  const completedCount = category.todos.filter((todo) => todo.completed).length;

  return (
    <section className="todo-section" aria-label={`${category.name} todos`}>
      <div className="todo-heading">
        <div className="list-title">
          <span className={`list-icon icon-${category.id}`} aria-hidden="true">
            {category.icon}
          </span>
          <h2>{category.name}</h2>
        </div>
        <span className="completion-count">
          {completedCount} of {category.todos.length} complete
        </span>
      </div>

      {category.todos.length === 0 ? (
        <div className="empty-state">
          <span className="empty-check" aria-hidden="true">✓</span>
          <h3>A little room to begin</h3>
          <p>Add a task above to get started with {category.name.toLowerCase()}.</p>
        </div>
      ) : (
        <ul className="todo-list">
          {category.todos.map((todo) => (
            <li className={`todo-row${todo.completed ? ' is-complete' : ''}`} key={todo.id}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(category.id, todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
              </label>
              <button
                className="remove-button"
                type="button"
                onClick={() => removeTodo(category.id, todo.id)}
                aria-label={`Remove ${todo.text} from ${category.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  category: state.categories.find((category) => category.id === state.selectedCategoryId),
});

export default connect(mapStateToProps, { toggleTodo, removeTodo })(TodoList);
