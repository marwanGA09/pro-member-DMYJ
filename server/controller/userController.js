const { PrismaClient } = require('@prisma/client');
const PrismaAPIFeatures = require('../utils/APIfeature.js');
const cloudinary = require('cloudinary').v2;

const prisma = new PrismaClient();

const getAllUsers = async (req, res, next) => {
  const features = new PrismaAPIFeatures(req.query)
    .filter(['first_name', 'last_name', 'middle_name'])
    .sort()
    .limitFields()
    .paginate();
  const prismaQueryOption = features.build();

  const users = await prisma.user.findMany({
    ...prismaQueryOption,
    include: {
      members: true,
      payments: true,
    },
  });

  console.log({
    ...prismaQueryOption,
    include: {
      members: true,
      payments: true,
    },
  });

  // IMPORTANT REMOVE PRIVATE DATA
  users.forEach((user) => {
    delete user.password;
  });

  const userWithCountedMembers = users.map((user) => {
    return {
      ...user,
      members: user.members.length,
      payments: user.payments.length,
    };
  });

  const totalUsers = await prisma.user.count(features.query);
  return res.status(200).json({
    status: 'success',
    result: users.length,
    totalUsers,
    currentPage: +req.query.page || 1,
    data: userWithCountedMembers,
  });
};

const getUser = async (req, res, next) => {
  // console.log('getMember');
  const id = parseInt(req.params.id);

  let user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      members: true,
      payments: true,
    },
  });

  if (user) {
    user.password = undefined;
    user = {
      ...user,
      members: user.members.length,
      payments: user.payments.length,
    };
  }
  // console.log(member);
  return res.status(200).json({
    status: 'success',
    message: user ? 'get user successfully' : `There is no user with ${id} id:`,
    data: user,
  });
};

// id
// username
// password
// createdAt
// updatedAt
// members
// payments

const fieldCantBeUpdated = [
  'id',
  'username',
  'password',
  'createdAt',
  // 'updatedAt',
  'members',
  'payments',
];

//
// profileUrl;
// first_name;
// middle_name;
// last_name;
// date_of_birth;
// email;
// sector;
// role;
// phone_number;
// sex;
const updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id);

  let oldUserData = await prisma.user.findUnique({
    where: { id: id },
  });
  // console.log('old user image puplic id \n ', oldUserData.profileUrl);
  // console.log({ oldUserData });

  // configure your cloudinary instance
  if (oldUserData.profileUrl) {
    cloudinary.uploader.destroy(
      oldUserData.profileUrl,
      function (error, result) {
        console.log('remove old image from cloudinary');
        console.log(result, error);
      }
    );
  }

  console.log('req.body\n', req.body);
  const updatedUserData = { ...req.body };
  updatedUserData.profileUrl = req?.file?.filename;

  fieldCantBeUpdated.forEach((field) => delete updatedUserData[field]);
  console.log({ updatedUserData });
  // let
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: updatedUserData,
  });
  delete updatedUser.password;
  console.log({ id });
  console.log({ updateUser });
  return res.status(200).json({
    status: 'success',
    message: 'update message',
    user: updatedUser,
  });
};
module.exports = { getAllUsers, getUser, updateUser };
