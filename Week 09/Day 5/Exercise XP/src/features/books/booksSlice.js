import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 'book-1', title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'Horror', year: 1959, color: 'plum' },
    { id: 'book-2', title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror', year: 1818, color: 'moss' },
    { id: 'book-3', title: 'The Shining', author: 'Stephen King', genre: 'Horror', year: 1977, color: 'rose' },
    { id: 'book-4', title: 'The Hobbit', author: 'J. R. R. Tolkien', genre: 'Fantasy', year: 1937, color: 'ochre' },
    { id: 'book-5', title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', genre: 'Fantasy', year: 1968, color: 'blue' },
    { id: 'book-6', title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy', year: 2007, color: 'green' },
    { id: 'book-7', title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', year: 1965, color: 'sand' },
    { id: 'book-8', title: 'Kindred', author: 'Octavia E. Butler', genre: 'Science Fiction', year: 1979, color: 'terracotta' },
    { id: 'book-9', title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', genre: 'Science Fiction', year: 1969, color: 'slate' },
  ],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
});

export default booksSlice.reducer;
