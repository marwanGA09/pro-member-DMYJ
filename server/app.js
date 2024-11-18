const express = require('express');
const morgan = require('morgan');
const expressSession = require('express-session');
const PgStore = require('connect-pg-simple')(expressSession);
const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController');
const authRouter = require('./router/authoRouter');
const pool = require('./utils/pool');
const passport = require('passport');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
// app.all('/ping', (req, res, next) => {
//   return res.status(200).json({
//     status: 'success',
//     message: 'Ping successfully succeeded',
//   });
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  console.log('session 1');
  // console.log(req.session);
  next();
});

app.use(passport.initialize());

app.use('/', (req, res, next) => {
  console.log('session 2');
  // console.log(req.session);
  next();
});

app.use(
  expressSession({
    store: new PgStore({
      pool: pool, // Connection pool
      tableName: 'user_sessions', // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: 'here is my screet word i use',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

app.use('/', (req, res, next) => {
  console.log('session 3');
  console.log(req.session);
  next();
});

app.use(passport.authenticate('session'));

app.use('/', (req, res, next) => {
  console.log('session 4');
  console.log(req.session);
  next();
});
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
