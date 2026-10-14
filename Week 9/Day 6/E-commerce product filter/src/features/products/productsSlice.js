import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999, inStock: true },
    { id: 2, name: 'Headphones', category: 'Electronics', price: 149, inStock: true },
    { id: 3, name: 'Sneakers', category: 'Fashion', price: 89, inStock: false },
    { id: 4, name: 'Backpack', category: 'Accessories', price: 59, inStock: true },
    { id: 5, name: 'Coffee Maker', category: 'Home', price: 120, inStock: true },
    { id: 6, name: 'Desk Lamp', category: 'Home', price: 45, inStock: false },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    toggleAvailability: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) product.inStock = !product.inStock;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, toggleAvailability, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
