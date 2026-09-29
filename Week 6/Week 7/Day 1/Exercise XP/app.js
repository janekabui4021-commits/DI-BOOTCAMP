const express = require('express');
const pagesRouter = require('./routes');
const todosRouter = require('./routes/todos');
const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', pagesRouter);
app.use('/todos', todosRouter);
app.use('/books', booksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});