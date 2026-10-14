import { createSlice } from '@reduxjs/toolkit';

function readSession() {
  try {
    const savedSession = sessionStorage.getItem('goodlist-session');
    return savedSession ? JSON.parse(savedSession) : null;
  } catch {
    return null;
  }
}

const savedSession = readSession();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedSession?.user || null,
    token: savedSession?.token || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    authStarted: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    authSucceeded: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = 'idle';
      state.error = null;
    },
    authFailed: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },
    authLoggedOut: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { authFailed, authLoggedOut, authStarted, authSucceeded, clearAuthError } = authSlice.actions;
export default authSlice.reducer;