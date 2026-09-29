const express = require('express')
const path = require('path')
const quizRoutes = require('./server/routes/quizRoutes')
const { port } = require('./server/config')

const app = express()

app.use(express.json())
app.use('/api', quizRoutes)
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(port, () => {
  console.log(`Quiz app is running at http://localhost:${port}`)
})