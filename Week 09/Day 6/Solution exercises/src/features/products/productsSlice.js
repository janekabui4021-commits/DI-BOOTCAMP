import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999, stock: 5 },
    { id: 2, name: 'Sneakers', category: 'Fashion', price: 120, stock: 12 },
    { id: 3, name: 'Acrylic Paint Set', category: 'Art', price: 35, stock: 8 },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload }; 
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
