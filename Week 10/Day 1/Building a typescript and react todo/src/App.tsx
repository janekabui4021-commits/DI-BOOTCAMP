import TodoApp from './components/TodoApp';

function App() {
  return (
    <main className="page-shell">
      <div className="content">
        <header className="page-header">
          <p className="eyebrow">WEEK 10 <span>/</span> DAY 1 <span>/</span> TYPESCRIPT + REACT</p>
          <h1>Make room for <span>doing.</span></h1>
          <p className="intro">
            A typed todo list powered by a reusable generic component.
          </p>
        </header>

        <TodoApp />

        <aside className="learning-note">
          <span className="note-icon" aria-hidden="true">&lt;/&gt;</span>
          <p>
            <strong>Under the hood:</strong> <code>List&lt;T&gt;</code> accepts any item type
            and lets the parent decide how each item is rendered.
          </p>
        </aside>

        <footer className="page-footer">Small steps add up.</footer>
      </div>
    </main>
  );
}

export default App;
