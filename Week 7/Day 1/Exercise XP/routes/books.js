const express = require('express');

const router = express.Router();
const books = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(books);
});

router.post('/', (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  const author = typeof req.body.author === 'string' ? req.body.author.trim() : '';
  if (!title || !author) {
    return res.status(400).json({ error: 'A non-empty title and author are required' });
  }

  const book = { id: nextId++, title, author };
  books.push(book);
  res.status(201).json(book);
});

router.put('/:id', (req, res) => {
  const book = books.find((item) => item.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (req.body.title !== undefined) {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    if (!title) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    book.title = title;
  }
  if (req.body.author !== undefined) {
    const author = typeof req.body.author === 'string' ? req.body.author.trim() : '';
    if (!author) {
      return res.status(400).json({ error: 'Author must be a non-empty string' });
    }
    book.author = author;
  }

  res.json(book);
});

router.delete('/:id', (req, res) => {
  const index = books.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(index, 1);
  res.status(204).end();
});

module.exports = router;