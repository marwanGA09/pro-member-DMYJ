const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const monthlyPayment = async (req, res, next) => {
  const payments = await prisma.monthlyPayment.findMany({
    where: {
      year: parseInt(req.query.pyear) || new Date().getFullYear(),
    },
    select: {
      month: true,
      member: {
        select: {
          membership_amount: true,
        },
      },
    },
  });

  // Group payments by month and calculate both sum and count
  const groupedPayments = payments.reduce((acc, payment) => {
    const { month, member } = payment;
    const membershipAmount = member?.membership_amount || 0;

    if (!acc[month]) {
      acc[month] = {
        totalMembershipAmount: 0,
        count: 0,
      };
    }

    acc[month].totalMembershipAmount += membershipAmount;
    acc[month].count += 1;

    return acc;
  }, {});

  console.log(groupedPayments);
  const toString = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };
  // Convert grouped payments into an array for easier display (optional)
  const result = Object.entries(groupedPayments).map(([month, data]) => ({
    month: toString[month],
    totalMembershipAmount: data.totalMembershipAmount,
    count: data.count,
  }));

  console.log(result);

  return res.json({
    status: 200,
    message: 'report',
    data: result,
  });
};

const yearlyPayments = async (req, res, next) => {
  const payments = await prisma.monthlyPayment.findMany({
    select: {
      year: true,
      member: {
        select: {
          membership_amount: true,
        },
      },
    },
  });

  const groupedPayments = payments.reduce((acc, payment) => {
    const { year, member } = payment;
    const membershipAmount = member?.membership_amount || 0;

    if (!acc[year]) {
      acc[year] = {
        totalMembershipAmount: 0,
        count: 0,
      };
    }

    acc[year].totalMembershipAmount += membershipAmount;
    acc[year].count += 1;

    return acc;
  }, {});

  const result = Object.entries(groupedPayments).map(([year, data]) => ({
    year,
    totalMembershipAmount: data.totalMembershipAmount,
    count: data.count,
  }));

  const membershipAmountGrouped =
    await prisma.groupedMembershipAmounts.findMany();

  console.log('some', membershipAmountGrouped);
  return res.json({
    status: 200,
    message: 'report',
    data: result,
  });
};
module.exports = { monthlyPayment, yearlyPayments };
