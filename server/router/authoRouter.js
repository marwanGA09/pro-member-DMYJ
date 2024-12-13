const express = require('express');

const catchAsync = require('../utils/catchAsync');
const { loginSchema } = require('./../model/loginSchema');
const { userSchema } = require('./../model/userSchema');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', userSchema, catchAsync(authController.signUp));

router.post('/login', loginSchema, catchAsync(authController.login));

router.get('/logout', authController.logOut);

module.exports = router;
