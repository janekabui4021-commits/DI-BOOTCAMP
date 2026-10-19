import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../features/todos/todosThunk.js';

function FetchTodosStatus() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.todos);
  const isLoading = status === 'loading';

  return (
    <section className="fetch-status" aria-live="polite">
      {status === 'failed' ? (
        <div className="error-message" role="alert">
          <span className="error-icon" aria-hidden="true">!</span>
          <div>
            <strong>We couldn’t fetch your tasks.</strong>
            <p>{error}</p>
          </div>
          <button disabled={isLoading} type="button" onClick={() => dispatch(fetchTodos())}>
            Try again
          </button>
        </div>
      ) : (
        <button
          className="refresh-button"
          disabled={isLoading}
          type="button"
          onClick={() => dispatch(fetchTodos())}
        >
          <span aria-hidden="true">{isLoading ? '◌' : '↻'}</span>
          {isLoading ? 'Fetching todos...' : status === 'succeeded' ? 'Refresh from API' : 'Fetch todos'}
        </button>
      )}
    </section>
  );
}

export default FetchTodosStatus;
