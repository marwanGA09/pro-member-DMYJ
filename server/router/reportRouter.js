const express = require('express');
const { monthlyPayment } = require('../controller/reportController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.get('/monthlyPayments', catchAsync(monthlyPayment));

module.exports = router;
