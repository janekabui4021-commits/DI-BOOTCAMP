import React from 'react';
import TodoList from './components/TodoList.jsx';
import MovieList from './components/MovieList.jsx';
import ProductList from './components/ProductList.jsx';

export default function App() {
  return (
    <main className="page-shell">
      <div className="app-shell">
        <header className="page-header">
          <p className="eyebrow">WEEK 9 · DAY 6</p>
          <h1>Redux solution exercises</h1>
          <p className="subtitle">Todo manager, movie library, and product inventory.</p>
        </header>

        <section className="exercise-block">
          <TodoList />
        </section>

        <section className="exercise-block">
          <MovieList />
        </section>

        <section className="exercise-block">
          <ProductList />
        </section>
      </div>
    </main>
  );
}
