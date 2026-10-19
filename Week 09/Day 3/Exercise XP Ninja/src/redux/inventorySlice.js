import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);
      if (product) product.quantity = action.payload.quantity;
    },
    removeProduct: (state, action) => state.filter((product) => product.id !== action.payload),
  },
});

export const { addProduct, updateQuantity, removeProduct } = inventorySlice.actions;
export default inventorySlice.reducer;