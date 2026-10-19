import { configureStore } from '@reduxjs/toolkit';
import ageReducer from './features/age/ageSlice.js';

const store = configureStore({
  reducer: {
    age: ageReducer,
  },
});

export default store;
