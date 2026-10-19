import AgeControls from './components/AgeControls.jsx';
import AgeDisplay from './components/AgeDisplay.jsx';

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <a className="wordmark" href="#main">DAYMARK<span>.</span></a>
        <span className="course-label">WEEK 09 <i /> DAY 04</span>
      </header>

      <section className="tracker-layout" id="main" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow">A LITTLE TIME, WELL COUNTED</p>
          <h1 id="page-title">Age<br />tracker<span>.</span></h1>
          <p className="intro-copy">Keep your number current. Each change is processed asynchronously through Redux.</p>
        </div>

        <div className="tracker">
          <AgeDisplay />
          <div className="control-area">
            <div className="control-heading">
              <span className="eyebrow">ADJUST AGE</span>
              <span className="step-note">1 year per update</span>
            </div>
            <AgeControls />
          </div>
          <footer className="tracker-footer">
            <span>Redux Toolkit</span>
            <span className="footer-mark" aria-hidden="true">RTK</span>
            <span>Async updates</span>
          </footer>
        </div>
      </section>

      <footer className="page-footer">
        <span>AGE TRACKER</span>
        <span>STATE CHANGES, MADE VISIBLE</span>
      </footer>
    </main>
  );
}

export default App;
