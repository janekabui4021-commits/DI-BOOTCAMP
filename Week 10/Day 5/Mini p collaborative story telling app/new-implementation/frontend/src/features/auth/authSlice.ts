import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse } from '@fable/types';

interface AuthState {
  accessToken: string | null;
  user: AuthResponse['user'] | null;
  status: 'checking' | 'authenticated' | 'anonymous';
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  status: 'checking',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<AuthResponse>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = 'authenticated';
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    clearSession(state) {
      state.accessToken = null;
      state.user = null;
      state.status = 'anonymous';
    },
    finishSessionCheck(state) {
      if (state.status === 'checking') state.status = 'anonymous';
    },
  },
});

export const { setSession, setAccessToken, clearSession, finishSessionCheck } = authSlice.actions;
export default authSlice.reducer;
