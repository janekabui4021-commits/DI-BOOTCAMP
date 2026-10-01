import React from 'react';
import BootstrapCard from './BootstrapCard.jsx';

const celebrities = [
  {
    title: 'Bob Dylan',
    imageUrl: 'https://miro.medium.com/max/4800/1*_EDEWvWLREzlAvaQRfC_SQ.jpeg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Bob_Dylan',
    description:
      'Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.',
  },
  {
    title: 'McCartney',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Paul_McCartney_in_October_2018.jpg/960px-Paul_McCartney_in_October_2018.jpg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Paul_McCartney',
    description:
      'Sir James Paul McCartney CH MBE (born 18 June 1942) is an English singer, songwriter, musician, composer, and record and film producer who gained worldwide fame as co-lead vocalist and bassist for the Beatles.',
  },
];

const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];

function App() {
  return (
    <main className="container py-5">
      <header className="mb-5">
        <p className="text-uppercase small fw-semibold text-success mb-2">React fundamentals</p>
        <h1 className="display-5 fw-bold">Exercise XP Gold</h1>
      </header>

      <section aria-labelledby="celebrities-heading" className="mb-5">
        <h2 id="celebrities-heading" className="h3 mb-4">Bootstrap cards</h2>
        <div className="row justify-content-center g-4">
          {celebrities.map((celebrity) => (
            <div className="col-12 col-xl-6 d-flex justify-content-center" key={celebrity.title}>
              <BootstrapCard {...celebrity} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="planets-heading">
        <h2 id="planets-heading" className="h3 mb-3">Planets</h2>
        <ul className="list-group planet-list">
          {planets.map((planet) => (
            <li className="list-group-item" key={planet}>{planet}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;