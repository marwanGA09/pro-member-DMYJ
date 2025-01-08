const express = require('express');
const multer = require('multer');
const { storage } = require('./../utils/Cloudinary');

const memberController = require('../controller/memberController');
const catchAsync = require('../utils/catchAsync');
const memberSchema = require('../model/memberModel');
const router = express.Router();

const uploadMember = multer({ storage });

router.post(
  '/',
  uploadMember.single('profileImage'), // Ensure profileImage is uploaded

  memberSchema,

  // Validate using member schema
  catchAsync(memberController.createMember)
);

router.get('/', catchAsync(memberController.getAllMembers));

router.get('/:id', catchAsync(memberController.getMember));

module.exports = router;
