const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('./../utils/passportConfig');
const LocalStrategy = require('passport-local');
const { checkSchema, validationResult } = require('express-validator');

const AppError = require('../utils/AppError');
const pool = require('../utils/pool');
const catchAsync = require('../utils/catchAsync');
const { hashText, compareHashedText } = require('./../utils/hashing');
const { loginSchema } = require('./../model/loginSchema');
const { userSchema } = require('./../model/userSchema');
const router = express.Router();

router.post(
  '/signup',
  userSchema,
  catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    console.log('signup');
    // INSERT INTO DB

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: 'invalid data format',
      });
    }

    const hashedPassword = await hashText(req.body.password);
    let { confirmPassword, ...userData } = {
      ...req.body,
      password: hashedPassword,
    };

    userData = {
      ...userData,
      date_of_birth: userData?.date_of_birth || new Date(),
      role: userData.role || 'user',

      sector: userData.sector || '',
    };

    console.log(userData);

    await pool.query(
      'INSERT INTO users (first_name,middle_name,last_name,username,email,sector,password,phonenumber,date_of_birth,role) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10)',
      [...Object.values(userData)]
    );

    return res.status(200).json({
      status: 'success',
      message: 'User successfully registered',
    });
  })
);

// router.post(
//   '/login',
//   loginSchema,
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//   }),
//   async (req, res, next) => {
//     console.log('login');
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const customError = errors.array();
//       return next(new AppError(customError, 500));
//     }

//     const { username, password: userPassword } = req.body;
//     const q = `SELECT username, password FROM users WHERE username = $1`;
//     const result = await pool.query(q, [username]);
//     if (
//       !result.rows.length ||
//       !compareHashedText(result.rows[0].password, userPassword)
//     ) {
//       return next(new AppError('Invalid username or password', 401));
//     }

//     return res.status(200).json({
//       status: 'success',
//       message: 'User successfully logged in',
//     });
//   }
// );

router.post('/local', loginSchema, (req, res, next) => {
  console.log('login-1');
  passport.authenticate('local', (err, user, info) => {
    console.log('login-2');
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    req.logIn(user, (loginErr) => {
      console.log('login-3');
      if (loginErr) return next(loginErr);
      return res.status(200).json({
        status: 'success',
        message: 'User successfully logged in',
      });
    });
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log('logout completed', req.session);
    res.redirect('/home');
  });
});

module.exports = router;
