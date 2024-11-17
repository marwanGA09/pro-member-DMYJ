const express = require('express');
const bcrypt = require('bcrypt');
const { checkSchema, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const pool = require('../utils/pool');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

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
});
const loginSchema = checkSchema({
  email: {
    isEmail: true,
    errorMessage: 'Please enter a valid email address',
  },

  password: {
    isLength: { options: { min: 8 } },
    errorMessage: 'Password must be at least 8 characters long',
    trim: true,
  },
});

async function hashText(text) {
  return await bcrypt.hash(text, 11);
}

async function compareHashedText(hashText, text) {
  const result = await bcrypt.compare(text, hashText);
  console.log('result compare', result);
  return result;
}
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
    const userData = { ...req.body, password: hashedPassword };
    console.log('hashedPassword', hashedPassword);
    console.log('password', req.body.password);

    compareHashedText(hashedPassword, req.body.password);
    // await pool.query(
    //   'INSERT INTO users (first_name,middle_name,last_name,username,date_of_birth,password,sector,role,email,phonenumber) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10)',
    //   [...Object.values(userData)]
    // );

    return res.status(200).json({
      status: 'success',
      message: 'User successfully registered',
    });
  })
);

router.post('/login', loginSchema, async (req, res, next) => {
  console.log('2 - login');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const customError = errors.array();
    console.log(customError);
    return next(new AppError(customError, 500));
  }

  const { email, password: userPassword } = req.body;
  const q = `SELECT email, password FROM users WHERE email = $1`;
  const result = await pool.query(q, [email]);
  console.log('lkjaklsjfkl', result.rows[0].password, userPassword);
  if (
    !result.rows.length ||
    !compareHashedText(result.rows[0].password, userPassword)
  ) {
    return next(new AppError('Invalid email or password', 401));
  }

  return res.status(200).json({
    status: 'success',
    message: 'User successfully logged in',
  });
});

module.exports = router;
