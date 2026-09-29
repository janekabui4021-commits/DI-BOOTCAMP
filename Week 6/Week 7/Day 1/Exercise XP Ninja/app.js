const express = require('express');
const greetingRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: false }));
app.use('/', greetingRouter);

app.listen(PORT, () => {
  console.log(`Emoji Greeting app running at http://localhost:${PORT}`);
});