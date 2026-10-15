import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './userThunk.js';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.meta.condition) return;
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'An unexpected error occurred.';
      });
  },
});

export default userSlice.reducer;
