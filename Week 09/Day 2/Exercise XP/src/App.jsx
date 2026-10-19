import AddTodo from './components/AddTodo.jsx';
import TodoList from './components/TodoList.jsx';

export default function App() {
  return (
    <main className="page">
      <section className="todo-card" aria-labelledby="page-title">
        <header className="page-header">
          <p className="eyebrow">WEEK 9 · DAY 2 · EXERCISE XP</p>
          <h1 id="page-title">My todo list</h1>
          <p className="intro">A little progress each day adds up to big results.</p>
        </header>
        <AddTodo />
        <TodoList />
        <footer className="card-footer">Your tasks are managed with React and Redux.</footer>
      </section>
    </main>
  );
}
