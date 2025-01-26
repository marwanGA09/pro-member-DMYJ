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

  // console.log(groupedPayments);
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

  // console.log(result);

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

  return res.json({
    status: 200,
    message: 'report',
    data: result,
  });
};

const membersReport = async (req, res, next) => {
  const groupedByMembershipAmount = await prisma.$queryRaw`
  SELECT 
    CASE
      WHEN membership_amount >= 10 AND membership_amount < 20 THEN '10-20'
      WHEN membership_amount >= 20 AND membership_amount < 30 THEN '20-30'
      WHEN membership_amount >= 30 AND membership_amount < 40 THEN '30-40'
      WHEN membership_amount >= 40 AND membership_amount < 50 THEN '40-50'
      WHEN membership_amount >= 50 AND membership_amount < 100 THEN '50-100'
      WHEN membership_amount >= 100 AND membership_amount < 200 THEN '100-200'
      WHEN membership_amount >= 200 AND membership_amount < 500 THEN '200-500'
      WHEN membership_amount >= 500 AND membership_amount < 1000 THEN '500-1000'
      ELSE '1000+'
    END AS range,
    CASE
      WHEN membership_amount >= 10 AND membership_amount < 20 THEN 'A'
      WHEN membership_amount >= 20 AND membership_amount < 30 THEN 'B'
      WHEN membership_amount >= 30 AND membership_amount < 40 THEN 'C'
      WHEN membership_amount >= 40 AND membership_amount < 50 THEN 'E'
      WHEN membership_amount >= 50 AND membership_amount < 100 THEN 'F'
      WHEN membership_amount >= 100 AND membership_amount < 200 THEN 'G'
      WHEN membership_amount >= 200 AND membership_amount < 500 THEN 'H'
      WHEN membership_amount >= 500 AND membership_amount < 1000 THEN 'I'
      ELSE 'J'
    END AS label,
    COUNT(*) AS count
  FROM "Member"
  GROUP BY 
    range, 
    label
  ORDER BY 
    label;
`;

  const formattedResult = groupedByMembershipAmount.map((row) => ({
    range: row.range,
    count: Number(row.count),
  }));

  // console.log(formattedResult);
  return res.json({
    status: 200,
    message: 'Member report on Pro amount',
    data: formattedResult,
  });
};

const membersSexReport = async (req, res, next) => {
  const sexReport = await prisma.member.groupBy({
    by: ['sex'],
    _count: true,
  });

  return res.json({
    status: 200,
    message: 'Member sex report',
    data: sexReport,
  });
};

module.exports = {
  monthlyPayment,
  yearlyPayments,
  membersReport,
  membersSexReport,
};
