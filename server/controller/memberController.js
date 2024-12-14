const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createMember = async (req, res, next) => {
  console.log('req body', req.body);
  const memberData = {
    full_name: req.body.fullName,
    sex: req.body.sex,
    book_number: req.body.bookNumber,
    profession: req.body.profession,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    date_of_birth: req.body.dateOfBirth,
    membership_amount: req.body.membershipAmount,
    profile_image: req.body.profileImage,
    signed_date: req.body.signedDate,
    note: req.body.note,
    created_by: req.body.createdBy,
  };
  console.log('user input', memberData);
  const member = await prisma.member.create({
    data: memberData,
  });
  console.log('created member', member);
  return res.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
};

const getMember = async (req, res, next) => {
  console.log('req.query', req.query);
  console.log('getMember');

  // const members = await prisma.member.findMany({});
  // console.log(members);
  return res.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
};

module.exports = { createMember, getMember };
