import Greeting from './components/Greeting';
import Counter from './components/Counter';
import UserCard from './components/UserCard';
import UserList from './components/UserList';
import BookApp from './components/BookApp';

function App() {
  return (
    <main className="page-shell">
      <div className="content">
        <header className="page-header">
          <p className="eyebrow">WEEK 10 <span>/</span> DAY 1 <span>/</span> EXERCISE XP</p>
          <h1>React, with <span>types.</span></h1>
          <p className="intro">
            Practice typed props, state, generics, optional values, and API data.
          </p>
        </header>

        <section className="lesson-grid" aria-label="React and TypeScript exercises">
          <article className="lesson-card">
            <div className="lesson-heading">
              <span className="lesson-number">01</span>
              <div>
                <p className="lesson-label">Typed props</p>
                <h2>A component with a contract</h2>
              </div>
            </div>
            <p className="lesson-description">
              An interface describes the values this component requires.
            </p>
            <Greeting name="Alex" messageCount={3} />
          </article>

          <article className="lesson-card">
            <div className="lesson-heading">
              <span className="lesson-number">02</span>
              <div>
                <p className="lesson-label">Typed state</p>
                <h2>Keep count, track action</h2>
              </div>
            </div>
            <p className="lesson-description">
              The counter and its last action are both managed with typed state.
            </p>
            <Counter />
          </article>

          <article className="lesson-card">
            <div className="lesson-heading">
              <span className="lesson-number">03</span>
              <div>
                <p className="lesson-label">Optional props</p>
                <h2>Useful defaults</h2>
              </div>
            </div>
            <p className="lesson-description">
              Omit any value to see the component use its default.
            </p>
            <div className="user-card-list">
              <UserCard name="Sam Rivera" age={28} role="Frontend learner" />
              <UserCard name="Jordan Lee" />
              <UserCard />
            </div>
          </article>

          <article className="lesson-card lesson-card-wide">
            <div className="lesson-heading">
              <span className="lesson-number">04</span>
              <div>
                <p className="lesson-label">Effects and API data</p>
                <h2>Fetch users on mount</h2>
              </div>
            </div>
            <p className="lesson-description">
              Load JSONPlaceholder users and handle loading, errors, and typed results.
            </p>
            <UserList />
          </article>

          <article className="lesson-card lesson-card-wide">
            <div className="lesson-heading">
              <span className="lesson-number">05</span>
              <div>
                <p className="lesson-label">Daily challenge · Generic components</p>
                <h2>A book list that grows</h2>
              </div>
            </div>
            <p className="lesson-description">
              Render typed books with a reusable generic list, then add your own.
            </p>
            <BookApp />
          </article>
        </section>

        <footer className="page-footer">Built with React, TypeScript, and Vite.</footer>
      </div>
    </main>
  );
}

export default App;
