import React, { useRef, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBox from './components/SearchBox.jsx'
import BookList from './components/BookList.jsx'

const BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'

function getPublishedYear(publishedDate = '') {
  const year = publishedDate.match(/\d{4}/)?.[0]
  return year ? Number(year) : null
}

function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const requestId = useRef(0)

  async function searchBooks(searchTerm) {
    const trimmedTerm = searchTerm.trim()
    if (!trimmedTerm) {
      setQuery('')
      setBooks([])
      setError('')
      setStatus('idle')
      return
    }

    const currentRequestId = ++requestId.current
    setQuery(trimmedTerm)
    setStatus('loading')
    setError('')

    try {
      const params = new URLSearchParams({
        q: trimmedTerm,
        maxResults: '24',
        printType: 'books',
      })
      const response = await fetch(`${BOOKS_API}?${params}`)

      if (!response.ok) {
        throw new Error('We could not reach Google Books. Please try again.')
      }

      const data = await response.json()
      if (currentRequestId !== requestId.current) return

      const results = (data.items ?? []).map(({ id, volumeInfo = {} }) => ({
        id,
        title: volumeInfo.title || 'Untitled',
        authors: volumeInfo.authors ?? [],
        publishedDate: volumeInfo.publishedDate ?? '',
        year: getPublishedYear(volumeInfo.publishedDate),
        description: volumeInfo.description ?? '',
        image:
          volumeInfo.imageLinks?.thumbnail?.replace(/^http:/, 'https:') ?? '',
        infoLink: volumeInfo.infoLink ?? '',
      }))

      results.sort((first, second) => {
        if (first.year === null) return 1
        if (second.year === null) return -1
        return second.year - first.year
      })

      setBooks(results)
      setStatus(results.length ? 'success' : 'empty')
    } catch (requestError) {
      if (currentRequestId !== requestId.current) return
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Something went wrong. Please try again.',
      )
      setStatus('error')
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <main>
        <section className="search-section" aria-labelledby="search-title">
          <div className="search-copy">
            <p className="eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</p>
            <h1 id="search-title">
              Find a book
              <br />
              worth <span>getting lost in.</span>
            </h1>
            <p className="intro">
              Search millions of books and discover your next favorite read.
            </p>
          </div>
          <SearchBox onSearch={searchBooks} isLoading={status === 'loading'} />
          <div className="search-note">
            <span className="sparkle" aria-hidden="true">✳</span>
            <span>Fresh discoveries, sorted newest to oldest.</span>
          </div>
        </section>

        <section className="results-section" aria-live="polite">
          <BookList
            books={books}
            query={query}
            status={status}
            error={error}
            onRetry={() => searchBooks(query)}
          />
        </section>
      </main>
      <footer className="site-footer">
        <span>Made for curious minds.</span>
        <span>Search by Google Books · Covers via Open Library</span>
      </footer>
    </div>
  )
}

export default App
