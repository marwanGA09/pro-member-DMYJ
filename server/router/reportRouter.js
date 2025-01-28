const express = require('express');
const reportController = require('../controller/reportController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.get('/monthlyPayments', catchAsync(reportController.monthlyPayment));
router.get('/yearlyPayments', catchAsync(reportController.yearlyPayments));
router.get('/memberReport', catchAsync(reportController.membersReport));
router.get('/memberSexReport', catchAsync(reportController.membersSexReport));

module.exports = router;
