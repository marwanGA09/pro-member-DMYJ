const express = require('express');
const AppError = require('../utils/AppError');
const router = express.Router();

router.post('/signup', (req, res, next) => {
  console.log('1 - signup');
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
