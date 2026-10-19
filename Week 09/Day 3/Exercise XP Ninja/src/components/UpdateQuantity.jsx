import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../redux/inventorySlice.js';

export default function UpdateQuantity({ product }) {
  const [quantity, setQuantity] = useState(String(product.quantity));
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const count = Number(quantity);
    if (!Number.isInteger(count) || count < 0) return;
    dispatch(updateQuantity({ id: product.id, quantity: count }));
  }

  return (
    <form className="quantity-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={`quantity-${product.id}`}>Quantity for {product.name}</label>
      <input
        id={`quantity-${product.id}`}
        type="number"
        min="0"
        step="1"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        aria-label={`Quantity for ${product.name}`}
        required
      />
      <button type="submit" aria-label={`Update quantity for ${product.name}`} title="Save quantity">Save</button>
    </form>
  );
}