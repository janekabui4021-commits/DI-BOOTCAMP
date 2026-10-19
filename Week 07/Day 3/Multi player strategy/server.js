const crypto = require('node:crypto')
const { promisify } = require('node:util')
const path = require('node:path')
const http = require('node:http')
const express = require('express')

const scrypt = promisify(crypto.scrypt)
const app = express()
const server = http.createServer(app)
const users = new Map()
const sessions = new Map()
const games = new Map()
const port = Number(process.env.PORT) || 3001
const boardSize = 10
const directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}
const obstacleLayout = [
  { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 6 }, { x: 2, y: 7 },
  { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 4 }, { x: 5, y: 5 },
  { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 6 }, { x: 7, y: 7 },
]

app.use(express.json({ limit: '16kb' }))

const httpError = (status, message) => Object.assign(new Error(message), { status })
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next)

const authenticate = (req, res, next) => {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '')
  const username = sessions.get(token)
  if (!username) return res.status(401).json({ error: 'Sign in to continue.' })
  req.username = username
  next()
}

const publicGame = (game) => ({
  id: game.id,
  status: game.status,
  players: game.players.map((player) => ({
    username: player.username,
    side: player.side,
    position: { ...player.position },
    base: { ...player.base },
  })),
  obstacles: game.obstacles.map((cell) => ({ ...cell })),
  turn: game.turn,
  winner: game.winner,
  log: game.log.slice(-12),
})

const findGame = (req) => {
  const game = games.get(req.params.gameId.toLowerCase())
  if (!game) throw httpError(404, 'Game not found.')
  return game
}

const findPlayer = (game, username) => {
  const player = game.players.find((entry) => entry.username === username)
  if (!player) throw httpError(403, 'You are not a player in this game.')
  return player
}

const requireActiveTurn = (game, username) => {
  if (game.status !== 'active') throw httpError(409, 'This game is not active.')
  const player = findPlayer(game, username)
  if (game.turn !== username) throw httpError(409, 'Wait for your turn.')
  return player
}

const addLog = (game, text) => {
  game.log.push({ text, time: new Date().toISOString() })
}

const createGame = (username) => {
  let id
  do {
    id = crypto.randomBytes(4).toString('hex')
  } while (games.has(id))

  const game = {
    id,
    status: 'waiting',
    players: [
      { username, side: 'A', position: { x: 0, y: 0 }, base: { x: 0, y: 0 } },
    ],
    obstacles: obstacleLayout.map((cell) => ({ ...cell })),
    turn: null,
    winner: null,
    log: [],
  }
  addLog(game, `${username} founded a new game. Waiting for an opponent.`)
  games.set(id, game)
  return game
}

app.post('/api/auth/register', asyncRoute(async (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!/^[a-zA-Z0-9_-]{3,18}$/.test(username)) {
    throw httpError(400, 'Username must be 3–18 characters using letters, numbers, _ or -.')
  }
  if (password.length < 8 || password.length > 128) {
    throw httpError(400, 'Password must be between 8 and 128 characters.')
  }

  const key = username.toLowerCase()
  if (users.has(key)) throw httpError(409, 'That username is already registered.')

  const salt = crypto.randomBytes(16).toString('hex')
  const passwordHash = await scrypt(password, salt, 64)
  users.set(key, { username, salt, passwordHash })
  const token = crypto.randomBytes(32).toString('hex')
  sessions.set(token, username)
  res.status(201).json({ token, username })
}))

app.post('/api/auth/login', asyncRoute(async (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  const user = users.get(username.toLowerCase())
  if (!user) throw httpError(401, 'Username or password is incorrect.')

  const passwordHash = await scrypt(password, user.salt, 64)
  if (!crypto.timingSafeEqual(user.passwordHash, passwordHash)) {
    throw httpError(401, 'Username or password is incorrect.')
  }

  const token = crypto.randomBytes(32).toString('hex')
  sessions.set(token, user.username)
  res.json({ token, username: user.username })
}))

