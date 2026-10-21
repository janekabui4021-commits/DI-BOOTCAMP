import Forms from './src/Components/Forms.jsx';

function App() {
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Week 7 / Day 5 / Gold</p>
        <h1>React Forms</h1>
        <p className="intro">Controlled inputs, validation, and form state.</p>
      </header>

      <section className="lesson" aria-labelledby="forms-heading">
        <div className="lesson-heading">
          <span className="lesson-number">01</span>
          <h2 id="forms-heading">Forms</h2>
        </div>
        <Forms />
      </section>
    </main>
  );
}

export default App;