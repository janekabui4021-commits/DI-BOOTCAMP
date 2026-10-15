import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectFantasyBooks,
  selectHorrorBooks,
  selectScienceFictionBooks,
} from '../features/books/booksSelectors.js';

const genreSelectors = {
  All: selectBooks,
  Horror: selectHorrorBooks,
  Fantasy: selectFantasyBooks,
  'Science Fiction': selectScienceFictionBooks,
};

const genreStyles = {
  Horror: { label: 'The uncanny', symbol: '◌' },
  Fantasy: { label: 'Other worlds', symbol: '✳' },
  'Science Fiction': { label: 'Far horizons', symbol: '✧' },
};

function BookList({ genre }) {
  const books = useSelector(genreSelectors[genre]);

  return (
    <section aria-label={`${genre} books`} className="book-grid" aria-live="polite">
      {books.map((book, index) => (
        <article className="book-card" key={book.id}>
          <div className={`book-cover cover-${book.color}`}>
            <span className="cover-ornament" aria-hidden="true">
              {genreStyles[book.genre].symbol}
            </span>
            <span className="cover-genre">{book.genre}</span>
            <h3>{book.title}</h3>
            <span className="cover-rule" />
            <span className="cover-author">{book.author}</span>
            <span className="cover-index">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <div className="book-info">
            <span className="book-genre">{book.genre}</span>
            <p className="book-title">{book.title}</p>
            <p className="book-author">{book.author}</p>
            <span className="book-year">{book.year}</span>
          </div>
        </article>
      ))}
      {books.length === 0 && (
        <div className="empty-state">
          <span aria-hidden="true">✳</span>
          <p>No books in this collection yet.</p>
        </div>
      )}
    </section>
  );
}

export default BookList;
