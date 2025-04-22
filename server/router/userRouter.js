const express = require('express');
const multer = require('multer');

const { storage } = require('./../utils/Cloudinary');
const userController = require('../controller/userController');
const authController = require('./../controller/authController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

const uploadedUser = multer({ storage });

router.get(
  '/',
  authController.authorized('admin'),
  catchAsync(userController.getAllUsers)
);

router.get('/:id', catchAsync(userController.getUser));

router.patch(
  '/:id',
  uploadedUser.single('profileUrl'),
  catchAsync(userController.updateUser)
);

module.exports = router;
