import TodoList from './components/TodoList';

export default function App() {
  return (
    <main className="app">
      <header className="page-header">
        <p className="eyebrow">Week 8 · Day 3 · Exercise XP Gold</p>
        <h1>Todo List</h1>
        <p>Add tasks to your list and remove them when they’re done.</p>
      </header>
      <TodoList />
    </main>
  );
}
