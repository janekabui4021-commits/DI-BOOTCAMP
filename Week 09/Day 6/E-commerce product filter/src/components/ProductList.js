import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  removeProduct,
  toggleAvailability,
} from '../features/products/productsSlice.js';
import {
  selectAllProducts,
  selectAvailableProducts,
  selectCategories,
  selectProductsByCategory,
} from '../features/products/productSelectors.js';

function ProductList() {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const availableProducts = useSelector(selectAvailableProducts);
  const categories = useSelector(selectCategories);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [form, setForm] = useState({
    name: '',
    category: 'Electronics',
    price: 50,
    inStock: true,
  });

  const categoryFilteredProducts = useSelector(selectProductsByCategory(selectedCategory));

  const visibleProducts = useMemo(() => {
    let products = [...categoryFilteredProducts];

    if (onlyAvailable) {
      products = products.filter((product) => product.inStock);
    }

    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return products;
  }, [categoryFilteredProducts, onlyAvailable, sortBy]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    if (!trimmedName) return;

    dispatch(
      addProduct({
        name: trimmedName,
        category: form.category,
        price: Number(form.price),
        inStock: form.inStock,
      }),
    );

    setForm({ name: '', category: 'Electronics', price: 50, inStock: true });
  };

  return (
    <div className="products-page">
      <div className="product-card">
        <header className="product-header">
          <div>
            <p className="eyebrow">E-commerce</p>
            <h1>Product Filter</h1>
          </div>
          <span className="count">{allProducts.length} items</span>
        </header>

        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Product name"
            aria-label="Product name"
          />
          <select
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
          >
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Accessories">Accessories</option>
          </select>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
            placeholder="Price"
          />
          <label className="stock-toggle">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(event) => setForm({ ...form, inStock: event.target.checked })}
            />
            In stock
          </label>
          <button type="submit">Add product</button>
        </form>

        <div className="toolbar">
          <label>
            Category
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              <option value="All">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(event) => setOnlyAvailable(event.target.checked)}
            />
            Available only
          </label>
        </div>

        <div className="stats">
          <span>Total: {allProducts.length}</span>
          <span>Available: {availableProducts.length}</span>
        </div>

        <ul className="product-list">
          {visibleProducts.length === 0 ? (
            <li className="empty-state">No products match the current filters.</li>
          ) : (
            visibleProducts.map((product) => (
              <li key={product.id} className="product-item">
                <div>
                  <h2>{product.name}</h2>
                  <p>
                    {product.category} · {product.inStock ? 'In stock' : 'Out of stock'}
                  </p>
                </div>

                <div className="product-meta">
                  <strong>${product.price}</strong>
                  <button type="button" onClick={() => dispatch(toggleAvailability(product.id))}>
                    {product.inStock ? 'Mark out' : 'Mark in'}
                  </button>
                  <button type="button" className="danger" onClick={() => dispatch(removeProduct(product.id))}>
                    Remove
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProductList;
