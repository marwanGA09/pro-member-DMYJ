const app = require('./app');

const PORT = process.env.PORT || 4321;

app.listen(PORT, () => {
  console.log('server on port ', PORT);
});
