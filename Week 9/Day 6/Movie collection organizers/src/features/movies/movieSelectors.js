import { createSelector } from '@reduxjs/toolkit';

const selectMoviesState = (state) => state.movies;

export const selectAllMovies = createSelector(
  [selectMoviesState],
  (moviesState) => moviesState.movies,
);

export const selectMoviesByGenre = createSelector([selectAllMovies], (movies) => {
  const genres = [...new Set(movies.map((movie) => movie.genre))];
  return genres;
});

export const selectMoviesByDirector = createSelector([selectAllMovies], (movies) => {
  const directors = [...new Set(movies.map((movie) => movie.director))];
  return directors;
});
