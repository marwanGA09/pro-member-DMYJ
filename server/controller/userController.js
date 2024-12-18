const { PrismaClient } = require('@prisma/client');
const PrismaAPIFeatures = require('../utils/APIfeature.js');

const prisma = new PrismaClient();

const getAllUsers = async (req, res, next) => {
  const features = new PrismaAPIFeatures(req.query)
    .filter(['first_name', 'last_name', 'middle_name'])
    .sort()
    .limitFields()
    .paginate();
  const prismaQueryOption = features.build();

  console.log(JSON.stringify(prismaQueryOption, null, 2));

  const users = await prisma.user.findMany(prismaQueryOption);
  // IMPORTANT REMOVE PRIVATE DATA
  users.forEach((user) => {
    delete user.password;
  });

  console.log(users);
  const totalUsers = await prisma.user.count(features.query);
  return res.status(200).json({
    status: 'success',
    result: users.length,
    totalUsers,
    currentPage: +req.query.page || 1,
    data: users,
  });
};

const getUser = async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'user is fetched successfully',
  });
};

module.exports = { getAllUsers, getUser };
