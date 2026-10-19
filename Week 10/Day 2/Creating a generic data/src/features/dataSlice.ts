import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMeals } from '../api/api';
import type { Meal, RequestStatus } from '../types/types';

interface DataState {
  meals: Meal[];
  status: RequestStatus;
  error: string | null;
  query: string;
}

const initialState: DataState = {
  meals: [],
  status: 'idle',
  error: null,
  query: 'chicken',
};

export const loadMeals = createAsyncThunk<
  Meal[],
  string,
  { rejectValue: string }
>('data/loadMeals', async (query, { rejectWithValue, signal }) => {
  try {
    return await fetchMeals(query, signal);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    return rejectWithValue(
      error instanceof Error ? error.message : 'An unexpected error occurred while loading recipes.',
    );
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setQuery(state, action: { payload: string }) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMeals.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadMeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meals = action.payload;
      })
      .addCase(loadMeals.rejected, (state, action) => {
        if (action.meta.aborted) {
          state.status = state.meals.length > 0 ? 'succeeded' : 'idle';
          return;
        }
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Unable to load recipes.';
      });
  },
});

export const { setQuery } = dataSlice.actions;
export default dataSlice.reducer;
