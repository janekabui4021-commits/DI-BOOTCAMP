import Clock from './src/Components/Clock.jsx';
import Form from './src/Components/Form.jsx';

function App() {
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Week 7 / Day 5 / Ninja</p>
        <h1>React Lifecycle &amp; Forms</h1>
      </header>

      <section className="clock-panel" aria-labelledby="clock-heading">
        <div>
          <p className="eyebrow">Local time</p>
          <h2 id="clock-heading">Live clock</h2>
        </div>
        <Clock />
      </section>

      <section className="lesson" aria-labelledby="form-heading">
        <div className="lesson-heading">
          <span className="lesson-number">01</span>
          <h2 id="form-heading">Form validation</h2>
        </div>
        <Form />
      </section>
    </main>
  );
}

export default App;