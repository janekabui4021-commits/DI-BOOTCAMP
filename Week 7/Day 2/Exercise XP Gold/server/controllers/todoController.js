const todoModel = require('../models/todoModel')

function parseTodoId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function getTodos(req, res, next) {
  todoModel.getAll()
    .then((todos) => res.status(200).json(todos))
    .catch(next)
}

async function getTodo(req, res, next) {
  try {
    const id = parseTodoId(req.params.id)
    const todo = id ? await todoModel.getById(id) : null

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json(todo)
  } catch (error) {
    next(error)
  }
}

async function createTodo(req, res, next) {
  try {
    const { title, completed = false } = req.body || {}

    if (typeof title !== 'string' || !title.trim() || typeof completed !== 'boolean') {
      return res.status(400).json({
        message: 'A non-empty title and a boolean completed value are required',
      })
    }

    const todo = await todoModel.create({ title: title.trim(), completed })
    res.status(201).json(todo)
  } catch (error) {
    next(error)
  }
}

async function updateTodo(req, res, next) {
  try {
    const id = parseTodoId(req.params.id)
    const { title, completed } = req.body || {}

    if (!id) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    if (typeof title !== 'string' || !title.trim() || typeof completed !== 'boolean') {
      return res.status(400).json({
        message: 'A non-empty title and a boolean completed value are required',
      })
    }

    const todo = await todoModel.update(id, { title: title.trim(), completed })
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json(todo)
  } catch (error) {
    next(error)
  }
}

async function deleteTodo(req, res, next) {
  try {
    const id = parseTodoId(req.params.id)
    const deleted = id ? await todoModel.delete(id) : false

    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo }