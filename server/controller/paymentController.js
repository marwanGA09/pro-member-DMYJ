const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const createPayment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
      message: 'invalid data format',
    });
  }

  console.log(req.body);

  const paymentData = {
    monthly_amount: req.body.monthlyAmount,
    total_amount: req.body.totalAmount,
    month_covered: req.body.monthCovered,
    year: req.body.year,
    payment_method: req.body.paymentMethod,
    member_id: req.body.memberId,
    user_id: req.body.userId,
  };

  if (
    +paymentData.total_amount !==
    paymentData.month_covered.length * paymentData.monthly_amount
  ) {
    return next(
      new AppError('total Payment amount is not equal to months paid for')
    );
  }

  const monthlyPayment = await prisma.monthlyPayment.create({
    data: paymentData,
  });
  console.log('monthlyPayment', monthlyPayment);
  return res.status(200).json({
    status: 'success',
    message: 'payments created successfully',
  });
};

const getAllPayments = async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'payments fetched successfully',
  });
};

module.exports = { createPayment, getAllPayments };
