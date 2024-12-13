const createMember = async (req, res, next) => {
  console.log('members');
  const memberData = { ...req.body };
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

module.exports = { createMember };
