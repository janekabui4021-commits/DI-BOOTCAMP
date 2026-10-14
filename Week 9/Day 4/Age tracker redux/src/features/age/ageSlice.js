import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const updateDelay = 700;

export const ageUpAsync = createAsyncThunk('age/ageUpAsync', async () => {
  await new Promise((resolve) => setTimeout(resolve, updateDelay));
  return 1;
});

export const ageDownAsync = createAsyncThunk('age/ageDownAsync', async () => {
  await new Promise((resolve) => setTimeout(resolve, updateDelay));
  return 1;
});

const initialState = {
  age: 25,
  loading: false,
  error: null,
};

const ageSlice = createSlice({
  name: 'age',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.age += action.payload;
        state.loading = false;
      })
      .addCase(ageUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Could not update age.';
      })
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.age = Math.max(0, state.age - action.payload);
        state.loading = false;
      })
      .addCase(ageDownAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Could not update age.';
      });
  },
});

export default ageSlice.reducer;
