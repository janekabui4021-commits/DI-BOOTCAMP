import { useContext } from 'react';
import ThemeToggle from './components/ThemeToggle';
import CharacterCounter from './components/CharacterCounter';
import { ThemeContext } from './context/ThemeContext';

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`app-shell ${theme}`}>
      <div className="container">
        <header className="page-header">
          <h1>Week 8 Day 3 Exercise XP</h1>
          <p>Explore React context, state, and refs with these interactive exercises.</p>
        </header>

        <div className="exercise-grid">
          <ThemeToggle />
          <CharacterCounter />
        </div>
      </div>
    </main>
  );
}
