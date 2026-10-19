import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice.js';

export default function Logout() {
  const dispatch = useDispatch();

  return (
    <button className="logout-button" type="button" onClick={() => dispatch(logoutUser())}>
      <span aria-hidden="true">↗</span> Sign out
    </button>
  );
}