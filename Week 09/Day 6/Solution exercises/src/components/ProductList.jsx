import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, updateProduct } from '../features/products/productsSlice.js';

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [category, setCategory] = useState('All');
  const [form, setForm] = useState({ name: '', category: 'Electronics', price: 50, stock: 1 });

  const visibleProducts = useMemo(() => {
    if (category === 'All') return products;
    return products.filter((product) => product.category === category);
  }, [category, products]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name) return;
    dispatch(addProduct({ ...form, price: Number(form.price), stock: Number(form.stock) }));
    setForm({ name: '', category: 'Electronics', price: 50, stock: 1 });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Product catalog</h2>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="All">All</option>
          {[...new Set(products.map((product) => product.category))].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Art">Art</option>
          <option value="Home">Home</option>
        </select>
        <input
          type="number"
          min="0"
          value={form.price}
          onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
        />
        <input
          type="number"
          min="0"
          value={form.stock}
          onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
        />
        <button type="submit">Add product</button>
      </form>

      <ul className="product-grid">
        {visibleProducts.map((product) => (
          <li key={product.id} className="product-item">
            <div>
              <strong>{product.name}</strong>
              <p>{product.category}</p>
            </div>
            <div className="product-meta">
              <span>${product.price}</span>
              <span>Stock: {product.stock}</span>
              <button type="button" className="ghost-button" onClick={() => dispatch(updateProduct({ ...product, stock: product.stock + 1 }))}>
                +1 stock
              </button>
              <button type="button" className="ghost-button" onClick={() => dispatch(removeProduct(product.id))}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
