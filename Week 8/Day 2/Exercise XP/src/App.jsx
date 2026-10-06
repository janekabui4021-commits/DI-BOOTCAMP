import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import PostList from './components/PostList';
import Example1 from './components/Example1';
import Example2 from './components/Example2';
import Example3 from './components/Example3';
import posts from './data/posts.json';
import data from './data/data.json';

function HomeScreen() {
  return <h1 className="display-5">Home</h1>;
}

function ProfileScreen() {
  return <h1 className="display-5">Profile</h1>;
}

function ShopScreen() {
  throw new Error('Shop screen crashed!');
}

export default function App() {
  const webhookUrl = 'https://webhook.site/your-unique-url';

  const handlePostJson = async () => {
    const payload = {
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27,
    };

    if (webhookUrl.includes('your-unique-url')) {
      console.warn('Replace the webhook URL with your own webhook.site URL before testing.');
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('POST error:', error);
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4">
          <div className="container-fluid">
            <span className="navbar-brand">React Router Demo</span>
            <div className="navbar-nav ms-auto d-flex flex-row gap-3">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                Home
              </NavLink>
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/profile">
                Profile
              </NavLink>
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/shop">
                Shop
              </NavLink>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ErrorBoundary key="home"><HomeScreen /></ErrorBoundary>} />
          <Route path="/profile" element={<ErrorBoundary key="profile"><ProfileScreen /></ErrorBoundary>} />
          <Route path="/shop" element={<ErrorBoundary key="shop"><ShopScreen /></ErrorBoundary>} />
        </Routes>

        <div className="row g-4 mt-2">
          <div className="col-12">
            <div className="panel">
              <h2>Exercise 2: Display JSON Data in React JS</h2>
              <PostList posts={posts} />
            </div>
          </div>

          <div className="col-12">
            <div className="panel">
              <h2>Exercise 3: Display JSON Data and parse it</h2>
              <Example1 data={data} />
              <Example2 data={data} />
              <Example3 data={data} />
            </div>
          </div>

          <div className="col-12">
            <div className="panel">
              <h2>Exercise 4: Post JSON Data with React JS</h2>
              <button type="button" className="btn btn-primary" onClick={handlePostJson}>
                Send JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
