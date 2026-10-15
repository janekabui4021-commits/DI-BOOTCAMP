import { useState } from 'react';
import { useSelector } from 'react-redux';
import BookList from './components/BookList.jsx';
import { selectBookCountsByGenre, selectBooks } from './features/books/booksSelectors.js';

const genres = ['All', 'Horror', 'Fantasy', 'Science Fiction'];

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const books = useSelector(selectBooks);
  const counts = useSelector(selectBookCountsByGenre);

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#collection" aria-label="Between the Lines home">
          <span className="wordmark-icon" aria-hidden="true">b.</span>
          <span>between the lines</span>
        </a>
        <span className="topbar-caption"><span aria-hidden="true" /> THE READING ROOM</span>
      </header>

      <div className="content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">YOUR PERSONAL LIBRARY</p>
          <h1 id="page-title">A world between <em>covers.</em></h1>
          <p className="intro-copy">
            A little shelf of stories to get lost in. Choose a genre and see where it takes you.
          </p>
        </section>

        <section className="collection" id="collection" aria-label="Book collection">
          <div className="collection-topline">
            <div>
              <h2>The collection</h2>
              <p>{books.length} books, a thousand places to go</p>
            </div>
            <span className="shelf-mark"><span aria-hidden="true">▤</span> THE BOOKSHELF</span>
          </div>

          <div aria-label="Filter books by genre" className="genre-tabs" role="group">
            {genres.map((genre) => (
              <button
                aria-pressed={selectedGenre === genre}
                className={`genre-tab ${selectedGenre === genre ? 'selected' : ''}`}
                key={genre}
                type="button"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
                <span className="genre-count">{counts[genre]}</span>
              </button>
            ))}
          </div>

          <BookList genre={selectedGenre} />
        </section>

        <footer className="footer">
          <span>Take your time. Stay a while.</span>
          <span>MADE FOR THE LOVE OF STORIES</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
