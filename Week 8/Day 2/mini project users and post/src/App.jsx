import React from 'react';
import PostList from './components/PostList';
import UsersList from './components/UsersList';

export default function App() {
  return (
    <main className="app">
      <header className="page-header">
        <p className="eyebrow">Week 8 · Day 2 · Mini Project</p>
        <h1>Posts and Users</h1>
        <p>Data fetched from JSONPlaceholder and displayed with React.</p>
      </header>

      <div className="content-grid">
        <PostList />
        <UsersList />
      </div>
    </main>
  );
}
