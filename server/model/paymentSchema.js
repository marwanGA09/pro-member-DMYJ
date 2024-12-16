const { checkSchema } = require('express-validator');

const monthlyPaymentSchema = checkSchema({
  monthlyAmount: {
    isInt: {
      options: { min: 10 },
      errorMessage: 'Monthly amount must be a positive integer',
    },
    notEmpty: {
      errorMessage: 'Monthly amount is required',
    },
  },

  totalAmount: {
    isInt: {
      options: { min: 1 },
      errorMessage: 'Total amount must be a positive integer',
    },
    notEmpty: {
      errorMessage: 'Total amount is required',
    },
    custom: {
      options: (values, { req }) => {
        // const unique_values = new Set(values);
        if (+values !== req.body.monthlyAmount * req.body.monthCovered.length) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
      errorMessage: `total Payment amount is not equal to months paid for`,
    },
  },

  monthCovered: {
    isArray: {
      errorMessage: 'Month covered must be an array of integers',
    },
    custom: {
      options: (value) =>
        value.every(
          (item) => Number.isInteger(item) && item >= 1 && item <= 12
        ),
      errorMessage: 'Month covered array must only contain valid month',
    },
  },

  year: {
    isInt: {
      options: { min: 2020, max: new Date().getFullYear() + 2 },
      errorMessage:
        'Year must be a valid integer between 2020 and next two year',
    },
    notEmpty: {
      errorMessage: 'Year is required',
    },
  },

  memberId: {
    isInt: {
      options: { min: 1 },
      errorMessage: 'Member ID must be a positive integer',
    },
    notEmpty: {
      errorMessage: 'Member ID is required',
    },
  },

  paymentMethod: {
    isIn: {
      options: [['cash', 'bank_transfer', 'other']],
      errorMessage:
        'Payment method must be one of: cash, bank transfer or other',
    },
    notEmpty: {
      errorMessage: 'Payment method is required',
    },
  },

  userId: {
    isInt: {
      options: { min: 1 },
      errorMessage: 'User ID must be a positive integer',
    },
    notEmpty: {
      errorMessage: 'User ID is required',
    },
  },
});

module.exports = monthlyPaymentSchema;
