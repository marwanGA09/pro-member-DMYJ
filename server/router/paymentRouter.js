const express = require('express');

const paymentController = require('../controller/paymentController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.post('/', catchAsync(paymentController.createPayment));
router.get('/', catchAsync(paymentController.getAllPayments));

module.exports = router;
