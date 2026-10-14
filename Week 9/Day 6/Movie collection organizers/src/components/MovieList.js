import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, removeMovie } from '../features/movies/moviesSlice.js';
import {
  selectAllMovies,
  selectMoviesByDirector,
  selectMoviesByGenre,
} from '../features/movies/movieSelectors.js';

function MovieList() {
  const dispatch = useDispatch();
  const allMovies = useSelector(selectAllMovies);
  const genres = useSelector(selectMoviesByGenre);
  const directors = useSelector(selectMoviesByDirector);

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('Sci-Fi');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedDirector, setSelectedDirector] = useState('All');

  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
      const matchesDirector = selectedDirector === 'All' || movie.director === selectedDirector;
      return matchesGenre && matchesDirector;
    });
  }, [allMovies, selectedDirector, selectedGenre]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDirector = director.trim();

    if (!trimmedTitle || !trimmedDirector) return;

    dispatch(
      addMovie({
        title: trimmedTitle,
        director: trimmedDirector,
        genre,
      }),
    );

    setTitle('');
    setDirector('');
    setGenre('Sci-Fi');
  };

  return (
    <div className="movies-page">
      <div className="movie-card">
        <header className="movie-header">
          <div>
            <p className="eyebrow">Movie collection</p>
            <h1>Organize your movies</h1>
          </div>
          <span className="count">{allMovies.length} movies</span>
        </header>

        <form onSubmit={handleSubmit} className="movie-form">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Movie title"
            aria-label="Movie title"
          />
          <input
            type="text"
            value={director}
            onChange={(event) => setDirector(event.target.value)}
            placeholder="Director"
            aria-label="Director"
          />
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Crime">Crime</option>
            <option value="Animation">Animation</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
          </select>
          <button type="submit">Add movie</button>
        </form>

        <div className="filters-row">
          <label>
            Genre
            <select value={selectedGenre} onChange={(event) => setSelectedGenre(event.target.value)}>
              <option value="All">All</option>
              {genres.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Director
            <select value={selectedDirector} onChange={(event) => setSelectedDirector(event.target.value)}>
              <option value="All">All</option>
              {directors.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ul className="movie-list">
          {filteredMovies.length === 0 ? (
            <li className="empty-state">No movies match the current filters.</li>
          ) : (
            filteredMovies.map((movie) => (
              <li key={movie.id} className="movie-item">
                <div>
                  <h2>{movie.title}</h2>
                  <p>{movie.genre}</p>
                </div>
                <div className="movie-meta">
                  <span>{movie.director}</span>
                  <button type="button" onClick={() => dispatch(removeMovie(movie.id))}>
                    Remove
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default MovieList;
