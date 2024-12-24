const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const memberController = require('../controller/memberController');
const catchAsync = require('../utils/catchAsync');
const memberSchema = require('../model/memberModel');
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'members/photo', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed image formats
    public_id: (req, file) =>
      `${req.body.fullName.split(' ').join('-')}-${Math.floor(
        Math.random() * 1000
      )}`,
    transformation: [
      { quality: '70' }, // Resize and compress
    ],
  },
});

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
