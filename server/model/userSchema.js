const { checkSchema } = require('express-validator');

const userSchema = checkSchema({
  username: {
    notEmpty: true,
    errorMessage: 'username is required',
  },
  firstName: {
    notEmpty: true,
    errorMessage: 'First name is required',
  },
  middleName: {
    notEmpty: true,
    errorMessage: 'Middle name is required',
  },
  lastName: {
    notEmpty: true,
    errorMessage: 'Last name is required',
  },
  email: {
    isEmail: true,
    errorMessage: 'Please enter a valid email address',
  },
  sector: {
    isIn: {
      options: [
        ['economy', 'academy', 'social', 'dawah', 'management', 'other'],
      ],
      errorMessage:
        "Sector must be one of the following: economy, academy, social, daw'a",
    },
  },

  password: {
    isLength: { options: { min: 8 } },
    errorMessage: 'Password must be at least 8 characters long',
    trim: true,
  },
  confirmPassword: {
    custom: {
      options: (values, { req }) => {
        // const unique_values = new Set(values);
        if (values !== req.body.password) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
    },
    errorMessage: `confirm password correctly `,
  },
});

module.exports = { userSchema };
