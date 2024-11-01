const express = require('express');
const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController');
const authRouter = require('./router/authoRouter');
const app = express();

// app.all('/ping', (req, res, next) => {
//   return res.status(200).json({
//     status: 'success',
//     message: 'Ping successfully succeeded',
//   });
// });

app.use('/v1', authRouter);

app.all('*', (req, res, next) => {
  console.log('url', req.url);
  return next(new AppError('Invalid route', 400));
});

app.use(errorController);

module.exports = app;
