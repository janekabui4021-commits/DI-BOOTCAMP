const express = require('express');

const router = express.Router();
const posts = [];
let nextId = 1;

function parsePostId(value) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

router.get('/', (req, res) => {
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const id = parsePostId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Post ID must be a positive integer' });
  }

  const post = posts.find((item) => item.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

router.post('/', (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  const content = typeof req.body.content === 'string' ? req.body.content.trim() : '';
  if (!title || !content) {
    return res.status(400).json({ error: 'A non-empty title and content are required' });
  }

  const post = {
    id: nextId++,
    title,
    content,
    timestamp: new Date().toISOString()
  };
  posts.push(post);
  res.status(201).json(post);
});

router.put('/:id', (req, res) => {
  const id = parsePostId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Post ID must be a positive integer' });
  }

  const post = posts.find((item) => item.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const fields = Object.keys(req.body);
  if (fields.length === 0 || fields.some((field) => !['title', 'content'].includes(field))) {
    return res.status(400).json({ error: 'Provide title and/or content to update' });
  }

  if (req.body.title !== undefined) {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    if (!title) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    post.title = title;
  }
  if (req.body.content !== undefined) {
    const content = typeof req.body.content === 'string' ? req.body.content.trim() : '';
    if (!content) {
      return res.status(400).json({ error: 'Content must be a non-empty string' });
    }
    post.content = content;
  }

  res.json(post);
});

router.delete('/:id', (req, res) => {
  const id = parsePostId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Post ID must be a positive integer' });
  }

  const index = posts.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(index, 1);
  res.status(204).end();
});

module.exports = router;