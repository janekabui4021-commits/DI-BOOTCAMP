const express = require('express')
const bookRoutes = require('./server/routes/bookRoutes')
const errorHandler = require('./server/config/errorHandler')
const { port: PORT } = require('./server/config')

const app = express()

app.use(express.json())
app.use('/api/books', bookRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Book API server is running on port ${PORT}`)
})