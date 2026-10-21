const express = require('express')
const todoRoutes = require('./server/routes/todoRoutes')
const errorHandler = require('./server/config/errorHandler')
const { port: PORT } = require('./server/config')

const app = express()

app.use(express.json())
app.use('/api/todos', todoRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Todo API server is running on port ${PORT}`)
})