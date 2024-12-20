const { checkSchema } = require('express-validator');

const memberSchema = checkSchema({
  fullName: {
    notEmpty: {
      errorMessage: 'Full name is required',
    },
    isLength: {
      options: { max: 150 },
      errorMessage: 'Full name must not exceed 150 characters',
    },
  },

  sex: {
    optional: true,
    isIn: {
      options: [['male', 'female']],
      errorMessage: 'Sex must be one of: Male or Female',
    },
  },

  bookNumber: {
    notEmpty: {
      errorMessage: 'Book number is required',
    },
    isAlphanumeric: {
      errorMessage: 'Book number must contain only letters and numbers',
    },
  },

  profession: {
    optional: true,
    isLength: {
      options: { max: 80 },
      errorMessage: 'Profession must not exceed 80 characters',
    },
  },

  phone: {
    notEmpty: {
      errorMessage: 'Phone number is required',
    },
    isMobilePhone: {
      errorMessage: 'Phone number must be valid',
    },
  },

  address: {
    notEmpty: {
      errorMessage: 'Address is required',
    },
    isLength: {
      options: { max: 250 },
      errorMessage: 'Address must not exceed 250 characters',
    },
  },

  email: {
    optional: true,
    isEmail: {
      errorMessage: 'Email must be valid',
    },
  },

  dateOfBirth: {
    optional: true,
    isISO8601: {
      errorMessage: 'Date of birth must be a valid date',
    },
  },

  membershipAmount: {
    notEmpty: {
      errorMessage: 'Membership amount is required',
    },
    isInt: {
      options: { min: 10 },
      errorMessage: 'Membership amount must be a greater than 10',
    },
  },

  profileImage: {
    optional: true,
    // isURL: {
    //   errorMessage: 'Profile image must be a valid URL',
    // },
  },

  signedDate: {
    optional: true,
    isISO8601: {
      errorMessage: 'Signed date must be a valid date',
    },
  },

  note: {
    optional: true,
    isLength: {
      options: { max: 500 },
      errorMessage: 'Note must not exceed 500 characters',
    },
  },

  createdBy: {
    notEmpty: {
      errorMessage: 'Created by is required',
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Created by must be a positive integer',
    },
  },
});

module.exports = memberSchema;
