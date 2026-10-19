import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', director: 'Christopher Nolan', rating: 8.8 },
    { id: 2, title: 'The Godfather', genre: 'Crime', director: 'Francis Ford Coppola', rating: 9.2 },
    { id: 3, title: 'Spirited Away', genre: 'Animation', director: 'Hayao Miyazaki', rating: 8.6 },
  ],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.items.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeMovie: (state, action) => {
      state.items = state.items.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addMovie, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
