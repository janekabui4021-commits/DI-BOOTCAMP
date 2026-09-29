CREATE TABLE IF NOT EXISTS options (
  id SERIAL PRIMARY KEY,
  option TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  correct_answer INTEGER NOT NULL REFERENCES options(id)
);

CREATE TABLE IF NOT EXISTS questions_options (
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_id INTEGER NOT NULL REFERENCES options(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, option_id)
);

INSERT INTO options (id, option) VALUES
  (1, 'A JavaScript runtime'), (2, 'A database language'),
  (3, 'A CSS framework'), (4, 'A web browser'),
  (5, '404'), (6, '200'), (7, '301'), (8, '500'),
  (9, 'express.json()'), (10, 'express.static()'),
  (11, 'express.router()'), (12, 'express.body()'),
  (13, 'SELECT'), (14, 'INSERT'), (15, 'DELETE'), (16, 'CREATE'),
  (17, 'A function passed to app.use()'), (18, 'A database table'),
  (19, 'A URL parameter'), (20, 'A response header'),
  (21, 'Parses JSON request bodies'), (22, 'Serves static files'),
  (23, 'Connects to PostgreSQL'), (24, 'Hashes passwords'),
  (25, 'A route parameter'), (26, 'A query string'),
  (27, 'An HTTP method'), (28, 'A response status'),
  (29, 'UPDATE'), (30, 'INSERT'), (31, 'SELECT'), (32, 'CREATE'),
  (33, 'Filters rows by id'), (34, 'Sorts rows by id'),
  (35, 'Deletes the row with that id'), (36, 'Adds an id to every row'),
  (37, 'A resource was created'), (38, 'The request was malformed'),
  (39, 'The resource was not found'), (40, 'The server encountered an error')
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (id, question, correct_answer) VALUES
  (1, 'What is Node.js?', 1),
  (2, 'Which HTTP status code means “Not Found”?', 5),
  (3, 'Which Express middleware parses JSON request bodies?', 9),
  (4, 'Which SQL command retrieves rows from a table?', 13),
  (5, 'In Express, what is middleware?', 17),
  (6, 'What does express.json() middleware do?', 21),
  (7, 'In /users/:id, what does :id represent?', 25),
  (8, 'Which SQL statement changes existing rows?', 29),
  (9, 'What does Knex .where({ id: 1 }) do?', 33),
  (10, 'What does HTTP status 201 usually mean?', 37)
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions_options (question_id, option_id) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4),
  (2, 5), (2, 6), (2, 7), (2, 8),
  (3, 9), (3, 10), (3, 11), (3, 12),
  (4, 13), (4, 14), (4, 15), (4, 16),
  (5, 17), (5, 18), (5, 19), (5, 20),
  (6, 21), (6, 22), (6, 23), (6, 24),
  (7, 25), (7, 26), (7, 27), (7, 28),
  (8, 29), (8, 30), (8, 31), (8, 32),
  (9, 33), (9, 34), (9, 35), (9, 36),
  (10, 37), (10, 38), (10, 39), (10, 40)
ON CONFLICT (question_id, option_id) DO NOTHING;