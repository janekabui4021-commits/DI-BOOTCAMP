const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Simulated database array
let posts = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second post.' }
];

// GET /posts - Get all blog posts
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// GET /posts/:id - Get a specific blog post by ID
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  res.status(200).json(post);
});

// POST /posts - Create a new blog post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id - Update an existing blog post
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title: title || posts[postIndex].title,
    content: content || posts[postIndex].content
  };

  res.status(200).json(posts[postIndex]);
});

// DELETE /posts/:id - Delete a blog post
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  const deletedPost = posts.splice(postIndex, 1);
  res.status(200).json({ message: 'Post deleted successfully', post: deletedPost[0] });
});

// Error handling for non-existent routes (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Generic error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});