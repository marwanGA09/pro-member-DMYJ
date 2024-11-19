const { Pool } = require('pg');
const dotenv = require('dotenv').config();
console.log('password', typeof process.env.DB_USER);
const pool = new Pool({
  host: process.env.DB_HOST, // or wherever the db is hosted
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // The default port
});

module.exports = pool;
