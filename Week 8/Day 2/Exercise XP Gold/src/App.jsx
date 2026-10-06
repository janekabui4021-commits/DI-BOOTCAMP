import React from 'react';
import FetchUserForm from './components/FetchUserForm';
import AxiosPostForm from './components/AxiosPostForm';

export default function App() {
  return (
    <main className="app">
      <header className="page-header">
        <p className="eyebrow">Week 8 · Day 2 · Exercise XP Gold</p>
        <h1>Posting JSON Data</h1>
        <p>Submit form data to JSONPlaceholder using fetch and Axios.</p>
      </header>

      <div className="forms-grid">
        <FetchUserForm />
        <AxiosPostForm />
      </div>
    </main>
  );
}
