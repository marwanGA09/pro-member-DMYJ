const { checkSchema } = require('express-validator');

const userSchema = checkSchema({
  first_name: {
    notEmpty: true,
    errorMessage: 'First name is required',
  },
  middle_name: {
    notEmpty: true,
    errorMessage: 'Middle name is required',
  },
  last_name: {
    notEmpty: true,
    errorMessage: 'Last name is required',
  },
  email: {
    isEmail: true,
    errorMessage: 'Please enter a valid email address',
  },
  sector: {
    isIn: {
      options: [['economy', 'academy', 'social', "daw'a"]],
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
