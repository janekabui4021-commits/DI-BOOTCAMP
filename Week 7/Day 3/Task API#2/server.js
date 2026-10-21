const path = require('node:path')
const http = require('node:http')
const express = require('express')
const usersRouter = require('./routes/users')

const app = express()
const server = http.createServer(app)
const port = Number(process.env.PORT) || 3002

app.use(express.json({ limit: '16kb' }))
app.use('/', usersRouter)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.redirect('/login.html'))

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' })
})

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)
  const status = Number.isInteger(error.status) ? error.status : 500
  res.status(status).json({
    error: status === 500 ? 'An internal server error occurred.' : error.message,
  })
})

if (require.main === module) {
  server.listen(port, () => console.log(`User Management API listening at http://localhost:${port}`))
}

module.exports = { app, server }