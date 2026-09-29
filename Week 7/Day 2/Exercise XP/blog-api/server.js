const express = require('express')
const postRoutes = require('./server/routes/postRoutes')
const errorHandler = require('./server/config/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/posts', postRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Blog API server is running on port ${PORT}`)
})