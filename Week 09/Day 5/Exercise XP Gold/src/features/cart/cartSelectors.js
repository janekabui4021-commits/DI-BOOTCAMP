import { createSelector } from '@reduxjs/toolkit';

export const selectProducts = (state) => state.cart.products;
export const selectCartItems = (state) => state.cart.items;

export const selectCartProducts = createSelector(
  [selectProducts, selectCartItems],
  (products, cartItems) => cartItems
    .map((item) => {
      const product = products.find((availableProduct) => availableProduct.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter((product) => product !== null),
);

export const calculateTotalPrice = createSelector(
  [selectProducts, selectCartItems],
  (products, cartItems) => cartItems.reduce((total, item) => {
    const product = products.find((availableProduct) => availableProduct.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0),
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0),
);
