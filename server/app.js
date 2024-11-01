const express = require('express');

const app = express();

app.all('/ping', (req, res, next) => {
  return next(new Error('Not implemented'));
  //   return res.status(200).json({
  //     status: 'success',
  //     message: 'Ping successfully succeeded',
  //   });
});

app.all('*', (req, res, next) => {
  next(new Error('Invalid route'));
});

app.use((err, req, res, next) => {
  console.log('ERROR CONTROLLER');
  return res.status(500).json({
    status: 'error',
    error: err,
    message: 'An error occurred',
  });
});

module.exports = app;
