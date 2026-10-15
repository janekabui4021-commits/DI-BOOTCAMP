import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 'deep-work', name: 'Deep work', color: 'violet' },
    { id: 'wellbeing', name: 'Wellbeing', color: 'green' },
    { id: 'personal', name: 'Personal', color: 'orange' },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
    editCategory: (state, action) => {
      const category = state.items.find((item) => item.id === action.payload.id);
      if (category) {
        category.name = action.payload.name;
      }
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter((category) => category.id !== action.payload);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
