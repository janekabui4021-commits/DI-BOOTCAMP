const crypto = require('node:crypto')
const path = require('node:path')
const http = require('node:http')
const express = require('express')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const messageHistory = new Map()
const port = Number(process.env.PORT) || 3000
const historyLimit = 100

app.use(express.static(path.join(__dirname, 'public')))
app.get('/health', (req, res) => res.json({ status: 'ok' }))

const normalizeRoom = (value) => {
  if (typeof value !== 'string') return ''
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32)
}

const addToHistory = (room, message) => {
  const history = messageHistory.get(room) ?? []
  history.push(message)
  if (history.length > historyLimit) history.shift()
  messageHistory.set(room, history)
}

const broadcastSystemMessage = (room, text) => {
  const message = {
    id: crypto.randomUUID(),
    system: true,
    text,
    sentAt: new Date().toISOString(),
  }
  addToHistory(room, message)
  io.to(room).emit('chat:message', message)
}

const getRoomUsers = (room) => {
  const socketIds = io.sockets.adapter.rooms.get(room) ?? new Set()
  return [...socketIds]
    .map((id) => io.sockets.sockets.get(id))
    .filter((socket) => socket?.data.username)
    .map((socket) => ({ id: socket.id, username: socket.data.username }))
    .sort((first, second) => first.username.localeCompare(second.username))
}

const broadcastRoomUsers = (room) => {
  io.to(room).emit('room:users', getRoomUsers(room))
}

const leaveCurrentRoom = (socket, announce = true) => {
  const room = socket.data.room
  if (!room) return

  const username = socket.data.username
  socket.leave(room)
  socket.data.room = null
  if (announce) broadcastSystemMessage(room, `${username} left the room`)
  broadcastRoomUsers(room)
}

io.on('connection', (socket) => {
  socket.on('room:join', (payload = {}) => {
    const username = typeof payload.username === 'string' ? payload.username.trim().slice(0, 24) : ''
    const room = normalizeRoom(payload.room)

    if (!username) {
      socket.emit('chat:error', 'Enter a username before joining.')
      return
    }
    if (!room) {
      socket.emit('chat:error', 'Room names need at least one letter or number.')
      return
    }

    if (socket.data.room === room && socket.data.username === username) {
      socket.emit('room:history', messageHistory.get(room) ?? [])
      broadcastRoomUsers(room)
      return
    }

    leaveCurrentRoom(socket)
    socket.data.username = username
    socket.data.room = room
    socket.join(room)
    socket.emit('room:joined', { room, username })
    socket.emit('room:history', messageHistory.get(room) ?? [])
    broadcastSystemMessage(room, `${username} joined the room`)
    broadcastRoomUsers(room)
  })

  socket.on('chat:send', (value) => {
    const room = socket.data.room
    const text = typeof value === 'string' ? value.trim() : ''
    if (!room || !text) return
    if (text.length > 2000) {
      socket.emit('chat:error', 'Messages must be 2,000 characters or fewer.')
      return
    }

    const message = {
      id: crypto.randomUUID(),
      userId: socket.id,
      username: socket.data.username,
      text,
      sentAt: new Date().toISOString(),
    }
    addToHistory(room, message)
    io.to(room).emit('chat:message', message)
  })

  socket.on('room:leave', () => {
    if (!socket.data.room) return
    leaveCurrentRoom(socket)
    socket.emit('room:left')
  })

  socket.on('disconnect', () => {
    leaveCurrentRoom(socket)
  })
})

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Real-time chat app listening at http://localhost:${port}`)
  })
}

module.exports = { app, io, server }