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

  user.password = undefined;
  user = {
    ...user,
    members: user.members.length,
    payments: user.payments.length,
  };
  // console.log(member);
  return res.status(200).json({
    status: 'success',
    message: user ? 'get user successfully' : `There is no user with ${id} id:`,
    data: user,
  });
};

module.exports = { getAllUsers, getUser };
