const express = require('express');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/posts', postsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status === 400 ? 400 : 500;
  res.status(status).json({
    error: status === 400 ? 'Invalid JSON request body' : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Blog API running at http://localhost:${PORT}`);
});