import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 'linen-journal', name: 'Linen-bound journal', description: 'A little room for big ideas.', price: 18, category: 'Paper goods', color: 'sage', icon: '▤' },
    { id: 'ceramic-cup', name: 'Sunday ceramic cup', description: 'Hand-finished, made for slow mornings.', price: 24, category: 'Homeware', color: 'clay', icon: '◡' },
    { id: 'desk-timer', name: 'Focus desk timer', description: 'A gentle nudge to do one thing well.', price: 32, category: 'Desk essentials', color: 'blue', icon: '◷' },
    { id: 'canvas-tote', name: 'Everyday canvas tote', description: 'Your everyday carry, thoughtfully made.', price: 28, category: 'Accessories', color: 'butter', icon: '⌑' },
    { id: 'plant-mister', name: 'Brass plant mister', description: 'A small ritual for your leafy friends.', price: 21, category: 'Homeware', color: 'pink', icon: '❋' },
    { id: 'pencil-set', name: 'The good pencil set', description: 'Six smooth-writing studio pencils.', price: 12, category: 'Paper goods', color: 'lavender', icon: '✎' },
  ],
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (!product) return;

      const cartItem = state.items.find((item) => item.productId === action.payload);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ productId: action.payload, quantity: 1 });
      }
    },
    decrementCartItem: (state, action) => {
      const cartItem = state.items.find((item) => item.productId === action.payload);
      if (!cartItem) return;

      if (cartItem.quantity === 1) {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      } else {
        cartItem.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
  },
});

export const { addToCart, decrementCartItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
