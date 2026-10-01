import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const destinations = [
  {
    name: 'Hong Kong',
    image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg',
    note: 'A city that never stays still',
  },
  {
    name: 'Macao',
    image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp',
    note: 'Where old streets meet bright nights',
  },
  {
    name: 'Japan',
    image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp',
    note: 'A thousand small discoveries',
  },
  {
    name: 'Las Vegas',
    image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp',
    note: 'A bright idea in the desert',
  },
];

function App() {
  return (
    <main className="destination-page">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Somewhere Else home">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>somewhere else</span>
        </a>
        <span className="topbar-note">A little further from ordinary</span>
      </header>

      <section className="gallery-section container" id="home" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">Four places to begin</p>
            <h1 id="gallery-title">Pick a direction.</h1>
          </div>
          <p className="gallery-aside">Swipe, explore, and see where the next trip takes you.</p>
        </div>

        <div className="carousel-frame">
          <Carousel
            ariaLabel="Destination photos"
            showArrows
            showIndicators
            showStatus
            showThumbs
            infiniteLoop
            emulateTouch
            swipeable
            useKeyboardArrows
            stopOnHover
            interval={6000}
            transitionTime={450}
            renderThumbs={() => destinations.map((destination) => (
              <img src={destination.image} alt={destination.name} key={destination.name} />
            ))}
          >
            {destinations.map((destination, index) => (
              <div className="destination-slide" key={destination.name}>
                <img src={destination.image} alt={destination.name} />
                <div className="slide-overlay">
                  <span className="slide-index">0{index + 1} / 04</span>
                  <div>
                    <h2>{destination.name}</h2>
                    <p>{destination.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <footer className="gallery-footer">
          <span>East Asia to the American West</span>
          <span>01 — 04 destinations</span>
        </footer>
      </section>
    </main>
  );
}

export default App;