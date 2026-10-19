import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3003;

app.use(express.json());

app.get('/api/hello', (request, response) => {
  response.json({ message: 'Hello From Express' });
});

app.post('/api/world', (request, response) => {
  const { message } = request.body;

  console.log(request.body);
  response.json({
    message: `I received your POST request. This is what you sent me: ${message}`,
  });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Express server listening at http://127.0.0.1:${port}`);
});
