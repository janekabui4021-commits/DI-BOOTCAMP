import React from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../redux/inventorySlice.js';

export default function RemoveProduct({ productId, productName }) {
  const dispatch = useDispatch();

  return (
    <button
      className="remove-button"
      type="button"
      onClick={() => dispatch(removeProduct(productId))}
      aria-label={`Remove ${productName}`}
      title={`Remove ${productName}`}
    >
      <span aria-hidden="true">×</span>
    </button>
  );
}