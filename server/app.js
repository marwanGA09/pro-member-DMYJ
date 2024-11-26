const express = require('express');
const morgan = require('morgan');
const expressSession = require('express-session');
const PgStore = require('connect-pg-simple')(expressSession);
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');

const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController');
const authRouter = require('./router/authoRouter');
const pool = require('./utils/pool');
const { isAuth } = require('./router/authentication');

const DEPLOYMENT_URL = '';
const app = express();
dotenv.config();
app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: DEPLOYMENT_URL }));
} else {
  app.use(cors());
}
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
      tableName: process.env.SESSION_TABLE_NAME,
    }),
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: parseInt(process.env.SESSION_MAX_AGE) },
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
