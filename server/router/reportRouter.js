const express = require('express');
const {
  monthlyPayment,
  yearlyPayments,
  membersReport,
  membersSexReport,
} = require('../controller/reportController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.get('/monthlyPayments', catchAsync(monthlyPayment));
router.get('/yearlyPayments', catchAsync(yearlyPayments));
router.get('/memberReport', catchAsync(membersReport));
router.get('/memberSexReport', catchAsync(membersSexReport));

module.exports = router;
