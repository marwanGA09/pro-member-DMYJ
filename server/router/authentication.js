const AppError = require('../utils/AppError');

const isAuth = (req, res, next) => {
  // console.log('is auth', req.session);
  if (req.session.passport) {
    next();
  } else {
    return next(new AppError('First login to access to this router'));
  }
};

module.exports = { isAuth };
