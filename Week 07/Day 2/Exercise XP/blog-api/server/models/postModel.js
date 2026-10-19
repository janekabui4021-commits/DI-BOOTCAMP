const db = require('../config/db')

function getAll() {
  return db('posts').select('*').orderBy('id')
}

function getById(id) {
  return db('posts').where({ id }).first()
}

async function create(post) {
  const [createdPost] = await db('posts').insert(post).returning('*')
  return createdPost
}

async function update(id, post) {
  const [updatedPost] = await db('posts')
    .where({ id })
    .update({ ...post, updated_at: db.fn.now() })
    .returning('*')
  return updatedPost
}

async function remove(id) {
  return (await db('posts').where({ id }).del()) > 0
}

module.exports = { getAll, getById, create, update, delete: remove }