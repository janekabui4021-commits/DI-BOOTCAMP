const db = require('../config/db')

async function create(user, passwordHash) {
  return db.transaction(async (trx) => {
    const [createdUser] = await trx('users')
      .insert(user)
      .returning(['id', 'email', 'username', 'first_name', 'last_name'])

    await trx('hashpwd').insert({
      username: createdUser.username,
      password: passwordHash,
    })

    return createdUser
  })
}

function getAll() {
  return db('users')
    .select('id', 'email', 'username', 'first_name', 'last_name')
    .orderBy('id')
}

function getById(id) {
  return db('users')
    .select('id', 'email', 'username', 'first_name', 'last_name')
    .where({ id })
    .first()
}

function getPasswordByUsername(username) {
  return db('hashpwd').select('password').where({ username }).first()
}

async function update(id, user, passwordHash) {
  return db.transaction(async (trx) => {
    let updatedUser
    if (Object.keys(user).length) {
      const updatedUsers = await trx('users')
        .where({ id })
        .update(user)
        .returning(['id', 'email', 'username', 'first_name', 'last_name'])
      updatedUser = updatedUsers[0]
    } else {
      updatedUser = await trx('users')
        .select('id', 'email', 'username', 'first_name', 'last_name')
        .where({ id })
        .first()
    }

    if (!updatedUser) return undefined

    if (passwordHash) {
      await trx('hashpwd')
        .where({ username: updatedUser.username })
        .update({ password: passwordHash })
    }

    return updatedUser
  })
}

module.exports = { create, getAll, getById, getPasswordByUsername, update }