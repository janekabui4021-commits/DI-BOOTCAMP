import { createSelector } from '@reduxjs/toolkit';

const selectProductsState = (state) => state.products;

export const selectAllProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.products,
);

export const selectAvailableProducts = createSelector([selectAllProducts], (products) =>
  products.filter((product) => product.inStock),
);

export const selectCategories = createSelector([selectAllProducts], (products) =>
  [...new Set(products.map((product) => product.category))],
);

export const selectProductsByCategory = (category) =>
  createSelector([selectAllProducts], (products) =>
    category === 'All' ? products : products.filter((product) => product.category === category),
  );
