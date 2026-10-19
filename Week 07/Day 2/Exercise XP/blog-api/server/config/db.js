require('dotenv').config()

const knex = require('knex')

const connection = process.env.DATABASE_URL || {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'blog_db',
}

module.exports = knex({ client: 'pg', connection })