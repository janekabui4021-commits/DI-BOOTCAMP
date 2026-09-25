const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// Middleware to parse JSON request bodies
app.use(express.json());

// 1. Read All Posts
app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts', message: error.message });
  }
});

// 2. Read Single Post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Failed to fetch post', message: error.message });
  }
});

// 3. Create Post
app.post('/api/posts', async (req, res) => {
  try {
    const response = await axios.post(BASE_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', message: error.message });
  }
});

// 4. Update Post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.put(`${BASE_URL}/${req.params.id}`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post', message: error.message });
  }
});

// 5. Delete Post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await axios.delete(`${BASE_URL}/${req.params.id}`);
    res.status(200).json({ message: `Post ${req.params.id} successfully deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post', message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});