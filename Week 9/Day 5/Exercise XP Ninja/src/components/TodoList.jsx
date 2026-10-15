import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredTodosCount,
  selectTodoCounts,
  selectTodos,
  selectVisibilityFilter,
} from '../features/todos/todosSelectors.js';
import {
  addTodo,
  removeTodo,
  setVisibilityFilter,
  toggleTodo,
} from '../features/todos/todosSlice.js';

const filters = ['All', 'Active', 'Completed'];

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const visibilityFilter = useSelector(selectVisibilityFilter);
  const filteredTodosCount = useSelector(selectFilteredTodosCount);
  const counts = useSelector(selectTodoCounts);
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = useCallback((event) => {
    event.preventDefault();
    const text = newTodoText.trim();
    if (!text) return;

    dispatch(addTodo(text));
    setNewTodoText('');
  }, [dispatch, newTodoText]);

  const handleToggle = useCallback((todoId) => {
    dispatch(toggleTodo(todoId));
  }, [dispatch]);

  const handleDelete = useCallback((todoId) => {
    dispatch(removeTodo(todoId));
  }, [dispatch]);

  const handleFilterChange = useCallback((filter) => {
    dispatch(setVisibilityFilter(filter));
  }, [dispatch]);

  const remainingCount = counts.Active;

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="#today" aria-label="Little by Little home">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>little by little</span>
        </a>
        <span className="topbar-label"><span aria-hidden="true" /> A SOFTER WAY TO GET THINGS DONE</span>
      </header>

      <div className="content" id="today">
        <section className="intro">
          <p className="eyebrow">A MOMENT FOR YOURSELF</p>
          <h1>One thing <em>at a time.</em></h1>
          <p className="intro-copy">Make a little room for what matters today. The rest can wait.</p>
        </section>

        <section className="todo-card" aria-label="Todo list">
          <div className="card-heading">
            <div>
              <p className="card-kicker">YOUR DAY, GENTLY PLANNED</p>
              <h2>A few things to do <span aria-hidden="true">✎</span></h2>
            </div>
            <span className="today-mark">{new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date())}</span>
          </div>

          <form className="add-form" onSubmit={handleAddTodo}>
            <span className="add-icon" aria-hidden="true">+</span>
            <input
              aria-label="New todo"
              maxLength={120}
              placeholder="Add something to your list..."
              value={newTodoText}
              onChange={(event) => setNewTodoText(event.target.value)}
            />
            <button disabled={!newTodoText.trim()} type="submit">Add task <span aria-hidden="true">↗</span></button>
          </form>

          <div className="list-toolbar">
            <div className="filters" aria-label="Filter todos" role="group">
              {filters.map((filter) => (
                <button
                  aria-pressed={visibilityFilter === filter}
                  className={`filter-button ${visibilityFilter === filter ? 'selected' : ''}`}
                  key={filter}
                  type="button"
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter}
                  <span>{counts[filter]}</span>
                </button>
              ))}
            </div>
            <span className="todo-count" aria-live="polite">
              {filteredTodosCount} {filteredTodosCount === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {todos.length ? (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li className={`todo-row ${todo.completed ? 'is-complete' : ''}`} key={todo.id}>
                  <button
                    aria-label={todo.completed ? `Mark ${todo.text} active` : `Mark ${todo.text} completed`}
                    aria-pressed={todo.completed}
                    className={`todo-check ${todo.completed ? 'checked' : ''}`}
                    type="button"
                    onClick={() => handleToggle(todo.id)}
                  >
                    {todo.completed && <span aria-hidden="true">✓</span>}
                  </button>
                  <span className="todo-text">{todo.text}</span>
                  <button
                    aria-label={`Delete ${todo.text}`}
                    className="delete-button"
                    type="button"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Delete</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <span className="empty-mark" aria-hidden="true">{visibilityFilter === 'Completed' ? '✓' : '✳'}</span>
              <h3>{visibilityFilter === 'Completed' ? 'Nothing checked off yet' : 'A little breathing room.'}</h3>
              <p>
                {visibilityFilter === 'Completed'
                  ? 'Finish a task and it will show up here.'
                  : 'You’re all caught up. Enjoy the space.'}
              </p>
            </div>
          )}

          <footer className="card-footer">
            <span><span className="footer-dot" /> {remainingCount} left to do</span>
            <span>Small steps count, too.</span>
          </footer>
        </section>

        <p className="page-note">A gentle reminder: you’re doing just fine.</p>
      </div>
    </main>
  );
}

export default TodoList;
