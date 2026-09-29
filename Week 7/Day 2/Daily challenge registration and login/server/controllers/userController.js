const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')

const userFields = ['email', 'username', 'first_name', 'last_name']

function getUserFields(body) {
  return Object.fromEntries(
    userFields
      .filter((field) => body[field] !== undefined)
      .map((field) => [field, body[field]])
  )
}

async function register(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await userModel.create(getUserFields(req.body), passwordHash)
  res.status(201).json(user)
}

async function login(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const savedPassword = await userModel.getPasswordByUsername(username)
  if (!savedPassword || !(await bcrypt.compare(password, savedPassword.password))) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  res.json({ message: 'Login successful' })
}

async function getAll(req, res) {
  res.json(await userModel.getAll())
}

async function getById(req, res) {
  const user = await userModel.getById(req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
}

async function update(req, res) {
  const userFieldsToUpdate = getUserFields(req.body)
  let passwordHash

  if (req.body.password !== undefined) {
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password cannot be empty' })
    }
    passwordHash = await bcrypt.hash(req.body.password, 12)
  }

  if (!Object.keys(userFieldsToUpdate).length && !passwordHash) {
    return res.status(400).json({ message: 'Provide at least one field to update' })
  }

  const user = await userModel.update(req.params.id, userFieldsToUpdate, passwordHash)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
}

module.exports = { register, login, getAll, getById, update }