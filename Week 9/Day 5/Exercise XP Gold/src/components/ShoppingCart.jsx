import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  calculateTotalPrice,
  selectCartItemCount,
  selectCartProducts,
  selectProducts,
} from '../features/cart/cartSelectors.js';
import {
  addToCart,
  decrementCartItem,
  removeFromCart,
} from '../features/cart/cartSlice.js';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function ShoppingCart() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartProducts);
  const totalPrice = useSelector(calculateTotalPrice);
  const itemCount = useSelector(selectCartItemCount);

  const handleAddToCart = useCallback((productId) => {
    dispatch(addToCart(productId));
  }, [dispatch]);

  const handleDecrement = useCallback((productId) => {
    dispatch(decrementCartItem(productId));
  }, [dispatch]);

  const handleRemove = useCallback((productId) => {
    dispatch(removeFromCart(productId));
  }, [dispatch]);

  return (
    <main className="shop-page">
      <header className="topbar">
        <a className="brand" href="#shop" aria-label="Good Things home">
          <span className="brand-mark" aria-hidden="true">g.</span>
          <span>good things</span>
        </a>
        <span className="topbar-note"><span aria-hidden="true" /> THOUGHTFULLY PICKED, JUST FOR YOU</span>
        <a className="cart-shortcut" href="#your-cart" aria-label={`Your cart, ${itemCount} items`}>
          <span aria-hidden="true">♧</span>
          <span>Bag</span>
          <span className="cart-badge">{itemCount}</span>
        </a>
      </header>

      <div className="shop-content" id="shop">
        <section className="intro">
          <p className="eyebrow">A FEW EVERYDAY FAVOURITES</p>
          <h1>Good things, <em>gathered.</em></h1>
          <p className="intro-copy">
            Useful little things, made with care. Find something to make your day a bit brighter.
          </p>
        </section>

        <div className="shop-layout">
          <section className="catalog" aria-labelledby="catalog-title">
            <div className="section-heading">
              <div>
                <h2 id="catalog-title">The little shop</h2>
                <p>A considered collection for home and work</p>
              </div>
              <span className="product-count">{products.length} OBJECTS</span>
            </div>

            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-art art-${product.color}`}>
                    <span className="art-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="product-illustration" aria-hidden="true">{product.icon}</span>
                    <span className="art-category">{product.category}</span>
                  </div>
                  <div className="product-details">
                    <div className="product-title-row">
                      <h3>{product.name}</h3>
                      <span className="product-price">{currency.format(product.price)}</span>
                    </div>
                    <p>{product.description}</p>
                    <button
                      className="add-button"
                      type="button"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <span aria-hidden="true">+</span> Add to bag
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="cart-panel" id="your-cart" aria-labelledby="cart-title">
            <div className="cart-heading">
              <div>
                <p className="eyebrow">YOUR PICKS</p>
                <h2 id="cart-title">Your bag <span>{itemCount}</span></h2>
              </div>
              <span className="cart-doodle" aria-hidden="true">✳</span>
            </div>

            {cartItems.length ? (
              <>
                <ul className="cart-items">
                  {cartItems.map((item) => (
                    <li className="cart-item" key={item.id}>
                      <span className={`mini-art art-${item.color}`} aria-hidden="true">{item.icon}</span>
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-price">{currency.format(item.price)} each</span>
                        <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                          <button
                            aria-label={`Decrease ${item.name} quantity`}
                            type="button"
                            onClick={() => handleDecrement(item.id)}
                          >
                            −
                          </button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button
                            aria-label={`Increase ${item.name} quantity`}
                            type="button"
                            onClick={() => handleAddToCart(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart-line-end">
                        <span className="line-total">{currency.format(item.price * item.quantity)}</span>
                        <button
                          className="remove-button"
                          type="button"
                          aria-label={`Remove ${item.name} from bag`}
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="cart-summary">
                  <div className="subtotal-row">
                    <span>Subtotal</span>
                    <strong>{currency.format(totalPrice)}</strong>
                  </div>
                  <p>Shipping and taxes calculated at checkout.</p>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span className="empty-cart-icon" aria-hidden="true">♧</span>
                <h3>Your bag is taking a little nap.</h3>
                <p>When something catches your eye, add it here.</p>
                <a href="#catalog-title">Explore the collection <span aria-hidden="true">↗</span></a>
              </div>
            )}
          </aside>
        </div>

        <footer className="page-footer">
          <span>Keep the good things close.</span>
          <span>MADE SLOWLY, CHOSEN THOUGHTFULLY</span>
        </footer>
      </div>
    </main>
  );
}

export default ShoppingCart;
