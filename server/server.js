const app = require('./app');
const pg = require('pg');

const PORT = process.env.PORT || 4321;

app.listen(PORT, () => {
  console.log('server on port ', PORT);
});
