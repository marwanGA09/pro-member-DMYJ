const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController');
const authRouter = require('./router/authoRouter');
const userRouter = require('./router/userRouter');
const memberRouter = require('./router/memberRouter');
const paymentRouter = require('./router/paymentRouter');
const reportRouter = require('./router/reportRouter');
const authentication = require('./controller/authController');

const DEPLOYMENT_URL = 'https://pro-member-dmyj-1.onrender.com';
const DEVELOPMENT_URL = 'http://localhost:5173';

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// app.use((req, res, next) => {
//   console.log('middleware');
//   console.log(JSON.stringify({ cookies: req.cookies }, null, 2));
//   next();
// });

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? DEPLOYMENT_URL : DEVELOPMENT_URL,
    credentials: true,
  })
);

app.use((req, res, next) => {
  // console.log('simply checking if this works');
  // console.log('middleware');
  // console.log(JSON.stringify({ cookies: req.cookies }, null, 2));
  // console.log('req.headers', req.headers);
  // console.log('req.body', req.body);
  // console.log('req.params', req.params);
  // console.log('req.query', req.query);
  next();
});

app.get('/', (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'Welcome to the API',
  });
});

app.use('/v1', authRouter);

app.use('/v1/users', authentication.protected, userRouter);

app.use('/v1/members', authentication.protected, memberRouter);

app.use('/v1/payments', authentication.protected, paymentRouter);

app.use('/v1/report', authentication.protected, reportRouter);

app.all('*', (req, res, next) => {
  // console.log(req.url);
  return next(new AppError(`Invalid route ${req.url}`, 404));
});

app.use(errorController);

module.exports = app;
