const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Maps_ver2',
  password: 'admin',
  port: 5433,
})

module.exports = pool;