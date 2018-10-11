const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Maps',
  password: 'guitar123',
  port: 5432,
})

module.exports = pool;