const express = require('express');

const router = express.Router();
const todos = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  if (!title) {
    return res.status(400).json({ error: 'A non-empty title is required' });
  }

  const todo = { id: nextId++, title, completed: Boolean(req.body.completed) };
  todos.push(todo);
  res.status(201).json(todo);
});

router.put('/:id', (req, res) => {
  const todo = todos.find((item) => item.id === Number(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (req.body.title !== undefined) {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    if (!title) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    todo.title = title;
  }
  if (req.body.completed !== undefined) {
    if (typeof req.body.completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean' });
    }
    todo.completed = req.body.completed;
  }

  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const index = todos.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).end();
});

module.exports = router;