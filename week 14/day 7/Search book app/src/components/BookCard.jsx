import React, { useState } from 'react'

const coverColors = ['cover-terracotta', 'cover-olive', 'cover-blue', 'cover-plum']

function BookCard({ book }) {
  const [imageFailed, setImageFailed] = useState(false)
  const authorText = book.authors.length
    ? book.authors.join(', ')
    : 'Unknown author'
  const hasImage = Boolean(book.image) && !imageFailed

  return (
    <article className="book-card">
      <a
        className={`book-cover ${hasImage ? '' : coverColors[book.title.length % coverColors.length]}`}
        href={book.infoLink || undefined}
        target={book.infoLink ? '_blank' : undefined}
        rel={book.infoLink ? 'noreferrer' : undefined}
        aria-label={`View ${book.title} on Google Books`}
        onClick={(event) => {
          if (!book.infoLink) event.preventDefault()
        }}
      >
        {hasImage ? (
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="cover-placeholder">
            <span className="cover-emblem" aria-hidden="true">✳</span>
            <span>{book.title}</span>
            <small>{authorText}</small>
          </span>
        )}
        <span className="cover-overlay" aria-hidden="true">View book ↗</span>
      </a>
      <div className="book-details">
        <p className="book-year">{book.year ?? 'Year unknown'}</p>
        <h3>
          {book.infoLink ? (
            <a href={book.infoLink} target="_blank" rel="noreferrer">{book.title}</a>
          ) : book.title}
        </h3>
        <p className="book-author">{authorText}</p>
      </div>
    </article>
  )
}

export default BookCard
