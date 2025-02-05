const express = require('express');

const userController = require('../controller/userController');
const authController = require('./../controller/authController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.get(
  '/',
  authController.authorized('admin'),
  catchAsync(userController.getAllUsers)
);

router.get('/:id', catchAsync(userController.getUser));

module.exports = router;
