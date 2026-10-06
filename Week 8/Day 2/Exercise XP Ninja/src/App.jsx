import React from 'react';
import UsersList from './components/UsersList';
import Customers from './components/Customers';

export default function App() {
  return (
    <main className="app">
      <header className="page-header">
        <p className="eyebrow">Week 8 · Day 2 · Exercise XP Ninja</p>
        <h1>Express API Data</h1>
        <p>Fetch JSON from two Express backends and render it with React.</p>
      </header>

      <div className="content-grid">
        <UsersList />
        <Customers />
      </div>
    </main>
  );
}
