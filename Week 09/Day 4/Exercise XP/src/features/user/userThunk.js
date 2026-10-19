import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue, signal }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal });

    if (!response.ok) {
      return rejectWithValue(
        response.status === 404
          ? `No user found with ID ${userId}. Choose an ID from 1 to 10.`
          : `Could not load the user (request failed with status ${response.status}).`,
      );
    }

    const user = await response.json();
    if (!user || typeof user.id !== 'number' || typeof user.name !== 'string') {
      return rejectWithValue('The server returned user data in an unexpected format.');
    }

    return user;
  },
  {
    condition: (_userId, { getState }) => getState().user.status !== 'loading',
  },
);
