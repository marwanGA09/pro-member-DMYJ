const express = require('express');

const memberController = require('../controller/memberController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.post('/', catchAsync(memberController.createMember));

router.get('/', catchAsync(memberController.getMember));

module.exports = router;
