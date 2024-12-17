const express = require('express');

const memberController = require('../controller/memberController');
const catchAsync = require('../utils/catchAsync');
const memberSchema = require('../model/memberModel');
const router = express.Router();

router.post('/', memberSchema, catchAsync(memberController.createMember));

router.get('/', catchAsync(memberController.getAllMembers));

router.get('/:id', catchAsync(memberController.getMember));

module.exports = router;
