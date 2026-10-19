import React from 'react';
import { useSelector } from 'react-redux';
import RemoveProduct from './RemoveProduct.jsx';
import UpdateQuantity from './UpdateQuantity.jsx';

export default function InventoryList() {
  const products = useSelector((state) => state.inventory);
  const totalUnits = products.reduce((total, product) => total + product.quantity, 0);

  return (
    <section className="inventory-section" aria-labelledby="inventory-heading">
      <div className="inventory-heading">
        <div className="section-title">
          <span className="section-index">02</span>
          <h2 id="inventory-heading">All products</h2>
        </div>
        <div className="inventory-summary">
          <span>{products.length} {products.length === 1 ? 'ITEM' : 'ITEMS'}</span>
          <span className="summary-divider">/</span>
          <span>{totalUnits} UNITS</span>
        </div>
      </div>
      {products.length === 0 ? (
        <div className="empty-state">
          <span className="empty-mark" aria-hidden="true">—</span>
          <p>Your inventory is empty</p>
          <span>Add your first product above to get started.</span>
        </div>
      ) : (
        <div className="table-scroll">
          <table className="inventory-table">
            <thead>
              <tr>
                <th scope="col">PRODUCT</th>
                <th scope="col">SKU</th>
                <th scope="col">STOCK LEVEL</th>
                <th scope="col" className="quantity-column">QUANTITY</th>
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="product-name">{product.name}</td>
                  <td><span className="sku">{product.sku}</span></td>
                  <td>
                    <span className={`stock-status${product.quantity === 0 ? ' is-empty' : product.quantity < 6 ? ' is-low' : ''}`}>
                      <span aria-hidden="true" />
                      {product.quantity === 0 ? 'Out of stock' : product.quantity < 6 ? 'Low stock' : 'In stock'}
                    </span>
                  </td>
                  <td><UpdateQuantity product={product} /></td>
                  <td><RemoveProduct productId={product.id} productName={product.name} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {products.length > 0 && <p className="table-note">Quantities update in your current session.</p>}
    </section>
  );
}