import React from 'react'
import BookCard from './BookCard.jsx'
import featuredBooks from '../data/featuredBooks.js'

function BookList({ books, query, status, error, onRetry }) {
  if (status === 'loading') {
    return (
      <div className="state-panel" role="status">
        <span className="loading-spinner" aria-hidden="true" />
        <p>Looking for something wonderful...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="state-panel error-panel" role="alert">
        <span className="state-icon" aria-hidden="true">!</span>
        <h2>We hit a small snag</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={onRetry} type="button">
          Try again
        </button>
      </div>
    )
  }

  if (status === 'empty') {
    return (
      <div className="state-panel">
        <span className="state-icon" aria-hidden="true">⌕</span>
        <h2>No books found just yet</h2>
        <p>Try a different title, author, or search term.</p>
      </div>
    )
  }

  const isFeaturedShelf = status === 'idle'
  const displayedBooks = isFeaturedShelf ? featuredBooks : books

  return (
    <div className="book-results">
      <div className="results-heading">
        <div>
          <p className="eyebrow results-eyebrow">
            {isFeaturedShelf ? 'A GOOD PLACE TO START' : 'THE BOOKSHELF'}
          </p>
          <h2>
            {isFeaturedShelf ? (
              'A few reader favorites'
            ) : (
              <>Books for <span>“{query}”</span></>
            )}
          </h2>
        </div>
        <span className="sort-label">
          {isFeaturedShelf ? 'Handpicked' : 'Newest first'}
          {!isFeaturedShelf && <span aria-hidden="true">↓</span>}
        </span>
      </div>
      <p className="results-count">
        {isFeaturedShelf
          ? 'A few well-loved books to inspire your next read.'
          : `${books.length} ${books.length === 1 ? 'book' : 'books'} to explore`}
      </p>
      <div className="book-grid">
        {displayedBooks.map((book, index) => (
          <BookCard key={`${book.id}-${index}`} book={book} />
        ))}
      </div>
    </div>
  )
}

export default BookList
