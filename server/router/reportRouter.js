const express = require('express');
const {
  monthlyPayment,
  yearlyPayments,
} = require('../controller/reportController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.get('/monthlyPayments', catchAsync(monthlyPayment));
router.get('/yearlyPayments', catchAsync(yearlyPayments));

module.exports = router;
