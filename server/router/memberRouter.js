const express = require('express');
const multer = require('multer');
const { memberStorage } = require('./../utils/Cloudinary');
const memberController = require('../controller/memberController');
const catchAsync = require('../utils/catchAsync');
const memberSchema = require('../model/memberModel');

const router = express.Router();

const uploadMember = multer({ storage: memberStorage });

router.post(
  '/',
  uploadMember.single('profileImage'), // Ensure profileImage is uploaded
  memberSchema,
  catchAsync(memberController.createMember)
);

router.get('/', catchAsync(memberController.getAllMembers));

router.get('/:id', catchAsync(memberController.getMember));

module.exports = router;
