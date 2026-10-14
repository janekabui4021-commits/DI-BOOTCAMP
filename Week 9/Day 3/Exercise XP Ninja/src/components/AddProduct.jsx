import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/inventorySlice.js';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('0');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanSku = sku.trim();
    const count = Number(quantity);
    if (!cleanName || !cleanSku || !Number.isInteger(count) || count < 0) return;

    dispatch(addProduct({ id: crypto.randomUUID(), name: cleanName, sku: cleanSku, quantity: count }));
    setName('');
    setSku('');
    setQuantity('0');
  }

  return (
    <section className="add-section" aria-labelledby="add-heading">
      <div className="section-title">
        <span className="section-index">01</span>
        <h2 id="add-heading">Add a product</h2>
      </div>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="field product-field">
          <label htmlFor="product-name">Product name</label>
          <input
            id="product-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Field notebook"
            required
          />
        </div>
        <div className="field sku-field">
          <label htmlFor="product-sku">SKU</label>
          <input
            id="product-sku"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            placeholder="e.g. NOTE-04"
            required
          />
        </div>
        <div className="field quantity-field">
          <label htmlFor="product-quantity">Qty</label>
          <input
            id="product-quantity"
            type="number"
            min="0"
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </div>
        <button className="add-button" type="submit"><span aria-hidden="true">+</span> Add product</button>
      </form>
    </section>
  );
}