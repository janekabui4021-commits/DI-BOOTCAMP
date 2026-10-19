import express from 'express';

const app = express();
const port = 3001;

app.get('/users', (request, response) => {
  response.json([
    { id: 1, username: 'somebody' },
    { id: 2, username: 'somebody_else' },
  ]);
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Users API listening at http://127.0.0.1:${port}/users`);
});
