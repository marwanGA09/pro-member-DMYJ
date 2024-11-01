const app = require('./app');
const pg = require('pg');

app.listen(4321, () => {
  console.log('server on port 4321');
});
