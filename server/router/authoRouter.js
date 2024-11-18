const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const pool = require('../utils/pool');
const catchAsync = require('../utils/catchAsync');
const { hashText, compareHashedText } = require('./../utils/hashing');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

// **************************
const LocalStrategy = require('passport-local');

async function verifyingFunction(username, password, done) {
  console.log('IIIIIIIIIIIIIIIIIII');
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    console.log('result.rows', result.rows);
    if (!result.rows.length) {
      return done(null, false, { message: 'User not found' });
    }

    const isValid = await compareHashedText(result.rows[0].password, password);
    if (!isValid) {
      return done(null, false, { message: 'Invalid username or password' });
    }

    return done(null, result.rows[0]);
  } catch (e) {
    return done(e);
  }
}

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

const Strategy = new LocalStrategy(verifyingFunction);
passport.use(Strategy);
// module.exports = Strategy;

// **************************

const userSchema = checkSchema({
  first_name: {
    notEmpty: true,
    errorMessage: 'First name is required',
  },
  middle_name: {
    notEmpty: true,
    errorMessage: 'Middle name is required',
  },
  last_name: {
    notEmpty: true,
    errorMessage: 'Last name is required',
  },
  email: {
    isEmail: true,
    errorMessage: 'Please enter a valid email address',
  },
  sector: {
    isIn: {
      options: [['economy', 'academy', 'social', "daw'a"]],
      errorMessage:
        "Sector must be one of the following: economy, academy, social, daw'a",
    },
  },

  password: {
    isLength: { options: { min: 8 } },
    errorMessage: 'Password must be at least 8 characters long',
    trim: true,
  },
  confirmPassword: {
    custom: {
      options: (values, { req }) => {
        // const unique_values = new Set(values);
        if (values !== req.body.password) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
    },
    errorMessage: `confirm password correctly `,
  },
});
const loginSchema = checkSchema({
  // email: {
  //   isEmail: true,
  //   errorMessage: 'Please enter a valid email address',
  // },

  username: {
    notEmpty: true,
    errorMessage: 'username is required',
  },

  password: {
    isLength: { options: { min: 8 } },
    errorMessage: 'Password must be at least 8 characters long',
    trim: true,
  },
});

router.post(
  '/signup',
  userSchema,
  catchAsync(async (req, res, next) => {
    console.log('1 - signup');
    const errors = validationResult(req);

    // INSERT INTO DB

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: 'invalid data format',
      });
    }

    const hashedPassword = await hashText(req.body.password);
    const { confirmPassword, ...userData } = {
      ...req.body,
      password: hashedPassword,
    };
    // console.log('hashedPassword', hashedPassword);
    // console.log('password', req.body.password);
    console.log(userData, confirmPassword);
    console.log([...Object.values(userData)]);
    compareHashedText(hashedPassword, req.body.password);
    await pool.query(
      'INSERT INTO users (first_name,middle_name,last_name,username,date_of_birth,password,sector,role,email,phonenumber) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10)',
      [...Object.values(userData)]
    );

    return res.status(200).json({
      status: 'success',
      message: 'User successfully registered',
    });
  })
);

router.post(
  '/login',
  loginSchema,
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
  }),
  async (req, res, next) => {
    console.log('2 - login');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const customError = errors.array();
      console.log(customError);
      return next(new AppError(customError, 500));
    }

    const { username, password: userPassword } = req.body;
    const q = `SELECT username, password FROM users WHERE username = $1`;
    const result = await pool.query(q, [username]);
    if (
      !result.rows.length ||
      !compareHashedText(result.rows[0].password, userPassword)
    ) {
      return next(new AppError('Invalid username or password', 401));
    }

    return res.status(200).json({
      status: 'success',
      message: 'User successfully logged in',
    });
  }
);

module.exports = router;
