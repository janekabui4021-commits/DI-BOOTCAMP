import React from 'react';
import AddProduct from './components/AddProduct.jsx';
import InventoryList from './components/InventoryList.jsx';

export default function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inventory" aria-label="Stockroom home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>stockroom<span className="brand-period">.</span></span>
        </a>
        <span className="course-tag">WEEK 9 <i>/</i> DAY 3 <i>/</i> NINJA</span>
      </header>

      <section className="workspace" id="inventory" aria-labelledby="page-title">
        <div className="page-heading">
          <div>
            <p className="eyebrow">OPERATIONS <span>·</span> INVENTORY</p>
            <h1 id="page-title">Stockroom</h1>
            <p className="subtitle">A clear view of what’s on hand.</p>
          </div>
          <div className="live-indicator"><span aria-hidden="true" /> LIVE INVENTORY</div>
        </div>

        <AddProduct />
        <InventoryList />
      </section>
      <footer className="page-footer">STOCKROOM <span>·</span> INVENTORY WORKSPACE</footer>
    </main>
  );
}