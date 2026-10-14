import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', genre: 'Sci-Fi' },
    { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', genre: 'Crime' },
    { id: 3, title: 'Spirited Away', director: 'Hayao Miyazaki', genre: 'Animation' },
    { id: 4, title: 'La La Land', director: 'Damien Chazelle', genre: 'Drama' },
  ],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movies.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeMovie: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addMovie, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
