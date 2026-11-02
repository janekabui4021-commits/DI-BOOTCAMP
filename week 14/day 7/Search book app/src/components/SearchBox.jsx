import React, { useState } from 'react'

function SearchBox({ onSearch, isLoading }) {
  const [value, setValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(value)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <label className="visually-hidden" htmlFor="book-search">
        Search by book title, author, or keyword
      </label>
      <span className="search-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.2 4.2" />
        </svg>
      </span>
      <input
        id="book-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Try “The Great Gatsby” or an author..."
        autoComplete="off"
      />
      <button type="submit" disabled={isLoading || !value.trim()}>
        {isLoading ? (
          <>
            <span className="button-spinner" aria-hidden="true" />
            Searching
          </>
        ) : (
          <>
            Find books <span aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  )
}

export default SearchBox
