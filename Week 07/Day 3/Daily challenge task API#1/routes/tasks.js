const express = require('express')
const { randomUUID } = require('node:crypto')
const { readFile, writeFile } = require('node:fs/promises')
const path = require('node:path')

const router = express.Router()
const tasksFile = path.join(__dirname, '..', 'tasks.json')

const createError = (status, message) => Object.assign(new Error(message), { status })

const asyncRoute = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next)
}

const readTasks = async () => {
  const tasks = JSON.parse(await readFile(tasksFile, 'utf8'))
  if (!Array.isArray(tasks)) throw new Error('Task storage must contain an array')
  return tasks
}

const writeTasks = (tasks) => writeFile(tasksFile, `${JSON.stringify(tasks, null, 2)}\n`, 'utf8')

const validateTask = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw createError(400, 'Request body must be a JSON object')
  }

  const allowedFields = ['title', 'description', 'completed']
  if (Object.keys(body).some((field) => !allowedFields.includes(field))) {
    throw createError(400, 'Only title, description, and completed are allowed')
  }
  if (typeof body.title !== 'string' || !body.title.trim()) {
    throw createError(400, 'Title must be a non-empty string')
  }
  if (body.description !== undefined && typeof body.description !== 'string') {
    throw createError(400, 'Description must be a string')
  }
  if (body.completed !== undefined && typeof body.completed !== 'boolean') {
    throw createError(400, 'Completed must be a boolean')
  }

  return {
    title: body.title.trim(),
    description: body.description ?? '',
    completed: body.completed ?? false,
  }
}

router.get('/', asyncRoute(async (req, res) => {
  res.json(await readTasks())
}))

router.get('/:id', asyncRoute(async (req, res) => {
  const task = (await readTasks()).find((item) => item.id === req.params.id)
  if (!task) throw createError(404, 'Task not found')
  res.json(task)
}))

router.post('/', asyncRoute(async (req, res) => {
  const input = validateTask(req.body)
  const tasks = await readTasks()
  const task = { id: randomUUID(), ...input }
  tasks.push(task)
  await writeTasks(tasks)
  res.status(201).json(task)
}))

router.put('/:id', asyncRoute(async (req, res) => {
  const input = validateTask(req.body)
  const tasks = await readTasks()
  const index = tasks.findIndex((item) => item.id === req.params.id)
  if (index === -1) throw createError(404, 'Task not found')
  tasks[index] = { id: tasks[index].id, ...input }
  await writeTasks(tasks)
  res.json(tasks[index])
}))

router.delete('/:id', asyncRoute(async (req, res) => {
  const tasks = await readTasks()
  const index = tasks.findIndex((item) => item.id === req.params.id)
  if (index === -1) throw createError(404, 'Task not found')
  const [deletedTask] = tasks.splice(index, 1)
  await writeTasks(tasks)
  res.json(deletedTask)
}))

module.exports = router