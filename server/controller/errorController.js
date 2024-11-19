// REFACTOR;
const _ = (err, req, res, next) => {
  console.log('***********************');
  console.log('ERROR CACHED IN THE ERROR CONTROLLER');
  console.log(err);
  console.log('***********************');

  //  OPERATIONAL ERROR
  if (err.isOperational) {
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
