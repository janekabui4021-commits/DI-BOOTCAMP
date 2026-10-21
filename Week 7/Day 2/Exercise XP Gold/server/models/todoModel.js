const db = require('../config/db')

function getAll() {
  return db('tasks').select('*').orderBy('id')
}

function getById(id) {
  return db('tasks').where({ id }).first()
}

async function create(todo) {
  const [createdTodo] = await db('tasks').insert(todo).returning('*')
  return createdTodo
}

async function update(id, todo) {
  const [updatedTodo] = await db('tasks')
    .where({ id })
    .update({ ...todo, updated_at: db.fn.now() })
    .returning('*')
  return updatedTodo
}

async function remove(id) {
  return (await db('tasks').where({ id }).del()) > 0
}

module.exports = { getAll, getById, create, update, delete: remove }