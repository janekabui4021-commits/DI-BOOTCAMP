const express = require('express');
const router = express.Router();

const todos = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'A non-empty title is required.' });
  }

  const todo = { id: nextId++, title: title.trim(), completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'To-do item not found.' });
  }

  const { title, completed } = req.body;
  if (typeof title !== 'string' || !title.trim() || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'A non-empty title and boolean completed value are required.' });
  }

  todo.title = title.trim();
  todo.completed = completed;
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'To-do item not found.' });
  }

  todos.splice(index, 1);
  res.status(204).end();
});

module.exports = router;