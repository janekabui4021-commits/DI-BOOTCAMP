import { useSelector } from 'react-redux';
import AddTodo from './AddTodo.jsx';
import RemoveTodo from './RemoveTodo.jsx';
import ToggleTodo from './ToggleTodo.jsx';

function TodoList() {
  const { items, status } = useSelector((state) => state.todos);
  const activeCount = items.filter((todo) => !todo.completed).length;
  const completedCount = items.length - activeCount;
  const isLoading = status === 'loading';

  return (
    <section className="todo-card" aria-label="Todo list">
      <div className="card-heading">
        <div>
          <p className="card-kicker">A LITTLE BIT AT A TIME</p>
          <h2>Your daily list <span aria-hidden="true">✎</span></h2>
        </div>
        <span className={`sync-status ${isLoading ? 'syncing' : ''}`}>
          <span /> {isLoading ? 'SYNCING' : 'UP TO DATE'}
        </span>
      </div>

      <AddTodo />

      <div className="list-toolbar">
        <span className="list-label">YOUR TASKS <span>{items.length}</span></span>
        {items.length > 0 && (
          <span className="list-summary">{activeCount} to do · {completedCount} done</span>
        )}
      </div>

      {isLoading && items.length === 0 ? (
        <div className="list-state" role="status">
          <span className="spinner" aria-hidden="true" />
          <div>
            <strong>Gathering your tasks...</strong>
            <p>Just a moment while your list arrives.</p>
          </div>
        </div>
      ) : items.length ? (
        <ul className="todo-list">
          {items.map((todo) => (
            <li className={`todo-row ${todo.completed ? 'is-complete' : ''}`} key={todo.id}>
              <ToggleTodo todo={todo} />
              <span className="todo-text">{todo.text}</span>
              <RemoveTodo todoId={todo.id} todoText={todo.text} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-mark" aria-hidden="true">✳</span>
          <h3>Your list is clear.</h3>
          <p>Add a small task above to get started.</p>
        </div>
      )}

      <div className="card-footer">
        <span><span className="footer-dot" /> {activeCount} left to do</span>
        <span>Fetched with a little async magic.</span>
      </div>
    </section>
  );
}

export default TodoList;
