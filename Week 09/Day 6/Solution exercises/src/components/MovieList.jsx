import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, removeMovie } from '../features/movies/moviesSlice.js';

export default function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const [genre, setGenre] = useState('All');
  const [form, setForm] = useState({
    title: '',
    genre: 'Sci-Fi',
    director: '',
    rating: 8.0,
  });

  const visibleMovies = useMemo(() => {
    if (genre === 'All') return movies;
    return movies.filter((movie) => movie.genre === genre);
  }, [genre, movies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title || !form.director) return;
    dispatch(addMovie({ ...form, rating: Number(form.rating) }));
    setForm({ title: '', genre: 'Sci-Fi', director: '', rating: 8.0 });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Movie collection</h2>
        <select value={genre} onChange={(event) => setGenre(event.target.value)}>
          <option value="All">All</option>
          {[...new Set(movies.map((movie) => movie.genre))].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="movie-form">
        <input
          type="text"
          placeholder="Movie title"
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
        />
        <input
          type="text"
          placeholder="Director"
          value={form.director}
          onChange={(event) => setForm({ ...form, director: event.target.value })}
        />
        <select value={form.genre} onChange={(event) => setForm({ ...form, genre: event.target.value })}>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Crime">Crime</option>
          <option value="Animation">Animation</option>
          <option value="Drama">Drama</option>
        </select>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={form.rating}
          onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })}
        />
        <button type="submit">Add movie</button>
      </form>

      <ul className="movie-grid">
        {visibleMovies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <div>
              <strong>{movie.title}</strong>
              <p>{movie.genre} · {movie.director}</p>
            </div>
            <div className="movie-meta">
              <span>{movie.rating.toFixed(1)}</span>
              <button type="button" className="ghost-button" onClick={() => dispatch(removeMovie(movie.id))}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
