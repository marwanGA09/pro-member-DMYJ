const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const AppError = require('../utils/AppError');
const { hashText, compareHashedText } = require('../utils/hashing');
const { addToken, isBlacklisted } = require('../utils/blacklistToken');

const prisma = new PrismaClient();

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log('signup');
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'invalid data format',
    });
  }

  const hashedPassword = await hashText(req.body.password);

  let endData = {
    username: req.body.username,
    first_name: req.body.firstName,
    middle_name: req.body.middleName,
    last_name: req.body.lastName,
    email: req.body.email,
    sector: req.body.sector,
    password: hashedPassword,
    phone_number: req.body.phoneNumber,
    date_of_birth: req.body.dateOfBirth,
    role: req.body.role,
  };

  // console.log('end data', endData);

  const currentUser = await prisma.user.create({
    data: endData,
  });
  // console.log('currentUser', currentUser);

  return res.status(201).json({
    user: currentUser,
    status: 'success',
    message: 'User successfully registered',
  });
};

const login = async (req, res, next) => {
  console.log('login-1');
  // NOTE login schema
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'invalid data format',
    });
  }

  const { username, password } = req.body;
  // console.log(password, username);
  // NOTE check in database
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  // console.log('user', user);

  if (!user || !(await compareHashedText(user.password, password))) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );

  const cookiesOption = {
    expiresIn: new Date(Date.now() + process.env.COOKIES_EXPIRATION),
    httpOnly: true,
  };

  if (process.env.NODE_ENV !== 'production') {
    cookiesOption.secure = true;
  }
  res.cookie('jwt', token, cookiesOption);

  // NOTE Study about sending token with cookies
  // res.cookie('jwt', token, { expires: new Date(Date.now() + process.env.JWT_EXPIRATION), httpOnly: true });
  return res.status(200).json({
    status: 'success',
    message: 'User successfully logged in',
    token,
    user: user,
  });
};

const logOut = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  if (!header || !token) {
    return next(
      new AppError(
        'You are not logged in, please logged in first to logout',
        401
      )
    );
  }

  addToken(token);
  res.status(200).json({
    status: 'success',
    message: 'User successfully logged out',
  });
};

const protected = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];
  if (!header || !token) {
    return next(
      new AppError('You are not logged in, please logged in first', 401)
    );
  }

  // console.log(header);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new AppError('Invalid or Expired token, please login again', 401)
      );
    }

    if (isBlacklisted(token)) {
      return next(new AppError('Token is invalid or logged out', 401));
    }

    console.log('decoded', decoded);
    req.user = decoded.id;

    // CHECK IF USER EXIST

    const currentUser = await prisma.user.findOne({ id: decoded.id });
    console.log('user', currentUser);
    req.user = currentUser;
    next();
  });
};

const authorized = (...roles) => {
  return (req, res, next) => {
    console.log('kl', roles.join(', '));
    console.log(req);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not authorized to access this route', 403)
      );
    }
    next();
  };
};

module.exports = {
  logOut,
  login,
  signUp,
  protected,
  authorized,
};
