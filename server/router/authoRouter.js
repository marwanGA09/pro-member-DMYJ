const express = require('express');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const AppError = require('../utils/AppError');
const pool = require('../utils/pool');
const catchAsync = require('../utils/catchAsync');
const { hashText, compareHashedText } = require('./../utils/hashing');
const { loginSchema } = require('./../model/loginSchema');
const { userSchema } = require('./../model/userSchema');
const { addToken } = require('./../utils/blacklistToken');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
// const _ = require('../controller/errorController');
const prisma = new PrismaClient();

router.post(
  '/signup',
  // userSchema,
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

    // userData = {
    //   ...userData,

    //   sector: userData.sector || '',
    // };

    console.log(userData);

    const currentUser = await prisma.users.create({
      data: userData,
    });
    console.log('currentUser', currentUser);
    // await pool.query(
    //   'INSERT INTO users (first_name,middle_name,last_name,username,email,sector,password,phonenumber,date_of_birth,role) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10)',
    //   [...Object.values(userData)]
    // );

    return res.status(200).json({
      user: currentUser,
      status: 'success',
      message: 'User successfully registered',
    });
  })
);

router.post(
  '/login',
  loginSchema,
  catchAsync(async (req, res, next) => {
    console.log('login-1');
    // NOTE login schema
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: 'invalid data format',
      });
    }

    const { username, password } = req.body;
    console.log(username, password);
    // NOTE check in database
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (
      !user.rows.length ||
      !(await compareHashedText(user.rows[0].password, password))
    ) {
      return res
        .status(401)
        .json({ message: 'Incorrect username or password' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    // NOTE Study about sending token with cookies
    // res.cookie('jwt', token, { expires: new Date(Date.now() + process.env.JWT_EXPIRATION), httpOnly: true });
    return res.status(200).json({
      status: 'success',
      message: 'User successfully logged in',
      token,
      user: user.rows[0],
    });

    // passport.authenticate('local', (err, user, info) => {
    //   console.log('login-2');
    //   if (err) return next(err);
    //   if (!user) return res.status(401).json({ message: info.message });
    //   // console.log(user);
    //   const { password, ...loggedInUser } = user;
    //   // console.log('login', loggedInUser);
    //   // console.log('login', password);
    //   req.logIn(user, (loginErr) => {
    //     console.log('login-3');
    //     if (loginErr) return next(loginErr);
    //     return res.status(200).json({
    //       status: 'success',
    //       message: 'User successfully logged in',
    //       user: loggedInUser,
    //     });
    //   });
    // });
    // # i FIXed this part
    // })(req, res, next);
  })
);

router.get('/logout', (req, res, next) => {
  // req.logout((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   console.log('logout completed', req.session);
  //   res.status(200).json({
  //     status: 'success',
  //     message: 'User successfully logged out',
  //   });
  // });
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];
  if (!header || !token) {
    return next(
      new AppError(
        'You are not logged in, please logged in first to logout',
        401
      )
    );
  }
  addToken(token);
  res.status(200).json({
    status: 'success',
    message: 'User successfully logged out',
  });
});

module.exports = router;
