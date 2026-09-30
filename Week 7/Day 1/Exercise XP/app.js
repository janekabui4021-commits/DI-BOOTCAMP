const express = require('express');
const session = require('express-session');
const indexRouter = require('../Trivia quiz game/routes');
const todosRouter = require('./routes/todos');
const booksRouter = require('./routes/books');
const quizRouter = require('../Trivia quiz game/routes/quiz');

const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'development-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' },
}));
app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/books', booksRouter);
app.use('/quiz', quizRouter);

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

module.exports = app;