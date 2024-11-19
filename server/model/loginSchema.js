const { checkSchema } = require('express-validator');

const loginSchema = checkSchema({
  // email: {
  //   isEmail: true,
  //   errorMessage: 'Please enter a valid email address',
  // },

  username: {
    notEmpty: true,
    errorMessage: 'username is required',
  },

  password: {
    isLength: { options: { min: 8 } },
    errorMessage: 'Password must be at least 8 characters long',
    trim: true,
  },
});

module.exports = { loginSchema };
