const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for Todos
let todos = [];
let nextId = 1;

// 1. Get all todos
app.get('/api/todos', (req, res) => {
  res.status(200).json(todos);
});

// 2. Get a specific todo by ID
app.get('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'Todo item not found.' });
  }

  res.status(200).json(todo);
});

// 3. Create a new todo
app.post('/api/todos', (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  const newTodo = {
    id: nextId++,
    title,
    completed: typeof completed === 'boolean' ? completed : false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 4. Update a todo
app.put('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo item not found.' });
  }

  const { title, completed } = req.body;

  if (title !== undefined) todos[todoIndex].title = title;
  if (completed !== undefined) todos[todoIndex].completed = completed;

  res.status(200).json(todos[todoIndex]);
});

// 5. Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo item not found.' });
  }

  const deletedTodo = todos.splice(todoIndex, 1);
  res.status(200).json({ message: 'Todo deleted successfully', todo: deletedTodo[0] });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Todo API server running on http://localhost:${PORT}`);
});