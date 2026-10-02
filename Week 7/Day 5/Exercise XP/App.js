import Car from './src/Components/Car.js';
import Events from './src/Components/Events.js';
import Phone from './src/Components/Phone.js';
import Color from './src/Components/Color.js';

const carinfo = { name: 'Ford', model: 'Mustang' };

function App() {
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Week 7 / Day 5</p>
        <h1>React Exercise XP</h1>
        <p className="intro">JSX, components, state, effects, and events.</p>
      </header>

      <section className="lesson">
        <div className="lesson-heading">
          <span className="lesson-number">01</span>
          <h2>Car and components</h2>
        </div>
        <Car carInfo={carinfo} />
      </section>

      <section className="lesson">
        <div className="lesson-heading">
          <span className="lesson-number">02</span>
          <h2>Events</h2>
        </div>
        <Events />
      </section>

      <section className="lesson">
        <div className="lesson-heading">
          <span className="lesson-number">03</span>
          <h2>Phone and components</h2>
        </div>
        <Phone />
      </section>

      <section className="lesson">
        <div className="lesson-heading">
          <span className="lesson-number">04</span>
          <h2>useEffect hook</h2>
        </div>
        <Color />
      </section>
    </main>
  );
}

export default App;