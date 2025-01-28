const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { promisify } = require('util');
const AppError = require('../utils/AppError');
const { hashText, compareHashedText } = require('../utils/hashing');

const catchAsync = require('../utils/catchAsync');

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
    expires: new Date(Date.now() + parseInt(process.env.COOKIES_EXPIRATION)),
    // expires: new Date(Date.now() + 10000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
  };

  // if (process.env.NODE_ENV === 'production') {
  //   cookiesOption.secure = true;
  //   cookiesOption.sameSite = 'None';
  // }
  console.log({ cookiesOption });
  // console.log()
  res.cookie('jwt', token, cookiesOption);

  user.password = undefined;

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
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('header');
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    console.log('req.cookes');
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in! please logged in first to logout.',
        401
      )
    );
  }

  const cookiesOption = {
    //  expires: new Date(Date.now() + parseInt(process.env.COOKIES_EXPIRATION)),
    expires: new Date(Date.now() + 10),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
  };

  res.cookie('jwt', token, cookiesOption);

  res.status(200).json({
    status: 'success',
    message: 'User successfully logged out',
  });
};

const protected = catchAsync(async (req, res, next) => {
  //

  // NOTE LEFT HEADER CODE INTENTIONALLY WHILE I SENT TOKEN THROUGH COOKIES
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('header');
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    console.log('req.cookes');
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  console.log('decoded', decoded);

  // CHECK IF USER EXIST

  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!currentUser) {
    return next(new AppError('User not found', 401));
  }

  console.log('user', currentUser);
  req.user = { id: currentUser.id, role: currentUser.role };
  next();

  // jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
  //   if (err) {
  //     console.log('ccc', JSON.stringify(err, null, 2));

  //     return next(
  //       new AppError('Invalid or Expired token, please login again', 401)
  //     );
  //   }

  //   if (isBlacklisted(token)) {
  //     return next(new AppError('Token is invalid or logged out', 401));
  //   }

  //   console.log('decoded', decoded);

  //   // CHECK IF USER EXIST

  //   const currentUser = await prisma.user.findUnique({
  //     where: { id: decoded.id },
  //   });

  //   if (!currentUser) {
  //     return next(new AppError('User not found', 401));
  //   }

  //   console.log('user', currentUser);
  //   req.user = { id: currentUser.id, role: currentUser.role };
  //   next();
  // });
});

const authorized = (...roles) => {
  return (req, res, next) => {
    console.log('kl', roles.join(', '));
    console.log(req.user.role);
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
