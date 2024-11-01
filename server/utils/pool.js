const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost', // or wherever the db is hosted
  user: 'ademk',
  database: 'pro_member_dmyj',
  password: 'why@adem',
  port: 5432, // The default port
});

module.exports = pool;
