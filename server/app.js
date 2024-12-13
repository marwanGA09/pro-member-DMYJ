const express = require('express');
const morgan = require('morgan');
const expressSession = require('express-session');
const PgStore = require('connect-pg-simple')(expressSession);
const dotenv = require('dotenv');
const cors = require('cors');

const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController');
const authRouter = require('./router/authoRouter');
const memberRouter = require('./router/memberRouter');
const pool = require('./utils/pool');
const authentication = require('./controller/authController');
const catchAsync = require('./utils/catchAsync');

const DEPLOYMENT_URL = '';
const app = express();
dotenv.config();
app.use(morgan('dev'));
console.log('process', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: DEPLOYMENT_URL, credentials: true }));
} else {
  const DEV_ORIGIN = 'http://localhost:5173'; // Frontend origin in development
  app.use(cors({ origin: DEV_ORIGIN, credentials: true }));
}
app.use(express.json());

app.get('/home', (req, res, next) => {
  res.send('hello wold from home');
});
app.get('/v1/protected-route', authentication.protected, (req, res, next) => {
  console.log('This is protected route');
  res.send('This is protected route');
});

app.use('/v1', authRouter);
app.use('/v1/members', memberRouter);

app.all('*', (req, res, next) => {
  console.log(req.url);
  return next(new AppError(`Invalid route ${req.url}`, 400));
});

app.use(errorController);

module.exports = app;
