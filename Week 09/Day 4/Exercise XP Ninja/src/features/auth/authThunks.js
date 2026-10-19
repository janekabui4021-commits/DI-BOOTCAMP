import { login } from './authSlice.js';

export const loginUser = () => (dispatch) => {
  dispatch(login());
};
