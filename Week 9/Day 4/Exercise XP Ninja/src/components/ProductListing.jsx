import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productThunks.js';
import { addToCart } from '../features/cart/cartSlice.js';

function ProductListing() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Please log in first.');
      return;
    }

    dispatch(addToCart(product));
  };

  return (
    <section className="panel product-panel">
      <h2>Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {items.map((product) => (
          <article key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <strong>${product.price}</strong>
            <button onClick={() => handleAddToCart(product)}>Add to cart</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductListing;
