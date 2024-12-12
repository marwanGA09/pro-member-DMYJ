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

const authController = require('../controller/authController');

const router = express.Router();

const { PrismaClient } = require('@prisma/client');
// const _ = require('../controller/errorController');
const prisma = new PrismaClient();

router.post(
  '/signup',
  // userSchema,
  catchAsync(authController.signUp)
);

router.post('/login', loginSchema, catchAsync(authController.login));

router.get('/logout', authController.logOut);

module.exports = router;
