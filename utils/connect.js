const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Maps',
  password: 'admin',
  port: 5433,
})

module.exports = pool;