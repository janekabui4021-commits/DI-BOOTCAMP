import { connect } from 'react-redux';
import { removeTodo, toggleTodo } from '../redux/actions.js';

function TodoList({ todos, toggleTodo, removeTodo }) {
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <section className="list-section" aria-label="Todo items">
      <div className="list-heading">
        <h2>Tasks</h2>
        <span className="task-count">
          {completedCount} of {todos.length} completed
        </span>
      </div>
      {todos.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">✓</span>
          <p>No tasks yet</p>
          <span>Add a task above to get started.</span>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className={`todo-item${todo.completed ? ' is-complete' : ''}`} key={todo.id}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
              </label>
              <button
                className="remove-button"
                type="button"
                onClick={() => removeTodo(todo.id)}
                aria-label={`Remove ${todo.text}`}
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
  todos: state.todos,
});

export default connect(mapStateToProps, { toggleTodo, removeTodo })(TodoList);