app.get('/api/auth/me', authenticate, (req, res) => {
  res.json({ username: req.username })
})

app.post('/api/auth/logout', authenticate, (req, res) => {
  const token = req.get('authorization').replace(/^Bearer\s+/i, '')
  sessions.delete(token)
  res.status(204).end()
})

app.get('/api/games', authenticate, (req, res) => {
  const available = [...games.values()]
    .filter((game) => game.status !== 'finished')
    .map(publicGame)
    .sort((first, second) => first.id.localeCompare(second.id))
  res.json({ games: available })
})

app.post('/api/games', authenticate, (req, res) => {
  const game = createGame(req.username)
  res.status(201).json({ game: publicGame(game) })
})

app.post('/api/games/:gameId/join', authenticate, (req, res) => {
  const game = findGame(req)
  if (game.players.some((player) => player.username === req.username)) {
    return res.json({ game: publicGame(game) })
  }
  if (game.status !== 'waiting') throw httpError(409, 'This game is no longer accepting players.')
  if (game.players.length >= 2) throw httpError(409, 'This game is full.')

  game.players.push({
    username: req.username,
    side: 'B',
    position: { x: boardSize - 1, y: boardSize - 1 },
    base: { x: boardSize - 1, y: boardSize - 1 },
  })
  game.status = 'active'
  game.turn = game.players[0].username
  addLog(game, `${req.username} joined. ${game.turn} moves first.`)
  res.json({ game: publicGame(game) })
})

app.get('/api/games/:gameId', authenticate, (req, res) => {
  const game = findGame(req)
  findPlayer(game, req.username)
  res.json({ game: publicGame(game) })
})

app.get('/api/games/:gameId/winner', authenticate, (req, res) => {
  const game = findGame(req)
  findPlayer(game, req.username)
  res.json({ status: game.status, winner: game.winner })
})

app.post('/api/games/:gameId/move', authenticate, (req, res) => {
  const game = findGame(req)
  const player = requireActiveTurn(game, req.username)
  const direction = directions[req.body?.direction]
  if (!direction) throw httpError(400, 'Choose up, down, left, or right.')

  const target = { x: player.position.x + direction.x, y: player.position.y + direction.y }
  if (target.x < 0 || target.x >= boardSize || target.y < 0 || target.y >= boardSize) {
    throw httpError(400, 'That move would leave the board.')
  }
  if (game.obstacles.some((cell) => cell.x === target.x && cell.y === target.y)) {
    throw httpError(400, 'An obstacle blocks that square.')
  }

  const opponent = game.players.find((entry) => entry.username !== req.username)
  if (opponent.position.x === target.x && opponent.position.y === target.y) {
    throw httpError(409, 'You cannot move onto the other player.')
  }

  player.position = target
  addLog(game, `${player.username} moved ${req.body.direction}.`)
  if (target.x === opponent.base.x && target.y === opponent.base.y) {
    game.status = 'finished'
    game.winner = player.username
    game.turn = null
    addLog(game, `${player.username} captured the opposing base and won.`)
  } else {
    game.turn = opponent.username
  }
  res.json({ game: publicGame(game) })
})

app.post('/api/games/:gameId/attack', authenticate, (req, res) => {
  const game = findGame(req)
  const player = requireActiveTurn(game, req.username)
  const opponent = game.players.find((entry) => entry.username !== req.username)
  const distance = Math.abs(player.position.x - opponent.base.x) + Math.abs(player.position.y - opponent.base.y)
  if (distance !== 1) throw httpError(400, 'Move next to the opposing base before attacking.')

  game.status = 'finished'
  game.winner = player.username
  game.turn = null
  addLog(game, `${player.username} attacked and captured the opposing base.`)
  res.json({ game: publicGame(game) })
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)
  const status = Number.isInteger(error.status) ? error.status : 500
  res.status(status).json({ error: status === 500 ? 'Internal server error' : error.message })
})

if (require.main === module) {
  server.listen(port, () => console.log(`Multi Player Strategy listening at http://localhost:${port}`))
}

module.exports = { app, server }