const express = require('express');
const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController');
const authRouter = require('./router/authoRouter');
const Strategy = require('./utils/PassportStrategy');
const app = express();

app.use(express.json());
// app.all('/ping', (req, res, next) => {
//   return res.status(200).json({
//     status: 'success',
//     message: 'Ping successfully succeeded',
//   });
// });

app.get('/home', (req, res, next) => {
  res.send('hello wold from home');
});

// app.get('/home', (req, res, next) => {
//   res.send('<p>ending available</p>');
// });

app.use('/v1', authRouter);

app.all('*', (req, res, next) => {
  console.log('url', req.url);
  return next(new AppError('Invalid route', 400));
});

app.use(errorController);

module.exports = app;
