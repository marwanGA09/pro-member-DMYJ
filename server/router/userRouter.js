const express = require('express');

const userController = require('../controller/userController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.get('/', catchAsync(userController.getAllUsers));

router.get('/:id', catchAsync(userController.getUser));

module.exports = router;
