import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice.js';

function ShoppingCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="panel cart-panel">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={() => dispatch(clearCart())}>Clear cart</button>
        </>
      )}
    </section>
  );
}

export default ShoppingCart;
