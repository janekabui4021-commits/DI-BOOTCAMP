import { authFailed, authLoggedOut, authStarted, authSucceeded } from './authSlice.js';
import { authService } from './authService.js';

export function registerUser(credentials) {
  return async (dispatch) => {
    dispatch(authStarted());
    try {
      const session = await authService.register(credentials);
      dispatch(authSucceeded(session));
      return { success: true };
    } catch (error) {
      dispatch(authFailed(error.message));
      return { success: false };
    }
  };
}

export function loginUser(credentials) {
  return async (dispatch) => {
    dispatch(authStarted());
    try {
      const session = await authService.login(credentials);
      dispatch(authSucceeded(session));
      return { success: true };
    } catch (error) {
      dispatch(authFailed(error.message));
      return { success: false };
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    authService.logout();
    dispatch(authLoggedOut());
  };
}