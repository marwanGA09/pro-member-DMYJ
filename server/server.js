const app = require('./app');
const pg = require('pg');
const {
  getAllTokens,
  removeFirst30Percent,
} = require('./utils/blacklistToken');

const PORT = process.env.PORT || 4321;

setInterval(() => {
  console.log('set interval', getAllTokens());
  removeFirst30Percent();
  // NOTE remove 30% of oldest token from blacklist  every 5 hours
}, 15 * 1000);
// }, 5 * 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log('server on port ', PORT);
});
