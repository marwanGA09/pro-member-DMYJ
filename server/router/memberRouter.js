const express = require('express');
const multer = require('multer');
const path = require('path');
const memberController = require('../controller/memberController');
const catchAsync = require('../utils/catchAsync');
const memberSchema = require('../model/memberModel');
const router = express.Router();

// const uploadMember = multer({ dest: '../MembersFile' });

router.post(
  '/',
  memberSchema,
  catchAsync(async (req, res, next) => {
    console.log('Uploaded File:', req.file); // Cloudinary file details
    const imageUrl = req.file; // Cloudinary URL
    const memberData = {
      ...req.body,
      profileImage: imageUrl, // Add Cloudinary URL to the member data
    };
    console.log(memberData);

    res.status(201).json({ message: 'Member created successfully' });
  })
);
// router.post(
//   '/',
//   (req, res, next) => {
//     console.log('Request Body:', req.body);
//     console.log('Request File:', req.file);
//     next();
//   },
//   memberSchema,
//   // uploadMember.single('profileImage'), // Ensure profileImage is uploaded
//   (req, res, next) => {
//     // Handle req.body based on file presence
//     console.log('Request Body after:', req.body);
//     console.log('Request File after:', req.file);

//     next();
//   },
//   // Validate using member schema
//   catchAsync(memberController.createMember)
// );

router.get('/', catchAsync(memberController.getAllMembers));

router.get('/:id', catchAsync(memberController.getMember));

module.exports = router;

// const diskStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // /home/ademk/repos/pro-member/server/MembersFile/Images
//     console.log(path.join(__dirname, '../MembersFile/Images'));
//     cb(null, path.join(__dirname, '../MembersFile/Images'));
//   },
//   filename: (req, file, cb) => {
//     console.log('file from diskstorage', file);
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// Check if the directory exists, create it if not

// const fs = require('fs');
// const uploadPath = path.join(__dirname, '../MembersFile/Images');
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }
