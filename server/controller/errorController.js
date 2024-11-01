const _ = (err, req, res, next) => {
  console.log('er', err);
  console.log('ERROR CONTROLLER');
  return res.status(500).json({
    status: 'error',
    error: err,
    message: err.message,
  });
};

module.exports = _;
