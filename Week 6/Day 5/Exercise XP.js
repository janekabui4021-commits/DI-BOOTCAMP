// ============================================================================
// EXERCISE 1: Building a RESTful API (blog-api)
// ============================================================================
// Setup commands:
// mkdir blog-api && cd blog-api
// npm init -y
// npm install express
// node server.js

// --- File: blog-api/server.js ---
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [
  { id: 1, title: 'First Post', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Post', content: 'This is another blog post.' }
];

// GET /posts - Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET /posts/:id - Get specific post by ID
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// POST /posts - Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id - Update an existing post
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content } = req.body;
  posts[postIndex] = {
    ...posts[postIndex],
    title: title || posts[postIndex].title,
    content: content || posts[postIndex].content
  };

  res.json(posts[postIndex]);
});

// DELETE /posts/:id - Delete a post
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const deletedPost = posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully', post: deletedPost[0] });
});

// Error handling for invalid routes (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handling middleware (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Blog API server running on http://localhost:${PORT}`);
});


// ============================================================================
// EXERCISE 2: Building a Basic CRUD API with Express.js (book-api)
// ============================================================================
// Setup commands:
// mkdir book-api && cd book-api
// npm init -y
// npm install express
// node app.js

// --- File: book-api/app.js ---
const expressBookApp = express();
const BOOK_PORT = 5000;

expressBookApp.use(express.json());

let books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
  { id: 2, title: '1984', author: 'George Orwell', publishedYear: 1949 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 }
];

// Read all route
expressBookApp.get('/api/books', (req, res) => {
  res.json(books);
});

// Read single book route
expressBookApp.get('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId, 10);
  const book = books.find(b => b.id === bookId);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Create book route
expressBookApp.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    publishedYear
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

expressBookApp.listen(BOOK_PORT, () => {
  console.log(`Book API server is running on port ${BOOK_PORT}`);
});


// ============================================================================
// EXERCISE 3: CRUD API with Express & Axios using a Data Module (crud-api)
// ============================================================================
// Setup commands:
// mkdir crud-api && cd crud-api
// npm init -y
// npm install express axios
// mkdir data
// node app.js

// --- File: crud-api/data/dataService.js ---
const axios = require('axios');

async function fetchPosts() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
}

module.exports = { fetchPosts };

// --- File: crud-api/app.js ---
const crudApp = express();
const CRUD_PORT = 5000;
const { fetchPosts } = require('./data/dataService');

crudApp.use(express.json());

crudApp.get('/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log('Data has been successfully retrieved and sent as a response.');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching data from JSONPlaceholder:', error.message);
    res.status(500).json({ error: 'Failed to fetch external posts data' });
  }
});

crudApp.listen(CRUD_PORT, () => {
  console.log(`CRUD API server is running on port ${CRUD_PORT}`);
});