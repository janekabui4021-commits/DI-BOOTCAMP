import { useState } from 'react';

const quotes = [
  {
    text: 'Small steps, taken with care, can carry you a very long way.',
    author: 'The Daily Practice',
  },
  {
    text: 'Curiosity is a door you can choose to open every day.',
    author: 'A Note to the Curious',
  },
  {
    text: 'Make room for the work that helps you become who you are.',
    author: 'The Quiet Reminder',
  },
  {
    text: 'A fresh beginning can be as simple as trying once more.',
    author: 'The Second Attempt',
  },
  {
    text: 'Progress grows where patience and practice meet.',
    author: 'The Workshop Wall',
  },
  {
    text: 'You do not need the whole map to take the next kind step.',
    author: 'A Gentle Direction',
  },
  {
    text: 'Let your questions be bigger than your fear of getting it wrong.',
    author: 'The Open Notebook',
  },
  {
    text: 'There is value in showing up before you feel completely ready.',
    author: 'The First Draft',
  },
  {
    text: 'A little wonder can turn an ordinary afternoon around.',
    author: 'The Window Seat',
  },
  {
    text: 'Build something useful, then make it a little more human.',
    author: 'The Thoughtful Maker',
  },
  {
    text: 'Rest is part of the rhythm, not a reward for finishing.',
    author: 'The Slow Sunday',
  },
  {
    text: 'Listen closely; good ideas often arrive without making a fuss.',
    author: 'The Listening Room',
  },
  {
    text: 'The things you practice become the things you can share.',
    author: 'The Shared Table',
  },
  {
    text: 'Make today a place where tomorrow can begin.',
    author: 'The Garden Gate',
  },
  {
    text: 'A thoughtful pause is also a way forward.',
    author: 'The Space Between',
  },
  {
    text: 'Keep the parts that matter, and let the rest become lighter.',
    author: 'The Edit',
  },
  {
    text: 'Every new skill begins with the courage to be a beginner.',
    author: 'The Practice Room',
  },
  {
    text: 'Kindness makes even difficult work easier to carry.',
    author: 'The Helpful Neighbor',
  },
  {
    text: 'Notice how far you have come before choosing where to go next.',
    author: 'The Lookout',
  },
  {
    text: 'There is no wasted effort in learning how to begin again.',
    author: 'The Next Page',
  },
];

const palettes = [
  { background: '#f3eee7', quote: '#315b4c', button: '#315b4c' },
  { background: '#e7eff4', quote: '#315b74', button: '#315b74' },
  { background: '#f4e8e5', quote: '#9a5146', button: '#9a5146' },
  { background: '#eee9f4', quote: '#665084', button: '#665084' },
  { background: '#f4efdc', quote: '#80682d', button: '#80682d' },
  { background: '#e5efeb', quote: '#2f7162', button: '#2f7162' },
  { background: '#f1e8ef', quote: '#854f72', button: '#854f72' },
];

function shuffle(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function createInitialQuoteState() {
  const firstIndex = Math.floor(Math.random() * quotes.length);

  return {
    quoteIndex: firstIndex,
    remaining: shuffle(
      quotes.map((_, index) => index).filter((index) => index !== firstIndex),
    ),
  };
}

function App() {
  const [quoteState, setQuoteState] = useState(createInitialQuoteState);
  const [paletteIndex, setPaletteIndex] = useState(
    () => Math.floor(Math.random() * palettes.length),
  );

  function showAnotherQuote() {
    const nextRound =
      quoteState.remaining.length > 0
        ? quoteState.remaining
        : shuffle(
            quotes
              .map((_, index) => index)
              .filter((index) => index !== quoteState.quoteIndex),
          );
    const [nextIndex, ...remaining] = nextRound;
    setQuoteState({ quoteIndex: nextIndex, remaining });

    const paletteChoices = palettes
      .map((_, index) => index)
      .filter((index) => index !== paletteIndex);
    setPaletteIndex(
      paletteChoices[Math.floor(Math.random() * paletteChoices.length)],
    );
  }

  const quote = quotes[quoteState.quoteIndex];
  const palette = palettes[paletteIndex];

  return (
    <main
      className="page"
      style={{
        '--page-color': palette.background,
        '--quote-color': palette.quote,
        '--button-color': palette.button,
      }}
    >
      <header className="masthead">
        <p className="brand">A MOMENT OF INSPIRATION</p>
        <span className="edition">WEEK 08 <span aria-hidden="true">/</span> DAY 04</span>
      </header>

      <section className="quote-card" aria-labelledby="page-title">
        <div className="card-topline">
          <span className="card-label">THE RANDOM QUOTE GENERATOR</span>
          <span className="sparkle" aria-hidden="true">✳</span>
        </div>

        <h1 id="page-title">A thought for today.</h1>

        <figure className="quote">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote key={quote.text}>{quote.text}</blockquote>
          <figcaption>
            <span className="author-rule" aria-hidden="true" />
            {quote.author}
          </figcaption>
        </figure>

        <div className="card-footer">
          <p className="hint">Take what you need. Leave a little for later.</p>
          <button className="new-quote-button" onClick={showAnotherQuote}>
            <span>Find another</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <footer className="page-footer">
        <span>MADE FOR A MOMENT OF PAUSE</span>
        <span>ONE QUOTE AT A TIME</span>
      </footer>
    </main>
  );
}

export default App;
