import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FetchTodosStatus from './components/FetchTodosStatus.jsx';
import TodoList from './components/TodoList.jsx';
import { fetchTodos } from './features/todos/todosThunk.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

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
          <p className="eyebrow">MAKE A LITTLE ROOM FOR WHAT MATTERS</p>
          <h1>Today, <em>at your pace.</em></h1>
          <p className="intro-copy">Your list, your rhythm. Start with one small thing.</p>
        </section>
        <FetchTodosStatus />
        <TodoList />
        <footer className="page-footer">
          <span>Small steps still move you forward.</span>
          <span>POWERED BY REDUX THUNK</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
