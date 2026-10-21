require('dotenv').config()

const express = require('express')
const userRoutes = require('./server/routes/userRoutes')
const db = require('./server/config/db')

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(express.json())
app.use('/', userRoutes)

app.use((error, req, res, next) => {
  if (error.code === '23505') {
    return res.status(409).json({ message: 'Username or email already exists' })
  }

  console.error(error)
  res.status(500).json({ message: 'Internal server error' })
})

const server = app.listen(port, () => {
  console.log(`User management API is running on port ${port}`)
})

function shutDown() {
  server.close(async () => {
    await db.destroy()
    process.exit(0)
  })
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)