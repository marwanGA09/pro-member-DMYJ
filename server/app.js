const express = require('express');
const morgan = require('morgan');
const expressSession = require('express-session');
const PgStore = require('connect-pg-simple')(expressSession);
const passport = require('passport');

const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController');
const authRouter = require('./router/authoRouter');
const pool = require('./utils/pool');
const { isAuth } = require('./router/authentication');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', (req, res, next) => {
  console.log('session before');
  console.log(req.session);
  next();
});

app.use(
  expressSession({
    store: new PgStore({
      pool: pool,
      tableName: 'user_sessions',
    }),
    secret: 'here is my screet word i use',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.authenticate('session'));

app.use('/', (req, res, next) => {
  console.log('session after');
  console.log(req.session);
  next();
});

app.get('/home', (req, res, next) => {
  res.send('hello wold from home');
});
app.get('/v1/protected-route', isAuth, (req, res, next) => {
  console.log('This is protected route');
  res.send('This is protected route');
});

app.use('/v1', authRouter);

app.all('*', (req, res, next) => {
  return next(new AppError(`Invalid route ${req.url}`, 400));
});

app.use(errorController);

module.exports = app;
