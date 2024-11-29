const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const isAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];
  if (!header || !token) {
    return next(
      new AppError('You are not logged in, please logged in first', 401)
    );
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new AppError('Invalid token, please login again', 401));
    }
    console.log('decoded', decoded);
    req.user = decoded.id;
    next();
  });
};

module.exports = { isAuth };
