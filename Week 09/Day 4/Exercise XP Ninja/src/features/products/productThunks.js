import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from './productSlice.js';

const mockProducts = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Headphones', price: 199, category: 'Electronics' },
  { id: 3, name: 'Backpack', price: 79, category: 'Accessories' },
  { id: 4, name: 'Sneakers', price: 120, category: 'Fashion' },
];

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsStart());

  try {
    setTimeout(() => {
      dispatch(fetchProductsSuccess(mockProducts));
    }, 200);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};
