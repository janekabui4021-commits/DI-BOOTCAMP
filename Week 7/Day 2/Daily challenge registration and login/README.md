# User Management API

Express API using Knex and PostgreSQL. Passwords are hashed with bcrypt and stored separately from user profile information.

## Setup

1. Create a PostgreSQL database named `user_management_db` (or set `DB_NAME`).
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string.
3. Run `npm install`.
4. Apply the schema with `psql -d user_management_db -f db/schema.sql`.
5. Start the API with `npm start`.

The API listens on port `3000` by default. Registration accepts `username` and `password`, plus optional `email`, `first_name`, and `last_name`. User responses never include password hashes.

## Test with curl

```sh
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"username":"sam","password":"secret123","email":"sam@example.com","first_name":"Sam","last_name":"Lee"}'
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"sam","password":"secret123"}'
curl http://localhost:3000/users
curl http://localhost:3000/users/1
curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"first_name":"Samuel","password":"newsecret123"}'
```