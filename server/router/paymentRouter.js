const express = require('express');

const paymentController = require('../controller/paymentController');
const catchAsync = require('../utils/catchAsync');
const monthlyPaymentSchema = require('../model/paymentSchema');
const { authorized } = require('../controller/authController');
const router = express.Router();

router.post(
  '/',
  monthlyPaymentSchema,
  catchAsync(paymentController.createPayment)
);
router.get('/', catchAsync(paymentController.getAllPayments));

module.exports = router;
