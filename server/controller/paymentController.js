const { PrismaClient } = require('@prisma/client');
const PrismaAPIFeatures = require('../utils/APIfeature.js');
const { v4 } = require('uuid');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const createPayment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'invalid data format',
    });
  }

  console.log(req.body);

  const payments = [];
  const uuid = v4();
  console.log(uuid);
  req.body.monthCovered.forEach((month) => {
    payments.push({
      uuid,

      month: month,
      year: req.body.year,
      payment_method: req.body.paymentMethod,
      member_id: req.body.memberId,
      user_id: req.body.userId,
    });
  });

  // const paymentData = {
  //   monthly_amount: req.body.monthlyAmount,
  //   total_amount: req.body.totalAmount,
  //   month_covered: req.body.monthCovered,
  //   year: req.body.year,
  //   payment_method: req.body.paymentMethod,
  //   member_id: req.body.memberId,
  //   user_id: req.body.userId,
  // };

  const monthlyPayment = await prisma.monthlyPayment.createMany({
    data: payments,
  });
  console.log('monthlyPayment', monthlyPayment);
  return res.status(201).json({
    data: monthlyPayment,
    status: 'success',
    message: 'payments created successfully',
  });
};
// const createPayment = async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//       message: 'invalid data format',
//     });
//   }

//   console.log(req.body);

//   const paymentData = {
//     monthly_amount: req.body.monthlyAmount,
//     total_amount: req.body.totalAmount,
//     month_covered: req.body.monthCovered,
//     year: req.body.year,
//     payment_method: req.body.paymentMethod,
//     member_id: req.body.memberId,
//     user_id: req.body.userId,
//   };

//   const oldPayment = await prisma.monthlyPayment.findMany({
//     where: {
//       year: paymentData.year,
//       member_id: paymentData.member_id,
//     },
//     select: {
//       month_covered: true,
//     },
//   });

//   const allMonthsCovered = oldPayment
//     .map((payment) => payment.month_covered)
//     .flat();

//   const foundItems = allMonthsCovered.filter((item) =>
//     paymentData.month_covered.includes(item)
//   );

//   if (foundItems.length > 0) {
//     return next(
//         `${foundItems.join(', ')} month are already payed for ${
//           paymentata.year
//         }`,
//         409
//       )
//     );
//   }

//   const monthlyPayment = await prisma.monthlyPayment.create({
//     data: paymentData,
//   });
//   console.log('monthlyPayment', monthlyPayment);
//   return res.status(201).json({
//     data: monthlyPayment,
//     status: 'success',
//     message: 'payments created successfully',
//   });
// };

const getAllPayments = async (req, res, next) => {
  const features = new PrismaAPIFeatures(req.query, [
    'monthly_amount',
    'year',
    'member_id',
    'user_id',
    'uuid',
    'month',
  ])
    .filter(['month'])
    .sort()
    .limitFields()
    .paginate();

  const prismaQueryOption = features.build();

  const payments = await prisma.monthlyPayment.findMany(prismaQueryOption);

  const totalPayments = await prisma.monthlyPayment.count(features.query);

  return res.status(200).json({
    status: 'success',
    result: payments.length,
    totalPayments,
    currentPage: +req.query.page || 1,
    data: payments,
  });
};

module.exports = { createPayment, getAllPayments };
