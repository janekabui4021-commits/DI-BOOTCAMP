const express = require('express')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const { readFile, writeFile } = require('node:fs/promises')
const path = require('node:path')

const router = express.Router()
const usersFile = path.join(__dirname, '..', 'users.json')
const passwordRounds = 12
const allowedUpdateFields = ['name', 'lastName', 'email', 'username', 'password']

const httpError = (status, message) => Object.assign(new Error(message), { status })
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next)

const readUsers = async () => {
  const users = JSON.parse(await readFile(usersFile, 'utf8'))
  if (!Array.isArray(users)) throw new Error('User storage must contain a JSON array.')
  return users
}

const writeUsers = (users) => writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, 'utf8')

const publicUser = ({ passwordHash, ...user }) => user

const validateProfile = (body, requireAll = false) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw httpError(400, 'Request body must be a JSON object.')
  }
  if (Object.keys(body).some((field) => !allowedUpdateFields.includes(field))) {
    throw httpError(400, 'Only name, lastName, email, username, and password are accepted.')
  }
  if (!requireAll && Object.keys(body).length === 0) {
    throw httpError(400, 'Provide at least one field to update.')
  }

  const profile = {}
  for (const field of ['name', 'lastName', 'email', 'username']) {
    if (requireAll || Object.hasOwn(body, field)) {
      const value = typeof body[field] === 'string' ? body[field].trim() : ''
      if (!value) throw httpError(400, `${field} is required.`)
      profile[field] = value
    }
  }

  if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    throw httpError(400, 'Enter a valid email address.')
  }
  if (profile.username && !/^[a-zA-Z0-9._-]{3,24}$/.test(profile.username)) {
    throw httpError(400, 'Username must be 3–24 characters using letters, numbers, ., _ or -.')
  }

  if (requireAll || Object.hasOwn(body, 'password')) {
    const password = typeof body.password === 'string' ? body.password : ''
    if (password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
      throw httpError(400, 'Password must be at least 8 characters and no more than 72 bytes.')
    }
    profile.password = password
  }

  return profile
}

const passwordIsUsed = async (password, users, excludedId) => {
  for (const user of users) {
    if (user.id !== excludedId && await bcrypt.compare(password, user.passwordHash)) return true
  }
  return false
}

router.post('/register', asyncRoute(async (req, res) => {
  const profile = validateProfile(req.body, true)
  const users = await readUsers()
  const duplicateProfile = users.some((user) => (
    user.username.toLowerCase() === profile.username.toLowerCase()
    || user.email.toLowerCase() === profile.email.toLowerCase()
  ))
  if (duplicateProfile || await passwordIsUsed(profile.password, users)) {
    throw httpError(409, 'Username or password already exists.')
  }

  const user = {
    id: crypto.randomUUID(),
    name: profile.name,
    lastName: profile.lastName,
    email: profile.email.toLowerCase(),
    username: profile.username,
    passwordHash: await bcrypt.hash(profile.password, passwordRounds),
  }
  users.push(user)
  await writeUsers(users)
  res.status(201).json({ message: 'User registered successfully.', user: publicUser(user) })
}))

router.post('/login', asyncRoute(async (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!username || !password) throw httpError(400, 'Username and password are required.')

  const users = await readUsers()
  const user = users.find((entry) => entry.username.toLowerCase() === username.toLowerCase())
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    throw httpError(401, 'Incorrect username or password.')
  }
  res.json({ message: `Welcome, ${user.name}! Login successful.`, user: publicUser(user) })
}))

router.get('/users', asyncRoute(async (req, res) => {
  res.json((await readUsers()).map(publicUser))
}))

router.get('/users/:id', asyncRoute(async (req, res) => {
  const user = (await readUsers()).find((entry) => entry.id === req.params.id)
  if (!user) throw httpError(404, 'User not found.')
  res.json(publicUser(user))
}))

router.put('/users/:id', asyncRoute(async (req, res) => {
  const profile = validateProfile(req.body)
  const users = await readUsers()
  const index = users.findIndex((entry) => entry.id === req.params.id)
  if (index === -1) throw httpError(404, 'User not found.')

  const currentUser = users[index]
  if (profile.username && users.some((user) => (
    user.id !== currentUser.id && user.username.toLowerCase() === profile.username.toLowerCase()
  ))) {
    throw httpError(409, 'Username already exists.')
  }
  if (profile.email && users.some((user) => (
    user.id !== currentUser.id && user.email.toLowerCase() === profile.email.toLowerCase()
  ))) {
    throw httpError(409, 'Email already exists.')
  }
  if (profile.password && await passwordIsUsed(profile.password, users, currentUser.id)) {
    throw httpError(409, 'Password already exists.')
  }

  const updates = { ...profile }
  if (updates.email) updates.email = updates.email.toLowerCase()
  if (updates.password) {
    updates.passwordHash = await bcrypt.hash(updates.password, passwordRounds)
    delete updates.password
  }
  users[index] = { ...currentUser, ...updates }
  await writeUsers(users)
  res.json({ message: 'User updated successfully.', user: publicUser(users[index]) })
}))

module.exports = router