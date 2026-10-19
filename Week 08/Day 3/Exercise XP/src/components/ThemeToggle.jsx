import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <section className="card">
      <h2>Exercise 1: Theme Switcher</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <button
        type="button"
        className="toggle-button"
        onClick={toggleTheme}
        aria-pressed={theme === 'dark'}
      >
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </button>
    </section>
  );
}
