import { useState, type FormEvent } from 'react';
import List from './List';
import type { Book } from '../types';

const initialBooks: Book[] = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt' },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 3, title: 'You Don’t Know JS Yet', author: 'Kyle Simpson' },
];

function BookApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState<string | null>(null);

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedTitle || !trimmedAuthor) {
      setError('Enter both a title and an author to add a book.');
      return;
    }

    setBooks((currentBooks) => [
      ...currentBooks,
      {
        id: currentBooks.reduce((largestId, book) => Math.max(largestId, book.id), 0) + 1,
        title: trimmedTitle,
        author: trimmedAuthor,
      },
    ]);
    setTitle('');
    setAuthor('');
    setError(null);
  }

  return (
    <div className="book-app">
      <form className="book-form" onSubmit={addBook}>
        <div className="book-form-fields">
          <label className="book-field">
            <span>Book title</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. The Little Prince"
              required
            />
          </label>
          <label className="book-field">
            <span>Author</span>
            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="e.g. Antoine de Saint-Exupéry"
              required
            />
          </label>
        </div>
        <button className="button button-primary book-submit" type="submit">
          Add book
        </button>
      </form>
      {error && (
        <p className="book-error" role="alert">
          {error}
        </p>
      )}
      <p className="book-count" aria-live="polite">
        Your shelf <span>{books.length} books</span>
      </p>
      <List<Book>
        items={books}
        getKey={(book) => book.id}
        renderItem={(book) => (
          <>
            <span className="book-cover" aria-hidden="true">Aa</span>
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          </>
        )}
      />
    </div>
  );
}

export default BookApp;
