// REFACTOR;
const { Prisma } = require('@prisma/client');
const _ = (err, req, res, next) => {
  console.log('***********************');
  console.log('ERROR CACHED IN THE ERROR CONTROLLER');
  console.log(JSON.stringify(err, null, 2));
  console.log('***********************');
  // console.log(JSON.parse(JSON.stringify(err)));
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle PrismaClientKnownRequestError specifically
    console.log('Prisma Error Details:');
    console.log(`Code: ${err.code}`);
    console.log(`Client Version: ${err.clientVersion}`);
    if (err.meta) {
      console.log('Meta Data:', err.meta);
    }
    if (err.code === 'P2002') {
      // console.log('from res');
      err.constraint = err.meta?.target[0];
      return res.status(500).json({
        status: 'error',
        error: err,
        message: `There is user with this ${err.meta?.target[0]} `,
      });
    }
  } else {
    // Log generic errors
    console.log('Error Details:', err);
  }
  if (err.isOperational) {
    //  OPERATIONAL ERROR
    console.log('BOOLen from error controller', err.isString);

    return res.status(500).json({
      status: 'error',
      error: err,
      message: err.isString ? err.message : JSON.parse(err.message),
    });
  }

  // NON OPERATIONAL ERROR
  // OPTIMIZE;
  return res.status(500).json({
    status: 'error',
    error: err,
    message: err.message,
  });
};

module.exports = _;
