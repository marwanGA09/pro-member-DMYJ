const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const PrismaAPIFeatures = require('../utils/APIfeature.js');

const prisma = new PrismaClient();

const createMember = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'invalid data format',
    });
  }

  const memberData = {
    full_name: req.body.fullName,
    sex: req.body.sex,
    book_number: req.body.bookNumber,
    profession: req.body.profession,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    date_of_birth: req.body.dateOfBirth,
    membership_amount: parseInt(req.body.membershipAmount),
    profile_image: req?.file?.filename,
    signed_date: req.body.signedDate,
    note: req.body.note,
    created_by: parseInt(req.body.createdBy),
  };
  console.log('user input', memberData);

  const member = await prisma.member.create({
    data: memberData,
  });
  // console.log('created member', member);
  return res.status(201).json({
    status: 'success',
    message: 'registered member successfully ',
    member,
  });
};

const getAllMembers = async (req, res, next) => {
  const features = new PrismaAPIFeatures(req.query, ['membership_amount'])
    .filter(['full_name'])
    .sort()
    .limitFields()
    .paginate();
  const prismaQueryOption = features.build();
  // console.log(JSON.stringify(prismaQueryOption, null, 2));

  const current = new Date();

  const members = await prisma.member.findMany({
    ...prismaQueryOption,
    include: {
      payments: {
        where: {
          month: parseInt(req.query.pmonth) || current.getMonth() + 1,
          year: parseInt(req.query.pyear) || current.getFullYear(),
        },
      },
    },
  });
  const totalMembers = await prisma.member.count(features.query);
  return res.status(200).json({
    status: 'success',
    result: members.length,
    totalMembers,
    currentPage: +req.query.page || 1,
    data: members,
  });
};

const getMember = async (req, res, next) => {
  // console.log('getMember');
  const id = parseInt(req.params.id);

  const member = await prisma.member.findUnique({
    where: { id: id },
    include: {
      payments: {
        where: {
          OR: [
            {
              year: new Date().getFullYear(),
            },
            {
              year: new Date().getFullYear() - 1,
            },
          ],
        },
        orderBy: [
          { year: 'desc' },
          {
            month: 'asc',
          },
        ],
      },
      user: {
        select: {
          first_name: true,
          middle_name: true,
          last_name: true,
          id: true,
        },
      },
    },
  });
  // console.log(member);
  return res.status(200).json({
    status: 'success',
    message: member
      ? 'get members successfully'
      : `There is no member with ${id} id:`,
    data: member,
  });
};

module.exports = { createMember, getMember, getAllMembers };
