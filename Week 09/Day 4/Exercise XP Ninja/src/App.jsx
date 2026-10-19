import React from 'react';
import AuthForm from './components/AuthForm.jsx';
import ProductListing from './components/ProductListing.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';

function App() {
  return (
    <div className="app-shell">
      <AuthForm />
      <ProductListing />
      <ShoppingCart />
    </div>
  );
}

export default App;
