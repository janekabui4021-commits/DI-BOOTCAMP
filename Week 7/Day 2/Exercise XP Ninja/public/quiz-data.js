(function (root, factory) {
  const questions = factory()
  if (typeof module === 'object' && module.exports) {
    module.exports = questions
  } else {
    root.quizQuestions = questions
  }
})(typeof window === 'undefined' ? globalThis : window, function () {
  return [
    {
      id: 1,
      question: 'What is Node.js?',
      correctAnswer: 1,
      options: [
        { id: 1, option: 'A JavaScript runtime' },
        { id: 2, option: 'A database language' },
        { id: 3, option: 'A CSS framework' },
        { id: 4, option: 'A web browser' },
      ],
    },
    {
      id: 2,
      question: 'Which HTTP status code means “Not Found”?',
      correctAnswer: 5,
      options: [
        { id: 5, option: '404' },
        { id: 6, option: '200' },
        { id: 7, option: '301' },
        { id: 8, option: '500' },
      ],
    },
    {
      id: 3,
      question: 'Which Express middleware parses JSON request bodies?',
      correctAnswer: 9,
      options: [
        { id: 9, option: 'express.json()' },
        { id: 10, option: 'express.static()' },
        { id: 11, option: 'express.router()' },
        { id: 12, option: 'express.body()' },
      ],
    },
    {
      id: 4,
      question: 'Which SQL command retrieves rows from a table?',
      correctAnswer: 13,
      options: [
        { id: 13, option: 'SELECT' },
        { id: 14, option: 'INSERT' },
        { id: 15, option: 'DELETE' },
        { id: 16, option: 'CREATE' },
      ],
    },
    {
      id: 5,
      question: 'In Express, what is middleware?',
      correctAnswer: 17,
      options: [
        { id: 17, option: 'A function passed to app.use()' },
        { id: 18, option: 'A database table' },
        { id: 19, option: 'A URL parameter' },
        { id: 20, option: 'A response header' },
      ],
    },
    {
      id: 6,
      question: 'What does express.json() middleware do?',
      correctAnswer: 21,
      options: [
        { id: 21, option: 'Parses JSON request bodies' },
        { id: 22, option: 'Serves static files' },
        { id: 23, option: 'Connects to PostgreSQL' },
        { id: 24, option: 'Hashes passwords' },
      ],
    },
    {
      id: 7,
      question: 'In /users/:id, what does :id represent?',
      correctAnswer: 25,
      options: [
        { id: 25, option: 'A route parameter' },
        { id: 26, option: 'A query string' },
        { id: 27, option: 'An HTTP method' },
        { id: 28, option: 'A response status' },
      ],
    },
    {
      id: 8,
      question: 'Which SQL statement changes existing rows?',
      correctAnswer: 29,
      options: [
        { id: 29, option: 'UPDATE' },
        { id: 30, option: 'INSERT' },
        { id: 31, option: 'SELECT' },
        { id: 32, option: 'CREATE' },
      ],
    },
    {
      id: 9,
      question: 'What does Knex .where({ id: 1 }) do?',
      correctAnswer: 33,
      options: [
        { id: 33, option: 'Filters rows by id' },
        { id: 34, option: 'Sorts rows by id' },
        { id: 35, option: 'Deletes the row with that id' },
        { id: 36, option: 'Adds an id to every row' },
      ],
    },
    {
      id: 10,
      question: 'What does HTTP status 201 usually mean?',
      correctAnswer: 37,
      options: [
        { id: 37, option: 'A resource was created' },
        { id: 38, option: 'The request was malformed' },
        { id: 39, option: 'The resource was not found' },
        { id: 40, option: 'The server encountered an error' },
      ],
    },
  ]
})