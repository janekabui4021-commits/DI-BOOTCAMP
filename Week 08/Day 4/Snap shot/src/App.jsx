import { useEffect, useMemo, useState } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { categories, getPreviewPhotos } from './galleryData.js';

const pexelsApiKey = import.meta.env.VITE_PEXELS_API_KEY;

function GalleryPage({ category }) {
  const { query: searchParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearch = location.pathname.startsWith('/search');
  const query = isSearch ? (searchParam ?? '').trim() : category.label;
  const [searchInput, setSearchInput] = useState(isSearch ? query : '');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(null);
  const previewPhotos = useMemo(() => getPreviewPhotos(query), [query]);

  useEffect(() => {
    setSearchInput(isSearch ? query : '');
    setPage(1);
  }, [isSearch, query]);

  useEffect(() => {
    if (!pexelsApiKey) {
      setPhotos([]);
      setTotalResults(null);
      setError('');
      return undefined;
    }

    const controller = new AbortController();

    async function fetchPhotos() {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          query,
          per_page: '30',
          page: String(page),
        });
        const response = await fetch(
          `https://api.pexels.com/v1/search?${params.toString()}`,
          {
            headers: { Authorization: pexelsApiKey },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            response.status === 401 || response.status === 403
              ? 'Pexels did not accept the API key. Check VITE_PEXELS_API_KEY in .env.local.'
              : `Pexels could not load these photos (HTTP ${response.status}).`,
          );
        }

        const data = await response.json();
        setPhotos(
          data.photos.map((item) => ({
            id: item.id,
            src: item.src.large,
            alt: item.alt || `${query} photo by ${item.photographer}`,
            photographer: item.photographer,
            photographerUrl: item.photographer_url,
          })),
        );
        setTotalResults(data.total_results);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load photos right now.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => controller.abort();
  }, [page, query]);

  const displayedPhotos = pexelsApiKey ? photos : previewPhotos;
  const pageCount = pexelsApiKey
    ? Math.max(1, Math.ceil((totalResults ?? 0) / 30))
    : 1;

  function submitSearch(event) {
    event.preventDefault();
    const nextQuery = searchInput.trim();
    if (nextQuery) {
      navigate(`/search/${encodeURIComponent(nextQuery)}`);
    }
  }

  return (
    <main className="main-content">
      <section className="welcome">
        <div>
          <p className="eyebrow">{isSearch ? 'A LITTLE OF WHAT YOU FANCY' : 'CURATED FOR YOU'}</p>
          <h1>{isSearch ? `Searching for “${query}”` : category.label}</h1>
          <p className="welcome-description">
            {isSearch
              ? 'A collection of moments, colours, and little details.'
              : category.description}
          </p>
        </div>
        <span className="image-count">
          {pexelsApiKey ? '30 IMAGES PER PAGE' : `${displayedPhotos.length} PREVIEW IMAGES`}
        </span>
      </section>

      <form className="search-form" onSubmit={submitSearch} role="search">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <label className="visually-hidden" htmlFor="gallery-search">Search photos</label>
        <input
          id="gallery-search"
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="What would you like to see?"
          type="search"
          value={searchInput}
        />
        <button type="submit">Search <span aria-hidden="true">↗</span></button>
      </form>

      {!pexelsApiKey && (
        <p className="preview-notice">
          Preview gallery · add a Pexels API key to search any topic and browse 30 live photos per page.
        </p>
      )}

      {error && <p className="error-message" role="alert">{error}</p>}

      {loading ? (
        <div className="gallery-status" role="status">Finding a few good things to look at…</div>
      ) : displayedPhotos.length > 0 ? (
        <section className="photo-grid" aria-label={`${query} photos`}>
          {displayedPhotos.map((photo) => (
            <article className="photo-card" key={photo.id}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="photo-overlay">
                <p>{photo.alt}</p>
                {photo.photographerUrl ? (
                  <a href={photo.photographerUrl} target="_blank" rel="noreferrer">
                    Photo by {photo.photographer}
                  </a>
                ) : (
                  <span>Photo by {photo.photographer}</span>
                )}
              </div>
            </article>
          ))}
        </section>
      ) : (
        !error && (
          <div className="gallery-status">
            No preview photos found for “{query}”. Configure a Pexels API key to search any topic.
          </div>
        )
      )}

      {pexelsApiKey && pageCount > 1 && (
        <nav className="pagination" aria-label="Photo pages">
          <button
            disabled={page <= 1 || loading}
            onClick={() => setPage((current) => current - 1)}
            type="button"
          >
            ← Previous
          </button>
          <span>Page {page} of {pageCount}</span>
          <button
            disabled={page >= pageCount || loading}
            onClick={() => setPage((current) => current + 1)}
            type="button"
          >
            More photos →
          </button>
        </nav>
      )}
    </main>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/mountain" aria-label="Snap Shot home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>snap<span className="brand-light">shot</span></span>
        </Link>
        <nav className="category-nav" aria-label="Photo categories">
          {categories.map((category) => (
            <NavLink
              className={({ isActive }) => `category-link${isActive ? ' active' : ''}`}
              key={category.slug}
              to={`/${category.slug}`}
            >
              {category.label}
            </NavLink>
          ))}
        </nav>
        <span className="header-note">A GOOD PLACE TO LOOK</span>
      </header>

      <Routes>
        {categories.map((category) => (
          <Route
            element={<GalleryPage category={category} />}
            key={category.slug}
            path={`/${category.slug}`}
          />
        ))}
        <Route
          element={<GalleryPage category={categories[0]} />}
          path="/search/:query"
        />
        <Route path="/" element={<Navigate replace to="/mountain" />} />
        <Route path="*" element={<Navigate replace to="/mountain" />} />
      </Routes>

      <footer className="site-footer">
        <span>SNAP SHOT · FIND YOUR NEXT FAVOURITE</span>
        <span>MADE FOR THE LOVE OF LOOKING</span>
      </footer>
    </div>
  );
}

export default App;
