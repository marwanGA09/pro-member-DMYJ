const _ = (err, req, res, next) => {
  console.log('***********************');
  console.log('ERROR CACHED IN THE ERROR CONTROLLER');
  console.log('***********************');

  //  OPERATIONAL ERROR
  if (err.isOperational) {
    console.log('BOOLen from error controller', err.isString);
    console.log('err', err.message);

    return res.status(500).json({
      status: 'error',
      error: err,
      // message:
      //   typeof err.message === 'string' ? err.message : JSON.parse(err.message),
      message: err.isString ? err.message : JSON.parse(err.message),
    });
  }

  // NON OPERATIONAL ERROR

  return res.status(500).json({
    status: 'error',
    error: err,
    message: err.message,
  });
};

module.exports = _;
