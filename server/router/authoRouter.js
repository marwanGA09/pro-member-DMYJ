const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const pool = require('../utils/pool');
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
    isLength: { option: { min: 8 } },
    errorMessage: 'Password must be at least 8 characters long',
    trim: true,
  },
});

router.post('/signup', userSchema, (req, res, next) => {
  console.log('1 - signup');
  const errors = validationResult(req);

  // INSERT INTO DB
  pool.query(
    'INSERT INTO users (first_name,middle_name,last_name,username,date_of_birth,password,sector,role,email,phonenumber) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10)',
    [...Object.values(req.body)]
  );
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
      message: 'invalid data format',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'User successfully registered',
  });
});

router.post('/login', (req, res, next) => {
  console.log('2 - login');
  return res.status(200).json({
    status: 'success',
    message: 'User successfully logged in',
  });
});

module.exports = router;
